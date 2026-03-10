import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-10">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card text-sm font-semibold">
            PH
          </div>
          <div>
            <p className="text-sm font-semibold">Robby A. Quejada</p>
            <p className="text-xs text-muted-foreground">
              Full-stack developer
            </p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a className="transition hover:text-foreground" href="#about">
            About
          </a>
          <a className="transition hover:text-foreground" href="#skills">
            Skills
          </a>
          <a className="transition hover:text-foreground" href="#projects">
            Projects
          </a>
          <a className="transition hover:text-foreground" href="#contact">
            Contact
          </a>
        </nav>
        <Button
          render={<a href="#contact" />}
          nativeButton={false}
          size="sm"
          variant="secondary"
        >
          Let&apos;s talk
        </Button>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 pb-16 pt-16">
        <section
          id="about"
          className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Frontend + Backend</Badge>
              <Badge variant="secondary">JavaScript</Badge>
              <Badge variant="secondary">PHP</Badge>
              <Badge variant="secondary">Backend-first</Badge>
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-foreground md:text-5xl">
              Hi, I&apos;m Robby A. Quejada.
              <span className="block text-muted-foreground">
                I build reliable web products with a backend mindset.
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              I&apos;m 16 years old and work across the stack. I can
              handle frontend delivery, but I feel most confident designing and
              shipping backend systems where performance, data integrity, and
              clear APIs matter most.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                render={<a href="mailto:ssword.dev@gmail.com" />}
                nativeButton={false}
              >
                Email me
              </Button>
              <Button
                render={<a href="#projects" />}
                nativeButton={false}
                variant="outline"
              >
                View projects
              </Button>
            </div>
          </div>

          <Card className="border-border/70 bg-card/70 shadow-sm">
            <CardHeader>
              <CardTitle>Profile snapshot</CardTitle>
              <CardDescription>Fast facts and current focus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium">Robby A. Quejada</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Age</span>
                <span className="font-medium">16</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Core focus</span>
                <span className="font-medium">Backend architecture</span>
              </div>
              <div className="rounded-xl border border-border/70 bg-muted/60 p-4">
                <p className="text-muted-foreground">
                  I keep interfaces simple and clean, focusing on usability and
                  consistent execution over flashiness.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        <section className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Backend systems</CardTitle>
              <CardDescription>
                APIs, data models, and scalable services
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              I enjoy structuring services that stay stable, readable, and easy
              to extend as the product grows.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Full-stack delivery</CardTitle>
              <CardDescription>
                Frontend + backend collaboration
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              When needed, I connect backend logic to practical UI flows and
              make sure everything works end-to-end.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pragmatic UI</CardTitle>
              <CardDescription>Clean, focused interfaces</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              I keep visuals minimal and prioritize clarity, performance, and
              user confidence.
            </CardContent>
          </Card>
        </section>

        <Separator />

        <section id="skills" className="grid gap-8 md:grid-cols-[0.6fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold">Skills & toolkit</h2>
            <p className="mt-3 text-muted-foreground">
              My stack is balanced between backend reliability and frontend
              delivery.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Badge>JavaScript</Badge>
            <Badge>TypeScript</Badge>
            <Badge>PHP</Badge>
            <Badge>Node.js</Badge>
            <Badge>REST APIs</Badge>
            <Badge>Database Design</Badge>
            <Badge>Authentication</Badge>
            <Badge>Tailwind CSS</Badge>
            <Badge>Next.js</Badge>
            <Badge>Git</Badge>
          </div>
        </section>

        <Separator />

        <section id="projects" className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold">Selected projects</h2>
            <p className="mt-3 text-muted-foreground">
              A few school systems and utilities I built.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Website</CardTitle>
                <CardDescription>Personal brand showcase</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                A clean, backend-focused portfolio built with Next.js and
                shadcn UI, optimized for simple deployment on Vercel.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>SPRCNHS SEMS</CardTitle>
                <CardDescription>Employee management system</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Web-based employee database for teaching and non-teaching
                personnel with CRUD flows, filtering, and admin insights.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>SPRCNHS Inventory System</CardTitle>
                <CardDescription>School inventory tracking</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Centralized inventory app for recording items, tracking stock,
                and monitoring purchase costs.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Student Quiz Evaluator</CardTitle>
                <CardDescription>Stats + pass/fail summaries</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Generates statistical summaries from quiz scores (0–100) and
                flags pass/fail based on a 75% threshold.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Roman Numeral Converter</CardTitle>
                <CardDescription>Math utility</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Converts numbers from 1 to 1000 into Roman numerals for
                classroom use cases.
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        <section id="contact" className="grid gap-6 md:grid-cols-[1fr_0.7fr]">
          <div>
            <h2 className="text-2xl font-semibold">Let&apos;s build together</h2>
            <p className="mt-3 text-muted-foreground">
              If you need someone who can own backend architecture and still
              ship frontend features, I&apos;m ready to help.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
              <CardDescription>Open to new opportunities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">ssword.dev@gmail.com</span>
              </div>
              <Button
                render={<a href="mailto:ssword.dev@gmail.com" />}
                className="w-full"
                nativeButton={false}
              >
                Start a project
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pb-10 text-xs text-muted-foreground">
        <span>© 2026 Robby A. Quejada. All rights reserved.</span>
        <span className="font-mono">Backend-first • Full-stack capable</span>
      </footer>
    </div>
  );
}
