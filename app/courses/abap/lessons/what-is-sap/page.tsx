import BookmarkButton from "@/components/learning/BookmarkButton";

import Link from "next/link";
import KnowledgeCheck from "./knowledge-check";

export default function WhatIsSAPPage() {
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
            SAP ABAP · CHAPTER 01 · LESSON 01
          </p>

          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
            What is SAP?
          </h1>
            {/* Bookmark Button */}
            <div className="mt-6">
              <BookmarkButton
                lessonSlug="what-is-sap"
                lessonTitle="What is SAP?"
                courseName="SAP ABAP"
              />
            </div>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Understand SAP, why organizations use it, and how it helps
            businesses manage their daily operations.
          </p>

          {/* Lesson Information */}
          <div className="my-8 flex flex-wrap gap-3 text-xs text-slate-400">
            <span className="rounded-lg border border-white/10 px-3 py-2">
              Beginner
            </span>

            <span className="rounded-lg border border-white/10 px-3 py-2">
              10–15 minutes
            </span>

            <span className="rounded-lg border border-white/10 px-3 py-2">
              Fundamentals
            </span>
          </div>

          {/* Section 1 */}
          <section className="space-y-5 border-t border-white/10 pt-8">
            <h2 className="text-2xl font-bold">
              1. Introduction to SAP
            </h2>

            <p className="leading-8 text-slate-300">
              SAP is a software company that develops enterprise
              applications to help organizations manage their business
              operations. Its software connects different departments
              and helps them work with shared, consistent information.
            </p>

            <p className="leading-8 text-slate-300">
              For example, a manufacturing company may use SAP to manage
              purchasing, raw materials, production, inventory, sales,
              accounting, and employee-related processes.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mt-10 space-y-5">
            <h2 className="text-2xl font-bold">
              2. What does SAP stand for?
            </h2>

            <div className="rounded-2xl border border-blue-400/20 bg-blue-400/[0.06] p-6">
              <p className="text-sm text-blue-300">
                SAP full form
              </p>

              <h3 className="mt-3 text-xl font-bold leading-relaxed">
                Systems, Applications, and Products in Data Processing
              </h3>
            </div>

            <p className="leading-8 text-slate-300">
              SAP began in 1972 in Germany. It has grown into a major
              enterprise software provider, with products used by
              organizations around the world.
            </p>
          </section>

          {/* Section 3 */}
          <section className="mt-10 space-y-5">
            <h2 className="text-2xl font-bold">
              3. Why do companies use SAP?
            </h2>

            <p className="leading-8 text-slate-300">
              Imagine a company that manages sales in one application,
              inventory in another, and accounting in a spreadsheet.
              Information can become disconnected and difficult to
              maintain.
            </p>

            <p className="leading-8 text-slate-300">
              SAP helps integrate these processes so that relevant
              departments can work with consistent business data.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Finance", "Manage accounting and financial records."],
                ["Sales", "Manage orders and customer transactions."],
                ["Materials", "Manage purchasing and inventory."],
                ["Production", "Plan and monitor manufacturing."],
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

          {/* Section 4 */}
          <section className="mt-10 space-y-5">
            <h2 className="text-2xl font-bold">
              4. Real-world example
            </h2>

            <p className="leading-8 text-slate-300">
              Consider a customer ordering a product from a manufacturing
              company.
            </p>

            <ol className="space-y-3">
              {[
                "The sales department creates a customer order.",
                "Inventory information is checked.",
                "The warehouse prepares the required products.",
                "The delivery process is organized.",
                "The finance department records the transaction.",
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

            <p className="leading-8 text-slate-300">
              An integrated ERP system helps these departments coordinate
              their activities using connected business information.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mt-10 space-y-5">
            <h2 className="text-2xl font-bold">
              5. What are SAP modules?
            </h2>

            <p className="leading-8 text-slate-300">
              SAP applications support different business areas. Some
              commonly discussed areas include:
            </p>

            <ul className="list-disc space-y-3 pl-6 leading-7 text-slate-300">
              <li>
                <strong>SAP FI:</strong> Financial Accounting.
              </li>

              <li>
                <strong>SAP MM:</strong> Materials Management.
              </li>

              <li>
                <strong>SAP SD:</strong> Sales and Distribution.
              </li>

              <li>
                <strong>SAP PP:</strong> Production Planning.
              </li>

              <li>
                <strong>SAP ABAP:</strong> Development language used to
                build and extend SAP applications.
              </li>

              <li>
                <strong>SAP HANA:</strong> In-memory database platform.
              </li>
            </ul>
          </section>

          {/* Key Takeaways */}
          <section className="mt-10 rounded-2xl border border-teal-400/20 bg-teal-400/[0.05] p-6">
            <h2 className="text-xl font-bold text-teal-300">
              Key takeaways
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">
              <li>
                SAP is an enterprise software company and software ecosystem.
              </li>

              <li>
                SAP ERP helps integrate business processes.
              </li>

              <li>
                Different SAP applications support different business areas.
              </li>

              <li>
                ABAP is used for developing and extending SAP applications.
              </li>
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
              Select your answer for each question. You will receive
              instant feedback after making your selection.
            </p>

            <KnowledgeCheck />
          </section>

          {/* Lesson Navigation */}
          <div className="mt-12 flex justify-between gap-4 border-t border-white/10 pt-7">
            <Link
              href="/courses/abap"
              className="rounded-xl border border-white/15 px-5 py-3 text-sm hover:bg-white/5"
            >
              ← Course curriculum
            </Link>

            {/* FIXED NEXT LESSON URL */}
            <Link
              href="/courses/abap/lessons/introduction-to-sap-abap"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
            >
              Next lesson →
            </Link>
          </div>
        </article>

        {/* Lesson Sidebar */}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-7 text-center text-xs text-slate-500">
        SAPHub — Learn. Connect. Grow.
      </footer>
    </main>
  );
}
