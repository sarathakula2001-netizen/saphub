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

export default function DoLoopsLesson() {
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
              LESSON 17 · LOOPS AND ITERATIONS
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">
              DO Loops in SAP ABAP
            </h1>
            {/* Bookmark Button */}
            <div className="mt-6">
              <BookmarkButton
                lessonSlug="do-loops"
                lessonTitle="DO Loops in SAP ABAP"
                courseName="SAP ABAP"
              />
            </div>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              Learn how to repeat statements multiple times using DO loops,
              understand sy-index and control loop execution with EXIT.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              1. What is a Loop?
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              A loop is a programming structure that executes a block of
              statements repeatedly. Instead of writing the same statement
              many times, we can use a loop.
            </p>
            <p className="mt-3 leading-8 text-slate-400">
              For example, if you want to display numbers from 1 to 10,
              you can use a DO loop instead of writing ten WRITE statements.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              2. Introduction to DO Loops
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              The DO statement is used to execute a block of ABAP statements
              repeatedly. You can specify how many times the loop should run.
            </p>

            <CodeExample
              title="Basic DO loop"
              description="Repeat a statement five times."
              code={`REPORT Z_DO_EXAMPLE.

DO 5 TIMES.
  WRITE: / 'Welcome to SAP ABAP'.
ENDDO.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              The message is displayed five times. ENDDO marks the end
              of the loop.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              3. DO Loop Syntax
            </h2>

            <CodeExample
              title="General syntax"
              description="Structure of a DO loop."
              code={`DO number_of_times TIMES.

  " Statements to repeat

ENDDO.`}
            />

            <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-5">
              <p className="font-semibold text-blue-300">Explanation</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                <li><strong>DO</strong> – Starts the loop.</li>
                <li><strong>Number of times</strong> – Specifies the repetition count.</li>
                <li><strong>Statements</strong> – The code executed repeatedly.</li>
                <li><strong>ENDDO</strong> – Ends the loop block.</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              4. Understanding sy-index
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              sy-index is a system field in ABAP that contains the current
              iteration number of a DO loop. It starts at 1 and increases
              with each iteration.
            </p>

            <CodeExample
              title="Using sy-index"
              description="Display the current iteration number."
              code={`REPORT Z_DO_INDEX.

DO 5 TIMES.
  WRITE: / 'Iteration:', sy-index.
ENDDO.`}
            />

            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-700">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-800 text-slate-200">
                  <tr>
                    <th className="p-4">Iteration</th>
                    <th className="p-4">sy-index</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-400">
                  {[1, 2, 3, 4, 5].map((number) => (
                    <tr key={number}>
                      <td className="p-4">{number}</td>
                      <td className="p-4 text-blue-400">{number}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              5. Printing a Multiplication Table
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              We can combine DO loops and arithmetic operators to generate
              a multiplication table.
            </p>

            <CodeExample
              title="Multiplication table"
              description="Generate the multiplication table of 5."
              code={`REPORT Z_MULTIPLICATION_TABLE.

DATA lv_result TYPE i.

DO 10 TIMES.
  lv_result = 5 * sy-index.

  WRITE: / '5 x', sy-index, '=', lv_result.
ENDDO.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              Each iteration multiplies 5 by the current sy-index value.
              The result is displayed from 5 x 1 through 5 x 10.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              6. Using EXIT to Stop a DO Loop
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              EXIT is used to terminate the current loop immediately.
              When ABAP encounters EXIT inside a loop, it leaves that loop
              and continues with the statement after ENDDO.
            </p>

            <CodeExample
              title="Stop the loop at 5"
              description="Use EXIT when the current iteration reaches 5."
              code={`REPORT Z_DO_EXIT.

DO 10 TIMES.

  IF sy-index = 5.
    EXIT.
  ENDIF.

  WRITE: / sy-index.

ENDDO.

WRITE: / 'Loop completed'.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              The loop stops when sy-index reaches 5. The numbers 1 to 4
              are displayed, followed by Loop completed.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              7. Calculating the Sum of Numbers
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Let's calculate the sum of numbers from 1 to 10 using a
              DO loop.
            </p>

            <CodeExample
              title="Sum calculation"
              description="Add each iteration value to a total."
              code={`REPORT Z_DO_SUM.

DATA lv_sum TYPE i.

lv_sum = 0.

DO 10 TIMES.
  lv_sum = lv_sum + sy-index.
ENDDO.

WRITE: / 'Sum of numbers:', lv_sum.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              The program adds 1 + 2 + 3 and continues until 10.
              The final result is 55.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              8. Important Points to Remember
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["DO", "Starts a loop."],
                ["ENDDO", "Closes the DO loop."],
                ["TIMES", "Specifies how many times to repeat."],
                ["sy-index", "Stores the current DO loop iteration."],
                ["EXIT", "Terminates the current loop immediately."],
                ["Loop variable", "Can be used to perform calculations."],
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
              href="/courses/abap/lessons/practical-exercises"
              className="rounded-xl border border-slate-700 px-5 py-3 text-center text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              ← Previous Lesson
            </Link>
            <Link
              href="/courses/abap/lessons/while-loops"
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
