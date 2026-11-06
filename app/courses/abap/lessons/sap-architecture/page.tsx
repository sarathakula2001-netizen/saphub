import BookmarkButton from "@/components/learning/BookmarkButton";

import Link from "next/link";
import KnowledgeCheck from "./knowledge-check";

export default function SAPArchitecturePage() {
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
            SAP ABAP · CHAPTER 01 · LESSON 03
          </p>

          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
            SAP Architecture
          </h1>
            {/* Bookmark Button */}
            <div className="mt-6">
              <BookmarkButton
                lessonSlug="sap-architecture"
                lessonTitle="SAP Architecture"
                courseName="SAP ABAP"
              />
            </div>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Understand how SAP systems are structured, how their
            components communicate, and how users interact with
            business applications.
          </p>

          {/* Lesson Information */}
          <div className="my-8 flex flex-wrap gap-3 text-xs text-slate-400">
            <span className="rounded-lg border border-white/10 px-3 py-2">
              Beginner
            </span>

            <span className="rounded-lg border border-white/10 px-3 py-2">
              20–25 minutes
            </span>

            <span className="rounded-lg border border-white/10 px-3 py-2">
              SAP Fundamentals
            </span>
          </div>

          {/* Section 1 */}
          <section className="space-y-5 border-t border-white/10 pt-8">
            <h2 className="text-2xl font-bold">
              1. What is SAP Architecture?
            </h2>

            <p className="leading-8 text-slate-300">
              SAP architecture describes how different components
              of an SAP system work together to process business
              information and provide services to users.
            </p>

            <p className="leading-8 text-slate-300">
              A commonly taught SAP system architecture is the
              three-tier architecture. It separates the system
              into three main layers.
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["01", "Presentation Layer", "User interface"],
                ["02", "Application Layer", "Business processing"],
                ["03", "Database Layer", "Data storage"],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="rounded-xl border border-white/10 bg-[#111c30] p-5"
                >
                  <p className="text-xs font-bold text-blue-400">
                    LAYER {number}
                  </p>

                  <h3 className="mt-3 font-semibold text-white">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Architecture Diagram */}
          <section className="mt-10 space-y-5">
            <h2 className="text-2xl font-bold">
              2. Three-Tier Architecture
            </h2>

            <p className="leading-8 text-slate-300">
              Let's understand how the three layers are connected.
            </p>

            <div className="rounded-2xl border border-white/10 bg-[#111c30] p-5 sm:p-7">
              <div className="mx-auto max-w-md space-y-3 text-center">
                <div className="rounded-xl border border-blue-400/40 bg-blue-500/10 p-5">
                  <p className="text-xs font-semibold tracking-wider text-blue-300">
                    TIER 1
                  </p>
                  <h3 className="mt-2 text-lg font-bold">
                    Presentation Layer
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">
                    SAP GUI · User Interface
                  </p>
                </div>

                <div className="text-2xl text-blue-400">↕</div>

                <div className="rounded-xl border border-purple-400/40 bg-purple-500/10 p-5">
                  <p className="text-xs font-semibold tracking-wider text-purple-300">
                    TIER 2
                  </p>
                  <h3 className="mt-2 text-lg font-bold">
                    Application Layer
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">
                    ABAP Programs · Business Logic
                  </p>
                </div>

                <div className="text-2xl text-blue-400">↕</div>

                <div className="rounded-xl border border-teal-400/40 bg-teal-500/10 p-5">
                  <p className="text-xs font-semibold tracking-wider text-teal-300">
                    TIER 3
                  </p>
                  <h3 className="mt-2 text-lg font-bold">
                    Database Layer
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">
                    SAP HANA · Business Data
                  </p>
                </div>
              </div>

              <p className="mt-5 text-center text-xs leading-6 text-slate-500">
                Simplified conceptual representation of a
                three-tier SAP architecture.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mt-10 space-y-5">
            <h2 className="text-2xl font-bold">
              3. Presentation Layer
            </h2>

            <p className="leading-8 text-slate-300">
              The presentation layer is the interface through
              which users interact with an SAP system.
            </p>

            <p className="leading-8 text-slate-300">
              For example, when you open SAP GUI and enter a
              transaction code, you are interacting with the
              presentation layer.
            </p>

            <div className="rounded-xl border border-blue-400/20 bg-blue-400/[0.05] p-5">
              <h3 className="font-semibold text-blue-300">
                Main responsibilities
              </h3>

              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">
                <li>Display screens and forms.</li>
                <li>Accept user input.</li>
                <li>Send user requests to the application layer.</li>
                <li>Display the results returned by the system.</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mt-10 space-y-5">
            <h2 className="text-2xl font-bold">
              4. Application Layer
            </h2>

            <p className="leading-8 text-slate-300">
              The application layer processes requests received
              from the presentation layer. It executes application
              logic and coordinates access to business data.
            </p>

            <p className="leading-8 text-slate-300">
              ABAP programs generally execute in the application
              layer of an ABAP-based SAP system.
            </p>

            <div className="rounded-xl border border-purple-400/20 bg-purple-400/[0.05] p-5">
              <h3 className="font-semibold text-purple-300">
                Main responsibilities
              </h3>

              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">
                <li>Execute ABAP programs.</li>
                <li>Process business rules.</li>
                <li>Validate user input.</li>
                <li>Communicate with the database.</li>
                <li>Return processed results.</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mt-10 space-y-5">
            <h2 className="text-2xl font-bold">
              5. Database Layer
            </h2>

            <p className="leading-8 text-slate-300">
              The database layer stores and manages the business
              information used by SAP applications.
            </p>

            <p className="leading-8 text-slate-300">
              Examples include customer information, employee
              records, material details, sales orders, and
              financial transactions.
            </p>

            <div className="rounded-xl border border-teal-400/20 bg-teal-400/[0.05] p-5">
              <h3 className="font-semibold text-teal-300">
                Main responsibilities
              </h3>

              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">
                <li>Store business information.</li>
                <li>Retrieve requested records.</li>
                <li>Update and maintain data.</li>
                <li>Support database transactions.</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mt-10 space-y-5">
            <h2 className="text-2xl font-bold">
              6. How do the three layers communicate?
            </h2>

            <p className="leading-8 text-slate-300">
              Imagine an employee opening an employee report
              in an SAP system.
            </p>

            <ol className="space-y-3">
              {[
                "The user opens SAP GUI and requests an employee report.",
                "The presentation layer sends the request to the application layer.",
                "The application layer executes the relevant ABAP program.",
                "The application layer retrieves employee records from the database.",
                "The processed result is returned and displayed to the user.",
              ].map((step, index) => (
                <li
                  key={step}
                  className="flex gap-4 rounded-xl border border-white/10 bg-[#111c30] p-4"
                >
                  <span className="font-bold text-blue-400">
                    0{index + 1}
                  </span>

                  <span className="text-sm leading-6 text-slate-300">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {/* Section 7 */}
          <section className="mt-10 space-y-5">
            <h2 className="text-2xl font-bold">
              7. Why is this architecture important for ABAP developers?
            </h2>

            <p className="leading-8 text-slate-300">
              Understanding SAP architecture helps ABAP developers
              understand where their programs execute and how
              applications communicate with databases.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Program Execution", "Understand where ABAP programs run."],
                ["Database Access", "Understand how programs retrieve data."],
                ["Troubleshooting", "Identify which system layer may have an issue."],
                ["Performance", "Understand the different processing responsibilities."],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-xl border border-white/10 bg-[#111c30] p-5"
                >
                  <h3 className="font-semibold text-blue-300">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="mt-10 rounded-2xl border border-teal-400/20 bg-teal-400/[0.05] p-6">
            <h2 className="text-xl font-bold text-teal-300">
              Key Takeaways
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">
              <li>SAP architecture describes how system components work together.</li>
              <li>The three-tier architecture has three main layers.</li>
              <li>The presentation layer provides the user interface.</li>
              <li>The application layer processes business logic.</li>
              <li>The database layer stores business information.</li>
              <li>ABAP programs generally execute in the application layer.</li>
            </ul>
          </section>

          {/* Interactive Quiz */}
          <section className="mt-12">
            <p className="text-xs font-semibold tracking-[0.2em] text-blue-400">
              TEST YOUR KNOWLEDGE
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Knowledge Check
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-400">
              Test your understanding of the three-tier SAP architecture.
            </p>

            <KnowledgeCheck />
          </section>

          {/* Lesson Navigation */}
          <div className="mt-12 flex justify-between gap-4 border-t border-white/10 pt-7">
            <Link
              href="/courses/abap/lessons/introduction-to-sap-abap"
              className="rounded-xl border border-white/15 px-5 py-3 text-sm hover:bg-white/5"
            >
              ← Previous lesson
            </Link>

            <Link
              href="/courses/abap/lessons/understanding-abap-workbench"
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
