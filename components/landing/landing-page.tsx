"use client";

import { useState } from "react";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Logo from "@/components/logo";
import {
  PenTool,
  Layers,
  Users,
  Check,
  MousePointer2,
  Undo2,
  Type,
  ChevronDown,
  Quote,
  StickyNote,
  Square,
  Circle,
} from "lucide-react";
import Image from "next/image";

const NAV_LINKS = ["Features", "How It Works", "Pricing", "FAQ"];

const TRUSTED_BY = ["Northwind", "Vellum", "Ariel Labs", "Kernel", "Fondry"];

const STATS = [
  { value: "10K+", label: "Boards Created" },
  { value: "50ms", label: "Sync Latency" },
  { value: "24/7", label: "Real-Time Sync" },
  { value: "100%", label: "Free To Start" },
];

const FEATURES = [
  {
    icon: PenTool,
    title: "Freehand Drawing",
    desc: "Natural pencil and shape tools that feel like drawing on paper, powered by pressure-sensitive stroke rendering.",
  },
  {
    icon: Layers,
    title: "Layer Management",
    desc: "Full control over z-ordering, grouping, and selection — bring anything to front or send it to back instantly.",
  },
  {
    icon: Users,
    title: "Live Collaboration",
    desc: "See teammates' cursors and selections move in real time. No refreshing, no conflicts, no waiting.",
  },
  {
    icon: Type,
    title: "Smart Text Layers",
    desc: "Text that scales intelligently with its container, so labels and notes stay legible at any zoom level.",
  },
  {
    icon: Undo2,
    title: "Full Undo History",
    desc: "Move through your entire session with confidence — every stroke, move, and delete is tracked.",
  },
  {
    icon: MousePointer2,
    title: "Built for Speed",
    desc: "Keyboard shortcuts for every action, so your hands never have to leave the canvas to get work done.",
  },
];

const BENEFITS = [
  "No install required — runs entirely in your browser",
  "Unlimited boards on every plan",
  "Invite your whole team with one link",
  "Works on any device with a modern browser",
];

