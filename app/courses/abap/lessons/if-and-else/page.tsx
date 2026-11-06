import BookmarkButton from "@/components/learning/BookmarkButton";

import Link from "next/link";
import KnowledgeCheck from "./knowledge-check";

const CodeExample = ({
  title,
  description,
  code,
}: {
  title: string;
  description: string;
  code: string;
}) => (
  <div className="my-6 overflow-hidden rounded-xl border border-slate-700 bg-[#0b1220]">
    <div className="border-b border-slate-700 px-5 py-3">
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-400">{description}</p>
    </div>
    <pre className="overflow-x-auto p-5 text-sm leading-7 text-emerald-300">
      <code>{code}</code>
    </pre>
  </div>
);

export default function IfAndElseLesson() {
  return (
    <main className="min-h-screen bg-[#0b1120] text-slate-200">
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-[#0b1120]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-2xl font-bold text-white">
            SAP<span className="text-blue-500">Hub</span>
          </Link>
          <Link
            href="/courses/abap"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            Back to ABAP Course
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10">

        <article className="min-w-0">
          <div className="mb-8">
            <p className="text-sm font-semibold text-blue-400">
              LESSON 13 · CONDITIONAL STATEMENTS
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">
              IF and ELSE Statements in ABAP
            </h1>
            {/* Bookmark Button */}
            <div className="mt-6">
              <BookmarkButton
                lessonSlug="if-and-else"
                lessonTitle="IF and ELSE Statements in ABAP"
                courseName="SAP ABAP"
              />
            </div>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              Learn how to make decisions in ABAP programs using IF, ELSE,
              ELSEIF and nested IF statements.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              1. What are Conditional Statements?
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Conditional statements allow a program to make decisions based
              on a given condition. Depending on whether the condition is
              true or false, ABAP executes different blocks of code.
            </p>
            <p className="mt-3 leading-8 text-slate-400">
              For example, imagine a student receives 50 marks. Your program
              can check whether the student has passed or failed.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              2. IF Statement
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              The IF statement executes a block of code only when its
              condition is true.
            </p>

            <CodeExample
              title="Basic IF statement"
              description="Display a message when the age is 18 or above."
              code={`REPORT Z_IF_EXAMPLE.

DATA lv_age TYPE i.

lv_age = 20.

IF lv_age >= 18.
  WRITE: / 'You are eligible.'.
ENDIF.`}
            />

            <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-5">
              <p className="font-semibold text-blue-300">Explanation</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                <li><strong>IF</strong> – Starts the condition.</li>
                <li><strong>lv_age &gt;= 18</strong> – Checks whether age is at least 18.</li>
                <li><strong>WRITE</strong> – Displays the message if the condition is true.</li>
                <li><strong>ENDIF</strong> – Ends the IF block.</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              3. IF...ELSE Statement
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              IF...ELSE is used when you want to execute one block if a
              condition is true and another block if it is false.
            </p>

            <CodeExample
              title="Student pass or fail"
              description="Check whether a student has scored at least 35 marks."
              code={`REPORT Z_IF_ELSE.

DATA lv_marks TYPE i.

lv_marks = 28.

IF lv_marks >= 35.
  WRITE: / 'Student Passed'.
ELSE.
  WRITE: / 'Student Failed'.
ENDIF.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              Since the marks are 28, the condition is false. Therefore,
              the ELSE block executes and displays Student Failed.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              4. ELSEIF Statement
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              ELSEIF allows you to check multiple conditions. ABAP checks
              them in order and executes the first matching block.
            </p>

            <CodeExample
              title="Grade calculation"
              description="Assign a grade based on the student's marks."
              code={`REPORT Z_ELSEIF.

DATA lv_marks TYPE i.

lv_marks = 85.

IF lv_marks >= 90.
  WRITE: / 'Grade A'.
ELSEIF lv_marks >= 75.
  WRITE: / 'Grade B'.
ELSEIF lv_marks >= 50.
  WRITE: / 'Grade C'.
ELSE.
  WRITE: / 'Grade D'.
ENDIF.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              Here, the marks are 85. The first condition is false, but
              the second condition is true. So the output is Grade B.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              5. Nested IF Statements
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              A nested IF means placing one IF statement inside another IF
              statement. It is useful when a decision depends on multiple
              levels of conditions.
            </p>

            <CodeExample
              title="Nested IF example"
              description="Check age first, then check whether the person has an ID card."
              code={`REPORT Z_NESTED_IF.

DATA: lv_age TYPE i,
      lv_has_id TYPE c LENGTH 1.

lv_age = 22.
lv_has_id = 'Y'.

IF lv_age >= 18.
  IF lv_has_id = 'Y'.
    WRITE: / 'Entry Allowed'.
  ELSE.
    WRITE: / 'ID Card Required'.
  ENDIF.
ELSE.
  WRITE: / 'Age Requirement Not Met'.
ENDIF.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              First, ABAP checks the age. If the age condition is true,
              it checks the ID card condition. Notice that each IF has
              its own ENDIF.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              6. Practical Example – Employee Bonus
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Let's create a program that checks an employee's performance
              score and decides the bonus category.
            </p>

            <CodeExample
              title="Employee bonus calculation"
              description="A simple conditional program using PARAMETERS."
              code={`REPORT Z_EMPLOYEE_BONUS.

PARAMETERS p_score TYPE i.

IF p_score >= 90.
  WRITE: / 'Excellent Performance'.
  WRITE: / 'Bonus: 10000'.
ELSEIF p_score >= 75.
  WRITE: / 'Good Performance'.
  WRITE: / 'Bonus: 5000'.
ELSEIF p_score >= 50.
  WRITE: / 'Average Performance'.
  WRITE: / 'Bonus: 2000'.
ELSE.
  WRITE: / 'Needs Improvement'.
  WRITE: / 'No Bonus'.
ENDIF.`}
            />

            <div className="mt-5 rounded-xl border border-slate-700 bg-slate-900/70 p-5">
              <h3 className="font-semibold text-white">Try these inputs</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-400">
                <li>Score 95 → Excellent Performance</li>
                <li>Score 80 → Good Performance</li>
                <li>Score 60 → Average Performance</li>
                <li>Score 40 → Needs Improvement</li>
              </ul>
              <p className="mt-4 text-sm text-slate-500">
                In SAP GUI, PARAMETERS creates an input field on the
                report selection screen.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              7. Important Points to Remember
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["IF", "Checks a condition."],
                ["ELSE", "Runs when the IF condition is false."],
                ["ELSEIF", "Checks another condition."],
                ["ENDIF", "Closes an IF block."],
                ["Nested IF", "An IF statement inside another IF."],
                ["Condition order", "ELSEIF conditions are checked from top to bottom."],
              ].map(([term, explanation]) => (
                <div
                  key={term}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"
                >
                  <h3 className="font-semibold text-blue-400">{term}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {explanation}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <KnowledgeCheck />
          </section>

          <div className="flex flex-col justify-between gap-4 border-t border-slate-800 pt-7 sm:flex-row">
            <Link
              href="/courses/abap/lessons/working-with-expressions"
              className="rounded-xl border border-slate-700 px-5 py-3 text-center text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              ← Previous Lesson
            </Link>
            <Link
              href="/courses/abap/lessons/elseif-statements"
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
