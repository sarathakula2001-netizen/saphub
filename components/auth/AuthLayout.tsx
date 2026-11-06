
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerLink: string;
  footerLabel: string;
};

const features = [
  {
    number: "01",
    title: "Learn with structure",
    description: "Follow organized SAP learning paths.",
  },
  {
    number: "02",
    title: "Practice with purpose",
    description: "Build skills through examples and quizzes.",
  },
  {
    number: "03",
    title: "Grow with confidence",
    description: "Prepare for interviews and real careers.",
  },
];

export default function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerLabel,
}: AuthLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070b16] text-white lg:grid lg:grid-cols-[1.05fr_0.95fr]">

      {/* Background lighting */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[150px]" />

      {/* LEFT BRAND SECTION */}
      <section className="relative hidden min-h-screen flex-col justify-between border-r border-white/[0.07] bg-[#0b1425]/70 px-12 py-10 lg:flex xl:px-20">

        {/* Logo */}
        <Link href="/" className="relative z-10 w-fit">
          <Image
            src="/images/saphub-logo.png"
            alt="SAPHub - Learn, Connect, Grow"
            width={900}
            height={300}
            priority
            className="h-auto w-64 object-contain xl:w-72"
          />
        </Link>

        {/* Main content */}
        <div className="relative z-10 max-w-xl">

          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
            <span className="text-[11px] font-bold tracking-[0.18em] text-cyan-300">
              YOUR TECHNOLOGY LEARNING SPACE
            </span>
          </div>

          <h1 className="text-5xl font-black leading-[1.15] tracking-tight xl:text-6xl">
            Your next chapter
            <span className="mt-2 block bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              starts with learning.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-slate-400">
            Learn SAP concepts, sharpen your technical skills,
            practise what you learn and take the next step
            towards your technology career.
          </p>

          {/* Feature cards */}
          <div className="mt-12 space-y-3">
            {features.map((feature) => (
              <div
                key={feature.number}
                className="group flex items-center gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition duration-300 hover:border-cyan-400/20 hover:bg-white/[0.05]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-sm font-bold text-cyan-300">
                  {feature.number}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-100">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {feature.description}
                  </p>
                </div>

                <span className="ml-auto text-lg text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-300">
                  →
                </span>
              </div>
            ))}
          </div>

          {/* Decorative bottom text */}
          <div className="mt-10 flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-slate-500">
            <span className="h-px w-10 bg-gradient-to-r from-blue-500 to-cyan-400" />
            LEARN
            <span className="text-cyan-400">•</span>
            CONNECT
            <span className="text-cyan-400">•</span>
            GROW
          </div>
        </div>

        <p className="relative z-10 text-xs text-slate-600">
          © 2026 SAPHub. An independent technology learning community.
        </p>
      </section>

      {/* RIGHT FORM SECTION */}
      <section className="relative flex min-h-screen items-center justify-center px-5 py-10 sm:px-10 lg:px-12">

        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/[0.07] blur-[130px]" />

        <div className="relative z-10 w-full max-w-[460px]">

          {/* Mobile logo */}
          <Link href="/" className="mb-10 flex justify-center lg:hidden">
            <Image
              src="/images/saphub-logo.png"
              alt="SAPHub - Learn, Connect, Grow"
              width={900}
              height={300}
              priority
              className="h-auto w-60 object-contain"
            />
          </Link>

          {/* Heading */}
          <div className="mb-8">
            <div className="mb-5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span className="text-[11px] font-bold tracking-[0.22em] text-cyan-300">
                SAPHUB ACCOUNT
              </span>
            </div>

            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              {title}
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              {subtitle}
            </p>
          </div>

          {/* Form card */}
          <div className="rounded-[28px] border border-white/[0.09] bg-[#101a2b]/90 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8">

            {children}

            <div className="mt-7 border-t border-white/[0.08] pt-6 text-center">
              <p className="text-sm text-slate-400">
                {footerText}{" "}
                <Link
                  href={footerLink}
                  className="font-bold text-cyan-300 transition hover:text-blue-300"
                >
                  {footerLabel}
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-600">
            <span>Designed for learners</span>
            <span className="text-cyan-500">•</span>
            <span>Built by SAPHub</span>
          </div>
        </div>
      </section>
    </main>
  );
}
