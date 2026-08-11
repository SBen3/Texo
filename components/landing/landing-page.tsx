"use client";

import { useState } from "react";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";

const Logo = ({ size = 40 }: { size?: number }) => (
  <div className="relative shrink-0" style={{ width: size, height: size }}>
    <div
      className="absolute left-0 top-0 rounded-full bg-[#1040C0] border-2 border-black"
      style={{ width: size * 0.55, height: size * 0.55 }}
    />
    <div
      className="absolute right-0 top-0 bg-[#D02020] border-2 border-black rotate-12"
      style={{ width: size * 0.55, height: size * 0.55 }}
    />
    <div
      className="absolute left-[15%] bottom-0 bg-[#F0C020] border-2 border-black"
      style={{
        width: size * 0.55,
        height: size * 0.55,
        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
      }}
    />
  </div>
);

const SHAPES = ["circle", "square", "triangle"] as const;
const ACCENTS = ["#1040C0", "#D02020", "#F0C020"];

function ShapeBadge({ index, size = 12 }: { index: number; size?: number }) {
  const shape = SHAPES[index % SHAPES.length];
  const color = ACCENTS[index % ACCENTS.length];
  return (
    <div
      className="border-2 border-black shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: shape === "circle" ? "9999px" : "0px",
        clipPath:
          shape === "triangle"
            ? "polygon(50% 0%, 0% 100%, 100% 100%)"
            : undefined,
      }}
    />
  );
}

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
    accent: "#1040C0",
  },
  {
    icon: Layers,
    title: "Layer Management",
    desc: "Full control over z-ordering, grouping, and selection — bring anything to front or send it to back instantly.",
    accent: "#D02020",
  },
  {
    icon: Users,
    title: "Live Collaboration",
    desc: "See teammates' cursors and selections move in real time. No refreshing, no conflicts, no waiting.",
    accent: "#F0C020",
  },
  {
    icon: Type,
    title: "Smart Text Layers",
    desc: "Text that scales intelligently with its container, so labels and notes stay legible at any zoom level.",
    accent: "#1040C0",
  },
  {
    icon: Undo2,
    title: "Full Undo History",
    desc: "Ctrl+Z through your entire session with confidence — every stroke, move, and delete is tracked.",
    accent: "#D02020",
  },
  {
    icon: MousePointer2,
    title: "Built for Speed",
    desc: "Keyboard shortcuts for every action, so your hands never have to leave the canvas to get work done.",
    accent: "#F0C020",
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
    accent: "#1040C0",
    features: [
      "Unlimited boards",
      "Up to 3 collaborators",
      "Core drawing tools",
    ],
  },
  {
    name: "Team",
    price: "$12/mo",
    accent: "#D02020",
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
    accent: "#F0C020",
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
    <div className="min-h-screen bg-[#F0F0F0] text-black">
      {/* NAV */}
      <nav className="flex items-center justify-between border-b-4 border-black bg-white px-6 py-3 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <Logo size={32} />
          <span className="text-xl font-black uppercase tracking-tighter">
            Texo
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
              className="text-sm font-bold uppercase tracking-wide hover:text-[#1040C0] transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
        <SignInButton mode="modal">
          <Button variant="secondary" shape="square" size="sm">
            Sign In
          </Button>
        </SignInButton>
      </nav>

      {/* HERO */}
      <section className="grid lg:grid-cols-2 border-b-4 border-black">
        <div className="flex flex-col justify-center gap-6 px-6 py-16 sm:px-12 sm:py-24">
          <div className="inline-flex items-center gap-2 w-fit px-3 py-1 border-2 border-black bg-[#F0C020] text-xs font-bold uppercase tracking-widest">
            <ShapeBadge index={0} size={8} />
            Now in open beta
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
            Build Ideas
            <br />
            Together
          </h1>
          <p className="text-base sm:text-lg font-medium text-black/70 max-w-md">
            Texo is a real-time collaborative whiteboard for teams who think
            better with a pencil in hand. Draw, organize, and ship faster —
            together, in the same space.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <SignInButton mode="modal">
              <Button variant="secondary" shape="square" size="lg">
                Start Building
              </Button>
            </SignInButton>
            <a href="#how-it-works">
              <Button variant="outline" shape="square" size="lg">
                See How It Works
              </Button>
            </a>
          </div>
          <p className="text-xs text-black/50 font-medium">
            No credit card required · Free forever plan
          </p>
        </div>

        <div className="relative bg-[#F0C020] min-h-80 lg:min-h-0 overflow-hidden border-t-4 lg:border-t-0 lg:border-l-4 border-black">
          <div className="absolute left-[10%] top-[15%] w-28 h-28 sm:w-40 sm:h-40 rounded-full bg-[#1040C0] border-4 border-black" />
          <div className="absolute right-[12%] top-[10%] w-24 h-24 sm:w-32 sm:h-32 bg-[purple] border-4 border-black rotate-12" />
          <div className="absolute left-[30%] bottom-[10%] -translate-x-1/2 w-32 h-32 sm:w-44 sm:h-44 bg-white border-4 border-black" />
          <div
            className="absolute right-[15%] bottom-[25%] w-20 h-20 sm:w-28 sm:h-28 bg-[red] border-4 border-black"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          />
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="bg-slate-950 border-b border-slate-800 py-10">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 px-6">
          Trusted by teams at
        </p>

        <div className="max-w-5xl mx-auto overflow-hidden mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          {/* Repeating 4x ensures smooth continuous infinite scrolling */}
          <div className="flex w-max animate-marquee gap-16 hover:paused cursor-pointer">
            {[...TRUSTED_BY, ...TRUSTED_BY, ...TRUSTED_BY, ...TRUSTED_BY].map(
              (name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="text-lg font-black uppercase tracking-tight text-white/50 hover:text-orange-500 transition-colors shrink-0"
                >
                  {name}
                </span>
              ),
            )}
          </div>
        </div>
      </section>
      {/* STATS */}
      <section className="bg-black/25 border-b-4 border-black">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-x-0 lg:divide-y-0 lg:divide-x divide-black">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-1 py-10 px-4 text-center border-b-4 lg:border-b-0 border-black last:border-b-0"
            >
              <span className="text-3xl sm:text-4xl font-black tracking-tighter">
                {stat.value}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-black/70">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="px-6 py-16 sm:px-12 sm:py-24 border-b-4 border-black"
      >
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-4 text-center">
          Everything You Need
        </h2>
        <p className="text-center text-black/70 font-medium mb-12 max-w-lg mx-auto">
          A full-featured canvas without the bloat — built for speed and built
          for teams.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="relative bg-white border-4 border-black shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_black] transition-all p-6"
            >
              <div
                className="absolute -top-2 -right-2 w-4 h-4 border-2 border-black"
                style={{ backgroundColor: f.accent }}
              />
              <div className="w-12 h-12 flex items-center justify-center bg-white border-2 border-black shadow-[3px_3px_0px_0px_black] mb-4">
                <f.icon size={22} strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-black/70 font-medium leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white px-6 py-16 sm:px-12 sm:py-24 border-b-4 border-black">
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-12 text-center">
          Loved By Builders
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="relative bg-[#F0F0F0] border-4 border-black shadow-[6px_6px_0px_0px_black] p-6 flex flex-col gap-4"
            >
              <Quote
                size={28}
                strokeWidth={2.5}
                style={{ color: ACCENTS[i % ACCENTS.length] }}
              />
              <p className="font-medium text-black/80 leading-relaxed">
                {t.quote}
              </p>
              <div className="flex items-center gap-3 mt-auto pt-2">
                <div
                  className="w-9 h-9 rounded-full border-2 border-black shrink-0"
                  style={{ backgroundColor: ACCENTS[i % ACCENTS.length] }}
                />
                <div>
                  <p className="text-sm font-black">{t.name}</p>
                  <p className="text-xs text-black/50 font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-[#1040C0] text-white px-6 py-16 sm:px-12 sm:py-24 border-b-4 border-black">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter">
            Why Teams Choose Texo
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {BENEFITS.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-[#F0C020] border-2 border-black flex items-center justify-center">
                  <Check size={14} strokeWidth={3} className="text-black" />
                </div>
                <p className="font-medium">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="px-6 py-16 sm:px-12 sm:py-24 border-b-4 border-black bg-[#F0C020]"
      >
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-12 text-center">
          How It Works
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="relative w-14 h-14 bg-[#D02020] border-2 border-black rotate-45 flex items-center justify-center">
                <span className="-rotate-45 text-white font-black text-lg">
                  {step.n}
                </span>
              </div>
              <h3 className="font-black uppercase tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-black/70 font-medium">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        className="bg-white px-6 py-16 sm:px-12 sm:py-24 border-b-4 border-black"
      >
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-12 text-center">
          Simple Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {PRICING.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white border-4 border-black p-6 flex flex-col gap-4 transition-all ${
                plan.featured
                  ? "shadow-[8px_8px_0px_0px_black] md:-translate-y-3"
                  : "shadow-[4px_4px_0px_0px_black]"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-black uppercase tracking-widest bg-[#F0C020] border-2 border-black">
                  Most Popular
                </span>
              )}
              <div
                className="w-4 h-4 border-2 border-black"
                style={{ backgroundColor: plan.accent }}
              />
              <h3 className="text-xl font-black uppercase tracking-tight">
                {plan.name}
              </h3>
              <p className="text-3xl font-black tracking-tighter">
                {plan.price}
              </p>
              <ul className="flex flex-col gap-2 mt-2">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm font-medium text-black/70"
                  >
                    <Check size={14} strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>
              <SignInButton mode="modal">
                <Button
                  variant={plan.featured ? "secondary" : "outline"}
                  shape="square"
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
        className="px-6 py-16 sm:px-12 sm:py-24 border-b-4 border-black"
      >
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-12 text-center">
          Questions, Answered
        </h2>
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          {FAQS.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={faq.q}
                className={`border-4 border-black transition-colors ${
                  isOpen ? "bg-[#D02020] text-white" : "bg-white"
                } shadow-[4px_4px_0px_0px_black]`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left font-black uppercase tracking-tight text-sm sm:text-base"
                >
                  {faq.q}
                  <ChevronDown
                    size={20}
                    strokeWidth={3}
                    className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 border-t-4 border-black bg-[#FFF9C4] text-black">
                    <p className="pt-4 text-sm font-medium leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative bg-[#F0C020] px-6 py-20 sm:px-12 sm:py-28 border-b-4 border-black overflow-hidden text-center">
        <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-white/50 border-4 border-black" />
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#1040C0]/50 border-4 border-black rotate-12" />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter max-w-2xl leading-[0.95]">
            Start Building With Your Team Today
          </h2>
          <SignInButton mode="modal">
            <Button
              variant="secondary"
              shape="pill"
              size="lg"
              className="px-12"
            >
              Get Started Free
            </Button>
          </SignInButton>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#121212] text-white px-6 py-12 sm:px-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-2">
            <Logo size={28} />
            <span className="text-lg font-black uppercase tracking-tighter">
              Texo
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/50 font-medium">
            <div className="flex items-center gap-1">
              <ShapeBadge index={0} size={8} />
              <ShapeBadge index={1} size={8} />
              <ShapeBadge index={2} size={8} />
            </div>
            <span className="ml-2">
              © {new Date().getFullYear()} Texo. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
