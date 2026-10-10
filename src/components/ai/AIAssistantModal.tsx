"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Send, Bot, User, AlertCircle } from "lucide-react";
import type { ChatMessage } from "@/types/ai";
import { linksConfig } from "@/config/links";
import { cn } from "@/lib/utils";

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_CHIPS = [
  "How do I join?",
  "What's the next event?",
  "Who is in the team?",
  "What is GDG RBU?",
];

const MAX_CHAR_COUNT = 500;

let globalMessageSeq = 0;
function createMessageId(prefix: string): string {
  globalMessageSeq += 1;
  return `${prefix}-${globalMessageSeq}`;
}

const emptySubscribe = () => () => {};
function useIsMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/**
 * Memoized Chat Message Bubble.
 * React.memo ensures ONLY the streaming message updates while tokens arrive,
 * preventing expensive re-renders of the full conversation history.
 */
interface ChatMessageItemProps {
  message: ChatMessage;
  isTyping: boolean;
}

function renderFormattedContent(text: string) {
  const urlRegex = /(https?:\/\/[^\s)]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          rel="noopener"
          className="underline font-bold text-gdg-blue hover:text-gdg-yellow transition-colors break-all"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

const ChatMessageItem = React.memo(
  function ChatMessageItem({ message, isTyping }: ChatMessageItemProps) {
    const isUser = message.role === "user";

    return (
      <div
        className={cn(
          "flex items-start gap-2.5",
          isUser ? "flex-row-reverse" : "flex-row"
        )}
      >
        {/* Role Avatar */}
        <div
          className={cn(
            "w-7 h-7 rounded-lg border-2 border-border flex items-center justify-center shrink-0 shadow-neo-sm",
            isUser ? "bg-foreground text-background" : "bg-gdg-yellow text-black"
          )}
        >
          {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
        </div>

        {/* Message Bubble */}
        <div
          className={cn(
            "max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed border-2 border-border",
            isUser
              ? "bg-foreground text-background shadow-neo-sm font-sans"
              : "bg-surface text-foreground shadow-neo font-mono whitespace-pre-line"
          )}
        >
          {isTyping ? (
            <div className="flex items-center gap-1.5 py-1" aria-label="Gemini is typing">
              <span className="w-2 h-2 rounded-full bg-gdg-blue animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-gdg-red animate-bounce [animation-delay:0.15s]" />
              <span className="w-2 h-2 rounded-full bg-gdg-yellow animate-bounce [animation-delay:0.3s]" />
              <span className="w-2 h-2 rounded-full bg-gdg-green animate-bounce [animation-delay:0.45s]" />
            </div>
          ) : (
            renderFormattedContent(message.content)
          )}

          {!isTyping && (
            <div
              className={cn(
                "mt-1 text-[9px] font-mono",
                isUser ? "text-neutral-400 text-right" : "text-muted-foreground"
              )}
            >
              {message.timestamp}
            </div>
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.message.id === nextProps.message.id &&
      prevProps.message.content === nextProps.message.content &&
      prevProps.message.timestamp === nextProps.message.timestamp &&
      prevProps.message.role === nextProps.message.role &&
      prevProps.isTyping === nextProps.isTyping
    );
  }
);

/**
 * Neo-Brutalist "Ask GDG AI" Chat Panel.
 * Performance & Flicker-Free Features:
 * 1. Scroll lock with scrollbar-width compensation to eliminate layout jumps.
 * 2. Client-only mounting to prevent SSR hydration flash.
 * 3. AnimatePresence animating only opacity and transform with ~0.2s duration.
 * 4. Zero conflicting CSS transitions on Framer Motion animated containers.
 * 5. will-change and transform: translateZ(0) hardware layer promotion.
 * 6. Semi-transparent overlay without heavy blur to prevent GPU stutter on mobile.
 * 7. React.memo streaming message isolation.
 * 8. Isolated open/close state with stopPropagation to prevent double-toggling.
 */
export function AIAssistantModal({ isOpen, onClose }: AIAssistantModalProps) {
  const mounted = useIsMounted();

  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      content: `👋 Hi! I'm Ask GDG AI, powered by Google Gemini. Ask me anything about Google Developer Groups RBU, our upcoming Orientation, or how to join our developer tracks!\n\n🔗 Live Events Portal: ${linksConfig.events}\n🔐 Join / Sign In: ${linksConfig.login}`,
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [isStreaming, setIsStreaming] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // 1. Scroll lock with scrollbar width compensation
  React.useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  // Auto-scroll on new message or tokens
  React.useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Focus input when modal opens
  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // 7. Escape key listener with stopPropagation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isStreaming) return;

    if (query.length > MAX_CHAR_COUNT) {
      setErrorMessage(`Message is too long. Please keep it under ${MAX_CHAR_COUNT} characters.`);
      return;
    }

    setErrorMessage(null);

    const userMessage: ChatMessage = {
      id: createMessageId("user"),
      role: "user",
      content: query,
      timestamp: "Now",
    };

    const aiMessageId = createMessageId("ai");
    const initialAiMessage: ChatMessage = {
      id: aiMessageId,
      role: "model",
      content: "",
      timestamp: "Typing...",
    };

    setMessages((prev) => [...prev, userMessage, initialAiMessage]);
    setInput("");
    setIsStreaming(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: messages
            .filter((m) => m.id !== "welcome" && m.content.trim() !== "")
            .map((m) => ({
              role: m.role === "user" ? "user" : "model",
              content: m.content,
            })),
        }),
      });

      if (!response.ok) {
        let errText = "An error occurred while contacting the server.";
        try {
          const errData = await response.json();
          if (errData.error) errText = errData.error;
        } catch {
          // ignore parsing error
        }
        throw new Error(errText);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("Unable to establish stream reader.");
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value, { stream: true });

        // 6. Update only the streaming message; keep previous message references identical
        setMessages((prev) => {
          const lastIndex = prev.length - 1;
          if (lastIndex >= 0 && prev[lastIndex].id === aiMessageId) {
            const lastMsg = prev[lastIndex];
            const updatedLastMsg: ChatMessage = {
              ...lastMsg,
              content: lastMsg.content + chunkText,
              timestamp: "Now",
            };
            return [...prev.slice(0, lastIndex), updatedLastMsg];
          }
          return prev;
        });
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Connection hiccup occurred.";
      setMessages((prev) => {
        const lastIndex = prev.length - 1;
        if (lastIndex >= 0 && prev[lastIndex].id === aiMessageId) {
          const lastMsg = prev[lastIndex];
          const updatedLastMsg: ChatMessage = {
            ...lastMsg,
            content: `⚠️ ${errMsg} For immediate assistance, email us at gdg@rknec.edu or reach out to Web Lead Rohit Agrawal.`,
            timestamp: "Now",
          };
          return [...prev.slice(0, lastIndex), updatedLastMsg];
        }
        return prev;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  // 2. Client-only mounting check
  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-chat-title"
          className="fixed inset-0 z-50 flex items-center justify-center sm:p-4 overflow-hidden"
        >
          {/* 
            4. Overlay: Semi-transparent background without heavy backdrop-filter blur.
            3. No conflicting CSS transitions (no transition-opacity / transition-all).
          */}
          <motion.div
            key="gdg-ai-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="fixed inset-0 bg-black/65"
            aria-hidden="true"
          />

          {/* 
            2. Panel Animation: Animate only opacity and transform (y and scale).
               initial={{ opacity: 0, y: 16, scale: 0.98 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, y: 16, scale: 0.98 }}
               duration ~0.2s.
            3. No CSS transitions on this element (no transition: all).
            4. will-change: transform, opacity and transform: translateZ(0) for GPU layer promotion.
          */}
          <motion.div
            key="gdg-ai-panel"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              willChange: "transform, opacity",
              transform: "translateZ(0)",
            }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "relative z-10 flex flex-col bg-surface text-foreground border-2 border-border shadow-neo-xl overflow-hidden",
              "w-full h-full sm:h-[620px] sm:max-h-[88vh] sm:w-[480px] sm:rounded-2xl"
            )}
          >
            {/* Brutalist Header */}
            <div className="flex items-center justify-between p-3.5 sm:p-4 border-b-2 border-border bg-muted/60 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gdg-yellow border-2 border-border flex items-center justify-center shadow-neo-sm">
                  <Sparkles className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h2
                    id="ai-chat-title"
                    className="font-pixel text-xs sm:text-sm font-bold tracking-tight text-foreground flex items-center gap-1.5"
                  >
                    ASK GDG AI
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-gdg-blue text-white border border-border">
                      gemini-2.5-flash
                    </span>
                  </h2>
                  <p className="font-mono text-[10px] text-muted-foreground">
                    Ramdeobaba University Campus Bot
                  </p>
                </div>
              </div>

              {/* Close Button with stopPropagation */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl border-2 border-border bg-surface flex items-center justify-center shadow-neo-sm hover:shadow-neo active:translate-x-0.5 active:translate-y-0.5 transition-transform duration-100 cursor-pointer"
                aria-label="Close Ask GDG AI chatbot"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="px-4 py-2 bg-gdg-red/20 border-b-2 border-gdg-red text-foreground font-mono text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-gdg-red shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Chat Conversation Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
              {messages.map((msg) => {
                const isTyping = isStreaming && msg.role === "model" && msg.content === "";
                return (
                  <ChatMessageItem
                    key={msg.id}
                    message={msg}
                    isTyping={isTyping}
                  />
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Question Chips */}
            <div className="px-3 py-2 border-t-2 border-dashed border-border bg-surface flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
              <span className="text-[10px] font-mono font-bold text-muted-foreground shrink-0">
                Chips:
              </span>
              {SUGGESTED_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(chip)}
                  disabled={isStreaming}
                  className="shrink-0 px-2.5 py-1 min-h-[32px] rounded-full text-[11px] font-mono bg-muted hover:bg-gdg-yellow hover:text-black border border-border transition-colors duration-150 cursor-pointer disabled:opacity-50"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Form Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t-2 border-border bg-surface flex flex-col gap-1.5 shrink-0"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  maxLength={MAX_CHAR_COUNT}
                  onChange={(e) => {
                    setInput(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="Ask about GDG RBU, events, team..."
                  disabled={isStreaming}
                  className="flex-1 min-h-[44px] px-3.5 py-2 rounded-xl border-2 border-border bg-background text-foreground font-mono text-xs sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gdg-blue transition-colors duration-150 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isStreaming}
                  className="min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-xl border-2 border-border bg-gdg-yellow text-black font-mono font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-neo-sm hover:shadow-neo active:translate-x-0.5 active:translate-y-0.5 transition-transform duration-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Ask</span>
                </button>
              </div>

              {/* Character Count Counter */}
              <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground px-1">
                <span>Answers restricted to GDG RBU topics</span>
                <span>
                  {input.length}/{MAX_CHAR_COUNT}
                </span>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
