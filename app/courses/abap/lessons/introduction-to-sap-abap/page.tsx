
import Link from "next/link";
import KnowledgeCheck from "./knowledge-check";
import BookmarkButton from "@/components/learning/BookmarkButton";

export default function IntroductionToABAPPage() {
  return (
    <main className="min-h-screen bg-[#0b1120] text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 px-6 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            SAP<span className="text-blue-400">Hub</span>
          </Link>

          <Link
            href="/courses/abap"
            className="text-sm text-slate-400 hover:text-white"
          >
            ← Back to ABAP course
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-5 py-10">
        <article>
          {/* Lesson Heading */}
          <p className="text-xs font-semibold tracking-[0.2em] text-blue-400">
            SAP ABAP · CHAPTER 01 · LESSON 02
          </p>

          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
            Introduction to SAP ABAP
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Learn what ABAP is, why it is used in SAP systems, and how
            developers create programs using this language.
          </p>

          {/* Bookmark Button */}
          <div className="mt-6">
            <BookmarkButton
              lessonSlug="introduction-to-sap-abap"
              lessonTitle="Introduction to SAP ABAP"
              courseName="SAP ABAP"
            />
          </div>

          {/* Lesson Information */}
          <div className="my-8 flex flex-wrap gap-3 text-xs text-slate-400">
            <span className="rounded-lg border border-white/10 px-3 py-2">
              Beginner
            </span>
            <span className="rounded-lg border border-white/10 px-3 py-2">
              15–20 minutes
            </span>
            <span className="rounded-lg border border-white/10 px-3 py-2">
              Programming Fundamentals
            </span>
          </div>

          {/* Section 1 */}
          <section className="space-y-5 border-t border-white/10 pt-8">
            <h2 className="text-2xl font-bold">1. What is ABAP?</h2>

            <p className="leading-8 text-slate-300">
              ABAP is a programming language used to develop and extend
              applications in SAP environments. Developers use it to
              create programs that support an organization's business
              requirements.
            </p>

            <p className="leading-8 text-slate-300">
              For example, a company may need a custom report showing
              employee details, sales information, or material stock.
              An ABAP developer can build programs to provide this
              functionality.
            </p>

            <div className="rounded-2xl border border-blue-400/20 bg-blue-400/[0.06] p-6">
              <p className="text-sm text-blue-300">ABAP full form</p>
              <h3 className="mt-3 text-xl font-bold">
                Advanced Business Application Programming
              </h3>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mt-10 space-y-5">
            <h2 className="text-2xl font-bold">2. Why do we use ABAP?</h2>

            <p className="leading-8 text-slate-300">
              Standard SAP applications provide many business functions.
              However, organizations sometimes need additional features
              based on their specific requirements.
            </p>

            <p className="leading-8 text-slate-300">
              ABAP developers help customize and extend SAP applications
              to meet those requirements.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Reports", "Display business information in a structured format."],
                ["Data Processing", "Read, create, update, and process business data."],
                ["Enhancements", "Extend standard SAP functionality."],
                ["Interfaces", "Exchange information between SAP and other systems."],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-xl border border-white/10 bg-[#111c30] p-5"
                >
                  <h3 className="font-semibold text-blue-300">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 */}
          <section className="mt-10 space-y-5">
            <h2 className="text-2xl font-bold">3. Where is ABAP used?</h2>

            <p className="leading-8 text-slate-300">
              ABAP is primarily associated with SAP application
              development. It is used in SAP environments to build
              business logic and application functionality.
            </p>

            <ul className="list-disc space-y-3 pl-6 leading-7 text-slate-300">
              <li>Developing custom business reports.</li>
              <li>Creating and processing business data.</li>
              <li>Building forms and application functionality.</li>
              <li>Extending existing SAP applications.</li>
              <li>Integrating SAP with external applications.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mt-10 space-y-5">
            <h2 className="text-2xl font-bold">
              4. Your first ABAP program
            </h2>

            <p className="leading-8 text-slate-300">
              Let's understand a simple ABAP program that displays
              a welcome message.
            </p>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111c30]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                <span className="text-sm font-semibold text-slate-300">
                  First ABAP Program
                </span>
                <span className="text-xs text-blue-300">ABAP</span>
              </div>

              <pre className="overflow-x-auto p-5 text-sm leading-8 text-green-300">
                <code>{`REPORT Z_FIRST_PROGRAM.

WRITE: / 'WELCOME TO SAP ABAP'.

WRITE: / 'MY FIRST ABAP PROGRAM'.`}</code>
              </pre>
            </div>

            <h3 className="text-lg font-semibold">
              Explanation line by line
            </h3>

            <div className="space-y-4">
              {[
                ["REPORT Z_FIRST_PROGRAM.", "Declares the name of the executable ABAP report program."],
                ["WRITE:", "Displays output on the ABAP list screen."],
                ["/", "Moves the output to a new line."],
                ["'WELCOME TO SAP ABAP'", "The text that we want to display."],
              ].map(([code, explanation], index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/10 bg-[#111c30] p-4"
                >
                  <code className="text-sm font-semibold text-blue-300">
                    {code}
                  </code>
                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    {explanation}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-teal-400/20 bg-teal-400/[0.05] p-5">
              <h3 className="font-semibold text-teal-300">
                Expected Output
              </h3>
              <pre className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-200">
{`WELCOME TO SAP ABAP
MY FIRST ABAP PROGRAM`}
              </pre>
            </div>

            <p className="text-sm leading-7 text-slate-400">
              Note: This is a sample program. To execute it, create an
              ABAP report in an SAP development system, activate it,
              and run it.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mt-10 space-y-5">
            <h2 className="text-2xl font-bold">
              5. Tools used by ABAP developers
            </h2>

            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-[#111c30] p-5">
                <h3 className="font-semibold text-blue-300">SAP GUI</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  SAP GUI provides access to SAP systems and their
                  transactions, including traditional ABAP development
                  tools such as the ABAP Editor.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111c30] p-5">
                <h3 className="font-semibold text-blue-300">
                  ABAP Development Tools (ADT)
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  ADT is an Eclipse-based development environment used
                  for modern ABAP development.
                </p>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="mt-10 rounded-2xl border border-teal-400/20 bg-teal-400/[0.05] p-6">
            <h2 className="text-xl font-bold text-teal-300">
              Key Takeaways
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">
              <li>ABAP is a programming language used in SAP environments.</li>
              <li>It is used to build and extend SAP applications.</li>
              <li>ABAP developers create reports and business functionality.</li>
              <li>SAP GUI and ADT are development tools.</li>
              <li>REPORT and WRITE are basic ABAP statements.</li>
            </ul>
          </section>

          {/* Interactive Quiz */}
          <section className="mt-12">
            <p className="text-xs font-semibold tracking-[0.2em] text-blue-400">
              TEST YOUR KNOWLEDGE
            </p>

            <h2 className="mt-3 text-2xl font-bold">Knowledge Check</h2>

            <p className="mt-2 text-sm leading-7 text-slate-400">
              Test what you have learned about SAP ABAP.
              Select your answer to receive instant feedback.
            </p>

            <KnowledgeCheck />
          </section>

          {/* Lesson Navigation */}
          <div className="mt-12 flex justify-between gap-4 border-t border-white/10 pt-7">
            <Link
              href="/courses/abap/lessons/what-is-sap"
              className="rounded-xl border border-white/15 px-5 py-3 text-sm hover:bg-white/5"
            >
              ← Previous lesson
            </Link>

            <Link
              href="/courses/abap/lessons/sap-architecture"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
            >
              Next lesson →
            </Link>
          </div>
        </article>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-7 text-center text-xs text-slate-500">
        SAPHub — Learn. Connect. Grow.
      </footer>
    </main>
  );
}
