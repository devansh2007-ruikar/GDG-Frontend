export interface ChatMessage {
  id: string;
  role: "user" | "model" | "system";
  content: string;
  timestamp: string;
}

export interface ChatRequest {
  message: string;
  history?: {
    role: "user" | "model";
    content: string;
  }[];
}

export interface ChatResponse {
  reply: string;
  source: "gemini-api" | "knowledge-base";
}
