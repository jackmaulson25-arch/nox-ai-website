import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nox AI — Your AI Command Center",
  description: "Autonomous multi-agent AI system that coordinates research, building, optimization, and learning.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
