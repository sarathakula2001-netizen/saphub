
import Image from "next/image";
import Link from "next/link";
import HomeAuthNavigation from "@/components/layout/HomeAuthNavigation";

const courses = [
  {
    number: "01",
    title: "SAP ABAP",
    subtitle: "Application Development",
    description:
      "Learn ABAP programming from the fundamentals to reports, internal tables, Open SQL and real-world development concepts.",
    lessons: "Beginner to Advanced",
    color: "blue",
    icon: "A",
    href: "/courses/abap",
  },
  {
    number: "02",
    title: "SAP HANA",
    subtitle: "In-Memory Database",
    description:
      "Explore SAP HANA architecture, SQL, SQLScript, calculation views and modern database development.",
    lessons: "Beginner to Advanced",
    color: "teal",
    icon: "H",
    href: "/courses/hana",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0b1120] text-white">

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/[0.08]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">

          {/* SAPHub Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/saphub-logo.png"
              alt="SAPHub Logo"
              width={180}
              height={70}
              priority
              className="h-12 w-auto object-contain"
            />

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                SAP<span className="text-blue-400">Hub</span>
              </h1>
              <p className="text-[10px] tracking-[0.2em] text-slate-400">
                LEARN. CONNECT. GROW.
              </p>
            </div>
          </Link>

          {/* Main Navigation */}
          <div className="hidden items-center gap-9 text-sm text-slate-300 md:flex">
            <Link href="#courses" className="transition hover:text-blue-400">
              Courses
            </Link>

            <Link href="#about" className="transition hover:text-blue-400">
              About
            </Link>

            <Link href="#learning" className="transition hover:text-blue-400">
              Learning Path
            </Link>
          </div>

          {/* Authentication-aware Navigation */}
          <HomeAuthNavigation />

        </div>
      </nav>

      {/* Hero */}
      <section className="relative">
        <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[130px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-teal-500/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:px-10 lg:py-32">

          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/[0.08] px-4 py-2 text-xs font-medium text-blue-300">
              <span className="h-2 w-2 rounded-full bg-teal-400" />
              YOUR SAP LEARNING JOURNEY STARTS HERE
            </div>

            <h2 className="max-w-2xl text-5xl font-bold leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
              Learn SAP.
              <br />
              Build your
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
                future.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              Your journey into the SAP world begins here. Learn step by step
              through structured lessons, practical examples, quizzes and
              interview preparation — completely free.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#courses"
                className="rounded-xl bg-blue-600 px-7 py-4 text-sm font-semibold shadow-xl shadow-blue-600/20 transition hover:-translate-y-1 hover:bg-blue-500"
              >
                Explore Courses <span className="ml-2">→</span>
              </Link>

              <Link
                href="#about"
                className="rounded-xl border border-white/15 px-7 py-4 text-sm font-semibold text-slate-200 transition hover:border-white/40 hover:bg-white/[0.05]"
              >
                Discover SAPHub
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-7">
              <div>
                <p className="text-2xl font-bold">Free</p>
                <p className="mt-1 text-xs text-slate-500">Learning access</p>
              </div>

              <div>
                <p className="text-2xl font-bold">Step by step</p>
                <p className="mt-1 text-xs text-slate-500">Structured lessons</p>
              </div>

              <div>
                <p className="text-2xl font-bold">Practical</p>
                <p className="mt-1 text-xs text-slate-500">Learning approach</p>
              </div>
            </div>
          </div>

          {/* Visual Learning Illustration */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute inset-10 rounded-full bg-blue-500/20 blur-[90px]" />

            <div className="relative rounded-3xl border border-white/10 bg-[#111c30]/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">

              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs text-slate-500">SAP LEARNING SPACE</p>
                  <p className="mt-1 font-semibold">Choose your journey</p>
                </div>

                <div className="rounded-lg bg-teal-400/10 px-3 py-1.5 text-xs text-teal-300">
                  Explore
                </div>
              </div>

              <div className="relative my-9 flex items-center justify-center">
                <div className="absolute h-52 w-52 rounded-full border border-dashed border-blue-400/30" />
                <div className="absolute h-40 w-40 rounded-full border border-blue-400/20" />

                <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-blue-300/30 bg-gradient-to-br from-blue-600 to-blue-900 text-3xl font-bold shadow-2xl shadow-blue-500/30">
                  SAP
                </div>

                <div className="absolute left-2 top-0 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/30 bg-[#172d4c] font-bold text-blue-300 shadow-xl">
                  AB
                </div>

                <div className="absolute right-2 top-0 flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-400/30 bg-[#153b3b] font-bold text-teal-300 shadow-xl">
                  HN
                </div>

                <div className="absolute bottom-0 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/30 bg-[#292044] font-bold text-violet-300 shadow-xl">
                  +
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs text-slate-500">START WITH</p>
                  <p className="mt-2 font-semibold text-blue-300">ABAP</p>
                  <p className="mt-1 text-xs text-slate-500">Programming</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs text-slate-500">EXPLORE</p>
                  <p className="mt-2 font-semibold text-teal-300">HANA</p>
                  <p className="mt-1 text-xs text-slate-500">Database</p>
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-xs tracking-widest text-slate-500">
              ONE PLATFORM. MANY POSSIBILITIES.
            </p>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="border-t border-white/[0.08] bg-[#0e1728]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.25em] text-blue-400">
              EXPLORE AND LEARN
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Start with the fundamentals.
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Choose a learning path and build your knowledge one lesson at a
              time.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {courses.map((course) => (
              <article
                key={course.number}
                className="group rounded-2xl border border-white/10 bg-[#111c30] p-7 transition duration-300 hover:-translate-y-2 hover:border-blue-400/40 hover:shadow-2xl hover:shadow-blue-950/40 sm:p-9"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold ${
                      course.color === "blue"
                        ? "bg-blue-500/15 text-blue-300"
                        : "bg-teal-500/15 text-teal-300"
                    }`}
                  >
                    {course.icon}
                  </div>

                  <span className="text-sm text-slate-600">
                    {course.number}
                  </span>
                </div>

                <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  {course.subtitle}
                </p>

                <h3 className="mt-2 text-2xl font-bold">{course.title}</h3>

                <p className="mt-4 min-h-20 leading-7 text-slate-400">
                  {course.description}
                </p>

                <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-xs text-slate-500">
                    {course.lessons}
                  </span>

                  <Link
                    href={course.href}
                    className="text-sm font-semibold text-blue-400 transition group-hover:text-teal-300"
                  >
                    Explore path →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/[0.12] to-teal-500/[0.06] p-8 sm:p-14">
          <p className="text-xs font-semibold tracking-[0.25em] text-teal-300">
            WHY SAPHub?
          </p>

          <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
            Quality SAP learning should be accessible to everyone.
          </h2>

          <p className="mt-5 max-w-2xl leading-8 text-slate-400">
            Our goal is simple: make learning SAP easier through clear
            explanations, structured lessons, practical exercises and a
            supportive learning environment.
          </p>

          <p className="mt-6 font-semibold text-white">
            Learn. Connect. Grow.
          </p>
        </div>
      </section>

      {/* Learning Approach */}
      <section id="learning" className="border-t border-white/10 bg-[#0e1728]">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10">
          <p className="text-xs font-semibold tracking-[0.25em] text-blue-400">
            YOUR LEARNING JOURNEY
          </p>

          <h2 className="mt-4 text-3xl font-bold">
            Learn at your own pace.
          </h2>

          <div className="mt-12 grid gap-8 text-left sm:grid-cols-3">
            {[
              ["01", "Learn", "Understand concepts through simple lessons."],
              ["02", "Practice", "Apply your knowledge with exercises and quizzes."],
              ["03", "Grow", "Prepare for interviews and real-world challenges."],
            ].map(([number, title, description]) => (
              <div key={number} className="border-t border-white/15 pt-6">
                <p className="text-sm text-blue-400">{number}</p>
                <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-slate-400">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="font-semibold">
            SAP<span className="text-blue-400">Hub</span>
          </p>

          <p className="text-xs text-slate-500">
            © 2026 SAPHub. Built to make SAP learning accessible.
          </p>
        </div>

        <p className="mx-auto mt-4 max-w-7xl text-center text-[10px] text-slate-600">
          SAP is a trademark of SAP SE. SAPHub is an independent learning
          project and is not affiliated with or endorsed by SAP SE.
        </p>
      </footer>
    </main>
  );
}
