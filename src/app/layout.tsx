import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  IM_Fell_English_SC,
  Cormorant_Upright,
} from "next/font/google";
import "@/styles/globals.scss";
import "./globals.css";

import {
  Rework,
  ThematicAgent,
  ThematicAgentProvider,
} from "@ssword/ui/client";
import { SiteLayout } from "@/components/pages/site-components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const yeOldeEnglishHead = IM_Fell_English_SC({
  variable: "--font-ye-old-english-head",
  subsets: ["latin"],
  weight: "400",
});

const yeOldeEnglish = Cormorant_Upright({
  variable: "--font-ye-old-english",
  subsets: ["latin"],
  weight: "400",
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
        className={`${geistSans.variable} ${geistMono.variable} ${yeOldeEnglishHead.variable} ${yeOldeEnglish.variable} bg-primary antialiased`}
      >
        <ThematicAgentProvider>
          <ThematicAgent
            usernameProperty={"userName"}
            user={{ userName: "local" }}
          />
          {/** Reworks */}
          <Rework data-link-disabled={true} />
          <SiteLayout>{children}</SiteLayout>
        </ThematicAgentProvider>
      </body>
    </html>
  );
}