const STEPS = [
  {
    n: "01",
    title: "Create a Board",
    desc: "Spin up a new canvas in seconds — no setup required.",
  },
  {
    n: "02",
    title: "Invite Your Team",
    desc: "Share a link and collaborators join instantly.",
  },
  {
    n: "03",
    title: "Build Together",
    desc: "Draw, write, and organize ideas in real time.",
  },
  {
    n: "04",
    title: "Ship Faster",
    desc: "Turn scattered ideas into shared understanding.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Texo replaced three separate tools for our design sprints. Everyone's cursor moving at once, live, changed how we run meetings.",
    name: "Sofia Marin",
    role: "Product Lead, Northwind",
  },
  {
    quote:
      "The layer system is the first whiteboard tool that doesn't feel like a toy. It holds up for real production planning work.",
    name: "Idris Kane",
    role: "Founder, Ariel Labs",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "Free",
    features: [
      "Unlimited boards",
      "Up to 3 collaborators",
      "Core drawing tools",
    ],
  },
  {
    name: "Team",
    price: "$12/mo",
    features: [
      "Everything in Starter",
      "Unlimited collaborators",
      "Version history",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Everything in Team", "SSO & audit logs", "Dedicated support"],
  },
];

const FAQS = [
  {
    q: "Do I need to install anything?",
    a: "No. Texo runs entirely in the browser — open a board and start drawing, no downloads required.",
  },
  {
    q: "How many people can collaborate at once?",
    a: "Starter supports up to 3 collaborators per board. Team and Enterprise plans support unlimited collaborators.",
  },
  {
    q: "Can I use Texo on mobile?",
    a: "Yes — Texo works on any modern browser, including tablets and phones, though we recommend a larger screen for heavy editing sessions.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes, the Starter plan is free forever with unlimited boards and core drawing tools.",
  },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <div className="sticky top-0 z-30 px-4 pt-4 sm:px-6">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-border bg-card/90 px-3 py-2 shadow-card backdrop-blur">
          <div className="flex items-center gap-2 pl-2">
            <Image src="/icon.svg" alt="Texo" width={24} height={24} />
            <span className="text-lg font-semibold tracking-[-0.03em]">
              Texo
            </span>
          </div>
          <div className="hidden md:flex md:items-center md:gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
                className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <SignInButton mode="modal">
              <Button size="sm">Sign In</Button>
            </SignInButton>
          </div>
        </nav>
      </div>

      {/* HERO */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-6">
        <div className="flex flex-col gap-6">
          <div className="eyebrow inline-flex w-fit items-center gap-2 rounded-full bg-lime-100 px-3 py-1.5 text-lime-700">
            <span className="size-1.5 rounded-full bg-lime-400" />
            Now in open beta
          </div>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
            Build ideas
            <br />
            together
          </h1>
          <p className="max-w-md text-base text-smoke sm:text-lg">
            Texo is a real-time collaborative whiteboard for teams who think
            better with a pencil in hand. Draw, organize, and ship faster —
            together, in the same space.
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <SignInButton mode="modal">
              <Button size="lg">Start Building</Button>
            </SignInButton>
            <a href="#how-it-works">
              <Button variant="outline" size="lg">
                See How It Works
              </Button>
            </a>
          </div>
          <p className="text-xs text-fog">
            No credit card required · Free forever plan
          </p>
        </div>

        {/* Layered canvas mockup — stacked cards echoing the Acctual "invoice mockup" motif */}
        <div className="relative flex min-h-[360px] items-center justify-center">
          <div className="absolute h-64 w-72 -rotate-6 rounded-2xl border border-border bg-card shadow-card sm:h-72 sm:w-80" />
          <div className="absolute h-64 w-72 rotate-3 translate-x-6 rounded-2xl border border-border bg-card shadow-card sm:h-72 sm:w-80" />
          <div className="relative flex h-64 w-72 -rotate-1 flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-card sm:h-72 sm:w-80">
            <p className="eyebrow text-muted-foreground">Board · Sprint Plan</p>
            <div className="flex flex-1 items-center justify-center gap-3">
              <div className="flex size-16 rotate-[-6deg] items-center justify-center rounded-xl bg-blush text-magenta">
                <StickyNote size={22} />
              </div>
              <div className="flex size-16 items-center justify-center rounded-xl bg-ice text-lime-500">
                <Square size={22} />
              </div>
              <div className="flex size-16 rotate-[6deg] items-center justify-center rounded-full bg-lavender text-iris">
                <Circle size={22} />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {["#0098F2", "#6C56FC", "#F200CA", "#5D9C06"].map((c) => (
                <span
                  key={c}
                  className="size-4 rounded-full border border-border"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="border-y border-border bg-muted py-10">
        <p className="eyebrow mb-6 px-6 text-center text-muted-foreground">
          Trusted by teams at
        </p>
        <div className="mx-auto max-w-5xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max animate-marquee gap-16 cursor-pointer">
            {[...TRUSTED_BY, ...TRUSTED_BY, ...TRUSTED_BY, ...TRUSTED_BY].map(
              (name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="shrink-0 text-lg font-semibold tracking-[-0.02em] text-muted-foreground/60 transition-colors hover:text-lime-500"
                >
                  {name}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-1 border-border px-4 py-10 text-center [&:not(:last-child)]:border-r [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0"
            >
              <span className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                {stat.value}
              </span>
              <span className="eyebrow text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24"
      >
        <p className="eyebrow text-center text-lime-500">Product</p>
        <h2 className="mt-2 text-center text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
          Everything you need
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-smoke">
          A full-featured canvas without the bloat — built for speed and built
          for teams.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-muted p-6 transition-colors hover:bg-lime-100"
            >
              <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-card text-lime-500 shadow-subtle">
                <f.icon size={20} strokeWidth={2} />
              </div>
              <h3 className="mb-2 text-lg font-semibold tracking-[-0.02em]">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-smoke">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-y border-border bg-muted px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="mb-12 text-center text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
          Loved by builders
        </h2>
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-card"
            >
              <Quote size={24} strokeWidth={2} className="text-lime-500" />
              <p className="text-lg font-semibold leading-snug tracking-[-0.02em]">
                {t.quote}
              </p>
              <div className="mt-auto flex items-center gap-3 pt-2">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-lime-100 text-sm font-semibold text-lime-500 dark:bg-lime-100 dark:text-lime-700">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-signature text-2xl leading-none text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-fog">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-midnight px-4 py-16 text-white sm:px-6 sm:py-24 dark:bg-card dark:text-foreground">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
            Why teams choose Texo
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-lime-500">
                  <Check size={14} strokeWidth={3} className="text-white" />
                </div>
                <p className="opacity-90">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24"
      >
        <h2 className="mb-12 text-center text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
          How it works
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="flex flex-col items-center gap-4 text-center"
            >
              <div className="flex size-14 items-center justify-center rounded-full bg-lime-100 text-lg font-semibold text-lime-500 dark:bg-lime-100 dark:text-lime-700">
                {step.n}
              </div>
              <h3 className="font-semibold tracking-[-0.02em]">{step.title}</h3>
              <p className="text-sm text-smoke">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        className="border-t border-border bg-muted px-4 py-16 sm:px-6 sm:py-24"
      >
        <h2 className="mb-12 text-center text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
          Simple pricing
        </h2>
        <div className="mx-auto grid max-w-5xl items-start gap-6 md:grid-cols-3">
          {PRICING.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col gap-4 rounded-2xl border p-6 transition-all ${
                plan.featured
                  ? "border-lime-500 bg-card shadow-card md:-translate-y-3"
                  : "border-border bg-card"
              }`}
            >
              {plan.featured && (
                <span className="eyebrow absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-lime-100  px-3 py-1 text-lime-500">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-semibold tracking-[-0.02em]">
                {plan.name}
              </h3>
              <p className="text-3xl font-semibold tracking-[-0.03em]">
                {plan.price}
              </p>
              <ul className="mt-2 flex flex-col gap-2">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-smoke"
                  >
                    <Check
                      size={14}
                      strokeWidth={2.5}
                      className="text-lime-500"
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <SignInButton mode="modal">
                <Button
                  variant={plan.featured ? "default" : "outline"}
                  className="mt-4 w-full"
                >
                  Get Started
                </Button>
              </SignInButton>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24"
      >
        <h2 className="mb-12 text-center text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
          Questions, answered
        </h2>
        <div className="flex flex-col">
          {FAQS.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={faq.q} className="border-b border-border">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium sm:text-base"
                >
                  {faq.q}
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <p className="pb-4 text-sm leading-relaxed text-smoke">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-lime-100 px-4 py-20 text-center sm:px-6 sm:py-28 dark:bg-lime-950">
        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-black/25 dark:bg-white/25" />
        <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-2xl bg-black/20  dark:bg-white/20" />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <h2 className="max-w-2xl text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl lg:text-6xl">
            Start building with your team today
          </h2>
          <SignInButton mode="modal">
            <Button size="lg" className="px-10">
              Get Started Free
            </Button>
          </SignInButton>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-midnight px-4 py-12 text-white sm:px-6 dark:bg-card dark:text-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Image src="/icon.svg" alt="Texo" width={24} height={24} />
            <span className="text-lg font-semibold tracking-[-0.03em]">
              Texo
            </span>
          </div>
          <p className="text-xs text-white/50 dark:text-muted-foreground">
            © {new Date().getFullYear()} Texo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
