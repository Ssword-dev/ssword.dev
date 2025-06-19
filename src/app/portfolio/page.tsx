"use client";
import React, { useRef, useState } from "react";
import NotImplementedPage from "@/components/under_construction";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  TypeWriter,
} from "@ssword/ui/client";
import Link from "next/link";

export default function Page() {
  const [text] = useState([
    "Hello, I am Ssword!",
    "I am the author of this website!",
    "I am a Software Developer",
    "Let's work together!",
  ]);
  const [cursor] = useState(
    <span className="blink-duration-[50ms] animate animate-blink">|</span>,
  );
  return (
    <main className="flex min-h-full min-w-full flex-col items-center justify-center">
      <div
        id="introductory"
        className="mt-10 flex flex-col items-center justify-center"
      >
        <span className="text-primary text-xl lg:text-2xl">
          <TypeWriter text={text} textCursor={cursor} />
        </span>
      </div>

      <div
        id="feats"
        className="mt-10 flex w-full flex-col content-center items-center justify-center"
      >
        <span className="text-primary text-lg lg:text-xl">Achievements</span>

        <div className="mt-5 flex flex-row items-center justify-center sm:flex-col">
          <Card className="bg-tertiary">
            <CardTitle className="text-primary text-center">Website</CardTitle>
            <CardContent className="flex flex-col items-center justify-center">
              <span className="break-words">
                <Link
                  className="text-secondary visited:text-tertiary"
                  href="/"
                  prefetch
                >
                  This website is built by me!
                </Link>
              </span>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
