"use client";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import {
  Card,
  CardTitle,
  CardDescription,
  ScrollReveal,
  LayoutPreservation,
  useView,
} from "@ssword/ui/client";
import { useEffect, useRef, useState } from "react";
import React from "react";

const globalTransition = {
  type: "spring",
  damping: 20,
  stiffness: 50,
  duration: 0.8665,
};
function Greetings() {
  const elementRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const view = useView(elementRef);

  useEffect(() => {
    controls.start({
      scaleY: view.ratio,
      translateX: 100 - 100 * view.ratio,
    });
  }, [view]);
  return (
    <LayoutPreservation width={280} height={224}>
      <motion.div
        ref={elementRef}
        animate={controls}
        className="bg-primary mb-8 flex aspect-[10/8] min-w-[280px] flex-col items-center justify-center self-center rounded-xl p-8 shadow-lg lg:aspect-[12/8]"
      >
        <h1 className="font-bold-style text-primary mb-2 text-2xl">
          Welcome to{" "}
          <span className="text-gradient-linear gradient-direction-bl from-black via-gray-700 to-white">
            ssword.dev
          </span>
        </h1>
        <p className="text-secondary text-center">
          Here you will get to know who ssword is.
          <br />
          maybe you came here for documentations? click the nav bar
          <br />
          or click this{" "}
          <Link prefetch href="/packages" className="text-primary">
            link
          </Link>{" "}
          to
          <br />
          find all the packages or apps ssword have
          <br />
          built in many programming languages
        </p>
      </motion.div>
    </LayoutPreservation>
  );
}

const pages = [
  <Card className="bg-secondary m-2 flex-1" color="primary" key={0}>
    <CardTitle className="">Thanks for visiting!</CardTitle>
    <CardDescription className="">
      Thanks for stopping by! we usually don't get a lot of
      <br />
      visitors here,
      <br />
      here, get yourself a cup of coffee &#9749;
    </CardDescription>
  </Card>,
  <Card className="bg-secondary m-2 flex-1" key={1}>
    <CardTitle>You know...</CardTitle>
    <CardDescription>
      Not many people choose to become a programmer, and
      <br />
      if you are one, congrats! you are one unique by many,
      <br />
      if you are tired, you may rest here for a while!
    </CardDescription>
  </Card>,

  <Card className="bg-secondary m-2 flex-1" key={2}>
    <CardTitle>Advice</CardTitle>
    <CardDescription>
      People often overcomplicates things, but,
      <br />
      for maximum work efficiency, only do what you
      <br />
      are tasked to do, i often encounter this mistake
      <br />
      by building "abstractions" on top of already
      <br />
      exiting abstractions, yes, thats why my github
      <br />
      is cluttered with many repositories
    </CardDescription>
  </Card>,
  <Card className="bg-secondary m-2 flex-1" key={3}>
    <CardTitle>Tutorials</CardTitle>
    <CardDescription>
      Want tutorials? like how did i do this
      <br />
      animation?
      <br />
      checkout {/** TODO: actually add these tutorials */}
      <Link href="/docs/webtech-stack/framer-motion">this tutorial</Link>
    </CardDescription>
  </Card>,
];

function RevealCard({ children }: { children: React.ReactNode }) {
  return <ScrollReveal interval={1}>{children}</ScrollReveal>;
}

function ScrollRevealCards() {
  return (
    <div className="flex flex-col gap-6">
      {pages.map((content, idx) => (
        <RevealCard key={idx}>{content}</RevealCard>
      ))}
    </div>
  );
}

function MainContent() {
  return (
    <>
      <ScrollRevealCards />
    </>
  );
}

export { Greetings, MainContent };
