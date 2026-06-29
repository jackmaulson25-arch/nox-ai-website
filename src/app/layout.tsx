import type { Metadata, Viewport } from "next";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Nox AI — Your AI Command Center | Autonomous Multi-Agent System",
  description: "Autonomous AI agents that research, build, optimize, and learn — coordinated by one hub. Free to start. Deploy in minutes.",
  keywords: ["AI agent", "multi-agent system", "automation", "AI assistant", "developer tools", "Nox AI"],
  metadataBase: new URL("https://nox-website-two.vercel.app"),
  openGraph: { type: "website", locale: "en_GB", url: "https://nox-website-two.vercel.app", siteName: "Nox AI", title: "Nox AI — Your AI Command Center", description: "Autonomous AI agents that research, build, optimize, and learn. Free to start.", images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Nox AI — Your AI Command Center", description: "Autonomous AI agents. Free to start.", images: ["/og-image.png"] },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Nox AI" },
};

export const viewport: Viewport = {
  themeColor: "#050510",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="antialiased min-h-screen">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
