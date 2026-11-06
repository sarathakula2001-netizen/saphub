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

export default function ElseIfLesson() {
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
              LESSON 14 · CONDITIONAL STATEMENTS
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">
              ELSEIF Statements in SAP ABAP
            </h1>
            {/* Bookmark Button */}
            <div className="mt-6">
              <BookmarkButton
                lessonSlug="elseif-statements"
                lessonTitle="ELSEIF Statements in SAP ABAP"
                courseName="SAP ABAP"
              />
            </div>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              Learn how to check multiple conditions and execute different
              blocks of code based on the result.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              1. What is ELSEIF?
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              ELSEIF is used when a program needs to check more than one
              condition. It allows you to test another condition if the
              previous IF or ELSEIF condition was false.
            </p>
            <p className="mt-3 leading-8 text-slate-400">
              For example, a student can receive different grades depending
              on their marks. We can use ELSEIF to check each marks range.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              2. Difference Between IF, ELSE and ELSEIF
            </h2>
            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-700">
              <table className="w-full min-w-[450px] text-left text-sm">
                <thead className="bg-slate-800 text-slate-200">
                  <tr>
                    <th className="p-4">Keyword</th>
                    <th className="p-4">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-400">
                  <tr>
                    <td className="p-4 font-semibold text-blue-400">IF</td>
                    <td className="p-4">Checks the first condition.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-blue-400">ELSEIF</td>
                    <td className="p-4">Checks another condition.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-blue-400">ELSE</td>
                    <td className="p-4">Runs when all previous conditions are false.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-blue-400">ENDIF</td>
                    <td className="p-4">Closes the IF structure.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              3. Basic ELSEIF Syntax
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              The following is the general structure of an IF...ELSEIF...ELSE
              statement in ABAP.
            </p>

            <CodeExample
              title="ELSEIF syntax"
              description="General ABAP conditional structure."
              code={`IF condition_1.
  " Statements for condition 1

ELSEIF condition_2.
  " Statements for condition 2

ELSEIF condition_3.
  " Statements for condition 3

ELSE.
  " Statements when no condition is true

ENDIF.`}
            />

            <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-5">
              <p className="font-semibold text-blue-300">Remember</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                ABAP checks conditions from top to bottom. Once a condition
                is true, its block executes and the remaining branches are
                skipped.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              4. Student Grade Calculation
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Let's create a program that assigns a grade based on student
              marks.
            </p>

            <CodeExample
              title="Student grade program"
              description="Check marks and display the appropriate grade."
              code={`REPORT Z_STUDENT_GRADE.

DATA lv_marks TYPE i.

lv_marks = 85.

IF lv_marks >= 90.
  WRITE: / 'Grade A'.
ELSEIF lv_marks >= 75.
  WRITE: / 'Grade B'.
ELSEIF lv_marks >= 50.
  WRITE: / 'Grade C'.
ELSEIF lv_marks >= 35.
  WRITE: / 'Grade D'.
ELSE.
  WRITE: / 'Fail'.
ENDIF.`}
            />

            <div className="mt-5 rounded-xl border border-slate-700 bg-slate-900/70 p-5">
              <h3 className="font-semibold text-white">How does it work?</h3>
              <ol className="mt-3 space-y-2 text-sm leading-7 text-slate-400">
                <li>1. Marks are assigned as 85.</li>
                <li>2. The first condition checks whether marks are at least 90. It is false.</li>
                <li>3. The second condition checks whether marks are at least 75. It is true.</li>
                <li>4. ABAP displays Grade B and skips the remaining conditions.</li>
              </ol>
              <p className="mt-4 font-semibold text-green-400">
                Expected Output: Grade B
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              5. Employee Bonus Calculation
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              A company wants to calculate employee bonuses based on
              performance scores.
            </p>

            <CodeExample
              title="Employee bonus program"
              description="Different bonus amounts for different performance levels."
              code={`REPORT Z_EMPLOYEE_BONUS.

DATA: lv_score TYPE i,
      lv_bonus TYPE i.

lv_score = 82.

IF lv_score >= 90.
  lv_bonus = 10000.
ELSEIF lv_score >= 75.
  lv_bonus = 5000.
ELSEIF lv_score >= 50.
  lv_bonus = 2000.
ELSE.
  lv_bonus = 0.
ENDIF.

WRITE: / 'Performance Score:', lv_score.
WRITE: / 'Employee Bonus:', lv_bonus.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              With a score of 82, the program assigns a bonus of 5000.
              The final WRITE statements display the score and bonus.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              6. Electricity Bill Classification
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Here is another example that classifies electricity usage
              into different categories.
            </p>

            <CodeExample
              title="Electricity usage program"
              description="Classify usage based on units consumed."
              code={`REPORT Z_ELECTRICITY_USAGE.

DATA lv_units TYPE i.

lv_units = 250.

IF lv_units <= 100.
  WRITE: / 'Low Usage'.
ELSEIF lv_units <= 200.
  WRITE: / 'Medium Usage'.
ELSEIF lv_units <= 300.
  WRITE: / 'High Usage'.
ELSE.
  WRITE: / 'Very High Usage'.
ENDIF.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              Since 250 is greater than 200 but not greater than 300,
              the output is High Usage.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              7. Important Points to Remember
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["Multiple conditions", "ELSEIF lets you check several conditions."],
                ["Top-to-bottom order", "Conditions are evaluated in sequence."],
                ["First match", "Only the first true branch executes."],
                ["ELSE", "Provides a fallback when no condition matches."],
                ["ENDIF", "Closes the complete conditional structure."],
                ["Condition ranges", "Arrange conditions carefully to avoid unreachable branches."],
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
              href="/courses/abap/lessons/if-and-else"
              className="rounded-xl border border-slate-700 px-5 py-3 text-center text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              ← Previous Lesson
            </Link>
            <Link
              href="/courses/abap/lessons/case-statements"
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
