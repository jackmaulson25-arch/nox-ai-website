import type { Metadata } from "next";

const baseUrl = "https://nox-website-two.vercel.app";

export const metadata: Metadata = {
  title: "Nox AI — Your AI Command Center | Autonomous Multi-Agent System",
  description: "Autonomous AI agents that research, build, optimize, and learn — coordinated by one hub. Free to start. Deploy in minutes.",
  keywords: ["AI agent", "multi-agent system", "automation", "AI assistant", "developer tools", "AI deployment", "autonomous agents", "Nox AI"],
  authors: [{ name: "Nox AI" }],
  creator: "Nox AI",
  publisher: "Nox AI",
  metadataBase: new URL(baseUrl),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: baseUrl,
    siteName: "Nox AI",
    title: "Nox AI — Your AI Command Center",
    description: "Autonomous AI agents that research, build, optimize, and learn. Free to start.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Nox AI - Your AI Command Center" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nox AI — Your AI Command Center",
    description: "Autonomous AI agents that research, build, optimize, and learn. Free to start.",
    images: ["/og-image.png"],
    creator: "@noxAI",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
};
