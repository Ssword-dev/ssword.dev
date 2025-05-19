import Subcard from "@/components/subcard";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <div className="flex aspect-[10/8] min-w-[280px] flex-col items-center justify-center self-center rounded-xl bg-white/80 p-8 shadow-lg lg:aspect-[12/8] dark:bg-black/40">
          <h1 className="mb-2 text-2xl font-bold">Welcome to ssword.dev</h1>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Here you will get to know who ssword is.
            <br />
            maybe you came here for documentations? click the nav bar
            <br />
            or click this{" "}
            <Link
              prefetch
              href="/packages"
              className="text-blue-300 dark:text-yellow-300"
            >
              link
            </Link>{" "}
            to
            <br />
            find all the packages or apps ssword have
            <br />
            built in many programming languages
          </p>
        </div>
        <div className="flex max-w-[80vw] flex-col backdrop-blur-2xl lg:max-w-[60vw] lg:flex-row">
          <Subcard>
            <>Thanks for visiting!</>
            <>
              Thanks for stopping by! we usually don't get a lot of
              <br />
              visitors here,
              <br />
              here, get yourself a cup of coffee &#9749;
            </>
          </Subcard>
          <Subcard>
            <>You know...</>
            <>
              Not many people choose to become a programmer, and
              <br />
              if you are one, congrats! you are one unique by many,
              <br />
              if you are tired, you may rest here for a while!
            </>
          </Subcard>
          <Subcard>
            <>Advice</>
            <>
              People often overcomplicates things, but,
              <br />
              for maximum work efficience, only do what you
              <br />
              are tasked to do, i often encounter this mistake
              <br />
              by building "abstractions" on top of already
              <br />
              exiting abstractions, yes, thats why my github
              <br />
              is cluttered with many repositories
            </>
          </Subcard>
        </div>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]"></footer>
    </div>
  );
}
