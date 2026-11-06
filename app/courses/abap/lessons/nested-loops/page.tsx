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

export default function NestedLoopsLesson() {
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
              LESSON 20 · LOOPS AND ITERATIONS
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">
              Nested Loops in SAP ABAP
            </h1>
            {/* Bookmark Button */}
            <div className="mt-6">
              <BookmarkButton
                lessonSlug="nested-loops"
                lessonTitle="Nested Loops in SAP ABAP"
                courseName="SAP ABAP"
              />
            </div>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              Learn how to place one loop inside another loop and control
              repeated operations using outer and inner loops.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              1. What Are Nested Loops?
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              A nested loop means placing one loop inside another loop.
              The loop outside is called the outer loop, and the loop
              inside is called the inner loop.
            </p>

            <div className="mt-5 rounded-xl border border-blue-500/20 bg-blue-500/10 p-5">
              <p className="font-semibold text-blue-300">Simple example</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Imagine 3 students, and each student has 2 subjects.
                The outer loop processes each student. The inner loop
                processes that student's subjects.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              2. Understanding Outer and Inner Loops
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              The inner loop completes all its iterations every time
              the outer loop performs one iteration.
            </p>

            <CodeExample
              title="Basic nested DO loop"
              description="An outer loop runs 3 times and an inner loop runs 2 times."
              code={`REPORT Z_NESTED_LOOP.

DO 3 TIMES.

  WRITE: / 'Outer Loop:', sy-index.

  DO 2 TIMES.

    WRITE: / '  Inner Loop:', sy-index.

  ENDDO.

ENDDO.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              The outer loop runs 3 times. For every outer iteration,
              the inner loop runs 2 times. Therefore, the inner loop
              executes 6 times in total.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              3. Understanding the Execution Order
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Let's understand the execution step by step.
            </p>

            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-700">
              <table className="w-full min-w-[400px] text-left text-sm">
                <thead className="bg-slate-800 text-slate-200">
                  <tr>
                    <th className="p-4">Outer iteration</th>
                    <th className="p-4">Inner iterations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-400">
                  {[
                    ["1", "1, 2"],
                    ["2", "1, 2"],
                    ["3", "1, 2"],
                  ].map(([outer, inner]) => (
                    <tr key={outer}>
                      <td className="p-4">{outer}</td>
                      <td className="p-4">{inner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 leading-8 text-slate-400">
              Important: In a nested DO loop, each DO loop has its own
              iteration counter represented by sy-index while that loop
              is executing. The inner loop's sy-index takes precedence
              while the inner loop is active.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              4. Print a Number Pattern
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Nested loops are useful for printing patterns. Here,
              the outer loop controls rows and the inner loop controls
              the numbers printed in each row.
            </p>

            <CodeExample
              title="Number pattern"
              description="Print numbers from 1 up to the current row number."
              code={`REPORT Z_NUMBER_PATTERN.

DATA lv_column TYPE i.

DO 5 TIMES.

  DO sy-index TIMES.

    lv_column = sy-index.

    WRITE lv_column.

  ENDDO.

  WRITE: /.

ENDDO.`}
            />

            <p className="mt-4 text-sm font-semibold text-slate-300">
              Expected output
            </p>
            <pre className="mt-3 overflow-x-auto rounded-xl border border-slate-700 bg-[#0b1220] p-5 font-mono text-sm leading-7 text-emerald-300">
{`1
1 2
1 2 3
1 2 3 4
1 2 3 4 5`}
            </pre>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              5. Nested Loops Using WHILE
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Nested loops can also be created using WHILE statements.
              Remember to update both counters so that the loops
              eventually terminate.
            </p>

            <CodeExample
              title="Nested WHILE example"
              description="Print 1 to 3 for each of three outer iterations."
              code={`REPORT Z_NESTED_WHILE.

DATA: lv_outer TYPE i,
      lv_inner TYPE i.

lv_outer = 1.

WHILE lv_outer <= 3.

  lv_inner = 1.

  WHILE lv_inner <= 3.

    WRITE: / lv_outer, lv_inner.

    lv_inner = lv_inner + 1.

  ENDWHILE.

  lv_outer = lv_outer + 1.

ENDWHILE.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              Notice that lv_inner is reset to 1 before the inner loop
              starts. Without this reset, the inner loop would not run
              again for the next outer iteration.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              6. Practical Example – Student and Subjects
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Imagine processing three students. Each student has two
              subjects. We can use nested loops to display the student
              and subject combinations.
            </p>

            <CodeExample
              title="Student subject example"
              description="Display two subjects for each of three students."
              code={`REPORT Z_STUDENT_SUBJECTS.

DATA: lv_student TYPE i,
      lv_subject TYPE i.

DO 3 TIMES.

  lv_student = sy-index.

  WRITE: / 'Student:', lv_student.

  DO 2 TIMES.

    lv_subject = sy-index.

    WRITE: / '  Subject:', lv_subject.

  ENDDO.

ENDDO.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              The outer loop represents students, and the inner loop
              represents subjects belonging to each student.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              7. Important Points to Remember
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["Nested loop", "A loop placed inside another loop."],
                ["Outer loop", "Controls the main repetitions."],
                ["Inner loop", "Completes its iterations for each outer iteration."],
                ["DO loop", "Can be nested inside another DO loop."],
                ["WHILE loop", "Can also be nested inside another WHILE loop."],
                ["Counter reset", "Reset inner WHILE counters when needed."],
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
              href="/courses/abap/lessons/exit-and-continue"
              className="rounded-xl border border-slate-700 px-5 py-3 text-center text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              ← Previous Lesson
            </Link>
            <Link
              href="/courses/abap/lessons/introduction-to-internal-tables"
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
