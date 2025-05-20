import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.scss";
import "./globals.css";
import thematicPreloads from "@/components/agents/preload.json";
import Header from "@/components/ui-header";
import {
  ThematicAgent,
  ThematicAgentProvider,
} from "@/components/agents/thematic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ssword",
  description: "An author's homepage",
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-primary antialiased`}
      >
        <ThematicAgentProvider>
          <ThematicAgent
            usernameProperty={"userName"}
            user={{ userName: "local" }}
          />
          <Header />
          {children}
        </ThematicAgentProvider>
      </body>
    </html>
  );
}
