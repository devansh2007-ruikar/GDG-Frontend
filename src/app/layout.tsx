import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

/* ==========================================================================
   FONTS VIA NEXT/FONT
   - Pixelify Sans: authentic pixel display font for bold retro headings
   - Geist Sans: modern high-legibility UI font for controls & navigation
   - Geist Mono: monospace font for technical copy and body metadata
   ========================================================================== */
const pixelFont = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixel",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* ==========================================================================
   METADATA & SEO BEST PRACTICES
   Configured with Open Graph, Twitter cards, and GDG favicon
   ========================================================================== */
export const metadata: Metadata = {
  metadataBase: new URL("https://gdgrbu.app"),
  title: "Google Developer Groups RBU | On Campus • Ramdeobaba University",
  description:
    "Official website for Google Developer Groups (GDG) RBU Student Chapter. Empowering students with cutting-edge tech skills, community, and resources for a future in technology.",
  keywords: [
    "GDG RBU",
    "Google Developer Groups",
    "Ramdeobaba University",
    "Nagpur",
    "Tech Community",
    "Student Developers",
    "Next.js",
  ],
  authors: [{ name: "Devansh Ruikar", url: "https://github.com/devansh2007-ruikar" }],
  creator: "Devansh Ruikar",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Google Developer Groups RBU | On Campus",
    description:
      "Empowering students with cutting-edge tech skills, community, and resources for a future in technology.",
    url: "https://gdgrbu.app",
    siteName: "GDG RBU",
    images: [
      {
        url: "/gdg-logo.svg",
        width: 1200,
        height: 630,
        alt: "Google Developer Groups RBU",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Google Developer Groups RBU",
    description:
      "Empowering students with cutting-edge tech skills, community, and resources for a future in technology.",
    images: ["/gdg-logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${pixelFont.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground bg-grid-pattern antialiased selection:bg-gdg-yellow selection:text-black">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
