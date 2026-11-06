import BookmarkButton from "@/components/learning/BookmarkButton";

import Link from "next/link";
import KnowledgeCheck from "./knowledge-check";

const tools = [
  {
    number: "01",
    title: "ABAP Editor",
    transaction: "SE38",
    description:
      "Used to create, edit, check, and execute ABAP programs. It is one of the main tools developers use when writing ABAP code.",
  },
  {
    number: "02",
    title: "Object Navigator",
    transaction: "SE80",
    description:
      "Provides a central place to browse and manage development objects such as programs, packages, classes, and function groups.",
  },
  {
    number: "03",
    title: "ABAP Dictionary",
    transaction: "SE11",
    description:
      "Used to define and manage database-related objects such as tables, structures, views, data elements, and domains.",
  },
  {
    number: "04",
    title: "Function Builder",
    transaction: "SE37",
    description:
      "Used to create, display, test, and maintain function modules that contain reusable functionality.",
  },
  {
    number: "05",
    title: "Class Builder",
    transaction: "SE24",
    description:
      "Used to create and maintain global ABAP classes and interfaces for object-oriented programming.",
  },
];

export default function ABAPWorkbenchLesson() {
  return (
    <main className="min-h-screen bg-[#0b1120] text-slate-200">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0b1120]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-2xl font-bold tracking-tight text-white">
            SAP<span className="text-blue-400">Hub</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-slate-400 md:flex">
            <Link href="/" className="transition hover:text-white">Home</Link>
            <Link href="/courses/abap" className="text-blue-400">ABAP Course</Link>
            <Link href="/courses/hana" className="transition hover:text-white">HANA Course</Link>
          </nav>

          <Link
            href="/courses/abap"
            className="rounded-lg border border-white/15 px-4 py-2 text-sm transition hover:border-blue-400 hover:text-white"
          >
            Course Overview
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10">
        <article className="min-w-0">
          <div className="mb-8">
            <Link
              href="/courses/abap"
              className="text-sm text-blue-400 transition hover:text-blue-300"
            >
              ABAP Course
            </Link>
            <span className="mx-2 text-slate-600">/</span>
            <span className="text-sm text-slate-500">Lesson 4</span>
          </div>

          <div className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-300">
                CHAPTER 1
              </span>
              <span className="text-sm text-slate-500">10–15 min read</span>
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              Understanding the ABAP Workbench
            </h1>
            {/* Bookmark Button */}
            <div className="mt-6">
              <BookmarkButton
                lessonSlug="understanding-abap-workbench"
                lessonTitle="Understanding the ABAP Workbench"
                courseName="SAP ABAP"
              />
            </div>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              Explore the development environment used by ABAP developers.
              Learn about important tools, transaction codes, and how they
              help you build SAP applications.
            </p>
          </div>

          <section className="mb-10 rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-teal-500/5 p-6">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-300">
              Learning objective
            </p>
            <p className="leading-7 text-slate-300">
              By the end of this lesson, you should be able to explain what
              the ABAP Workbench is, identify its important development tools,
              and recognize commonly used transaction codes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              1. What is the ABAP Workbench?
            </h2>

            <p className="mb-4 leading-8 text-slate-300">
              The <strong className="text-white">ABAP Workbench</strong> is a
              collection of development tools in SAP used to create, edit,
              test, and maintain ABAP development objects.
            </p>

            <p className="mb-5 leading-8 text-slate-300">
              As an ABAP developer, you use these tools to write programs,
              create database tables, manage reusable code, and develop
              business applications.
            </p>

            <div className="rounded-xl border border-white/10 bg-[#111c30] p-5">
              <p className="mb-3 font-semibold text-white">
                Think of it this way:
              </p>
              <p className="leading-7 text-slate-400">
                If ABAP is the programming language, the ABAP Workbench is
                the collection of tools that helps you develop and manage
                applications using that language.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              2. Important ABAP Workbench tools
            </h2>

            <p className="mb-6 leading-8 text-slate-300">
              Each tool has a specific responsibility. Here are five
              important tools you should know as a beginner.
            </p>

            <div className="space-y-4">
              {tools.map((tool) => (
                <div
                  key={tool.number}
                  className="rounded-xl border border-white/10 bg-[#111c30] p-5 transition hover:border-blue-400/40"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-sm font-bold text-blue-300">
                        {tool.number}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {tool.title}
                        </h3>
                        <p className="mt-2 leading-7 text-slate-400">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-lg border border-teal-400/20 bg-teal-400/10 px-3 py-1.5 font-mono text-sm font-semibold text-teal-300">
                      {tool.transaction}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              3. Important transaction codes
            </h2>

            <p className="mb-5 leading-8 text-slate-300">
              A transaction code, commonly called a T-code, is a shortcut
              used to open a particular SAP function or tool.
            </p>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#17243a] text-slate-300">
                  <tr>
                    <th className="px-4 py-3">Transaction code</th>
                    <th className="px-4 py-3">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-[#111c30] text-slate-400">
                  <tr>
                    <td className="px-4 py-3 font-mono text-blue-300">SE38</td>
                    <td className="px-4 py-3">ABAP Editor</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-blue-300">SE80</td>
                    <td className="px-4 py-3">Object Navigator</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-blue-300">SE11</td>
                    <td className="px-4 py-3">ABAP Dictionary</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-blue-300">SE37</td>
                    <td className="px-4 py-3">Function Builder</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-blue-300">SE24</td>
                    <td className="px-4 py-3">Class Builder</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-[#111c30] p-5">
              <h3 className="mb-2 font-semibold text-white">
                How do you open a transaction?
              </h3>
              <ol className="list-inside list-decimal space-y-2 leading-7 text-slate-400">
                <li>Log in to your SAP system.</li>
                <li>Find the command field in the SAP GUI.</li>
                <li>Enter a transaction code, such as SE38.</li>
                <li>Press Enter to open the corresponding tool.</li>
              </ol>
              <p className="mt-3 text-sm text-slate-500">
                The available transactions depend on your SAP system,
                authorization, and configuration.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              4. Practical example: Create an ABAP program
            </h2>

            <p className="mb-5 leading-8 text-slate-300">
              Let's understand how the ABAP Editor is used to create a simple
              program.
            </p>

            <div className="mb-5 rounded-xl border border-white/10 bg-[#111c30] p-5">
              <p className="mb-3 text-sm font-semibold text-blue-300">
                Follow these steps
              </p>
              <ol className="list-inside list-decimal space-y-3 leading-7 text-slate-300">
                <li>Open transaction SE38.</li>
                <li>Enter a program name, for example Z_MY_FIRST_PROGRAM.</li>
                <li>Choose Create.</li>
                <li>Enter a short description.</li>
                <li>Select the appropriate program type and continue.</li>
                <li>Write your ABAP code in the editor.</li>
                <li>Save, activate, and execute the program.</li>
              </ol>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="flex items-center justify-between border-b border-white/10 bg-[#17243a] px-4 py-3">
                <span className="text-sm font-semibold text-slate-300">
                  Z_MY_FIRST_PROGRAM
                </span>
                <span className="text-xs text-slate-500">ABAP</span>
              </div>
              <pre className="overflow-x-auto bg-[#080e19] p-5 text-sm leading-7 text-slate-300">
                <code>{`REPORT Z_MY_FIRST_PROGRAM.

WRITE: / 'Welcome to SAP ABAP'.
WRITE: / 'I am learning the ABAP Workbench'.`}</code>
              </pre>
            </div>

            <div className="mt-5 rounded-xl border border-teal-400/20 bg-teal-400/5 p-5">
              <p className="mb-2 font-semibold text-teal-300">
                Expected output
              </p>
              <pre className="whitespace-pre-wrap font-mono text-sm leading-7 text-slate-300">
{`Welcome to SAP ABAP
I am learning the ABAP Workbench`}
              </pre>
            </div>

            <p className="mt-5 leading-8 text-slate-300">
              Notice that we use the REPORT statement to define the program
              and WRITE statements to display output. You will learn more
              about ABAP statements in the upcoming lessons.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              5. What should a beginner remember?
            </h2>

            <div className="space-y-3">
              {[
                "The ABAP Workbench contains tools for SAP development.",
                "SE38 is used to work with ABAP programs.",
                "SE80 provides a central development environment.",
                "SE11 is used to manage ABAP Dictionary objects.",
                "SE37 is used to manage function modules.",
                "SE24 is used to work with global classes and interfaces.",
              ].map((item, index) => (
                <div key={index} className="flex gap-3 text-slate-300">
                  <span className="mt-1 text-teal-400">✓</span>
                  <p className="leading-7">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="knowledge-check" className="mb-12">
            <div className="mb-5">
              <span className="text-sm font-semibold uppercase tracking-wider text-blue-300">
                Test your knowledge
              </span>
              <h2 className="mt-2 text-2xl font-bold text-white">
                Lesson 4 Knowledge Check
              </h2>
              <p className="mt-2 leading-7 text-slate-400">
                Answer these questions to check how well you understood
                the ABAP Workbench.
              </p>
            </div>
            <KnowledgeCheck />
          </section>

          <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row">
            <Link
              href="/courses/abap/lessons/sap-architecture"
              className="rounded-xl border border-white/15 px-5 py-3 text-center text-sm font-semibold text-slate-300 transition hover:border-blue-400 hover:text-white"
            >
              ← Previous Lesson
            </Link>

            <Link
              href="/courses/abap/lessons/introduction-to-variables"
              className="rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Next Lesson →
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
