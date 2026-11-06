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

export default function ExitContinueLesson() {
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
              LESSON 19 · LOOPS AND ITERATIONS
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">
              EXIT and CONTINUE in SAP ABAP
            </h1>
            {/* Bookmark Button */}
            <div className="mt-6">
              <BookmarkButton
                lessonSlug="exit-and-continue"
                lessonTitle="EXIT and CONTINUE in SAP ABAP"
                courseName="SAP ABAP"
              />
            </div>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              Learn how to control loop execution by stopping a loop or
              skipping its current iteration.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              1. What is EXIT?
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              EXIT is a control statement in ABAP. When used inside a loop,
              it immediately terminates the current loop and continues
              execution after the loop.
            </p>

            <CodeExample
              title="Basic EXIT example"
              description="Stop the loop when the counter reaches 5."
              code={`REPORT Z_EXIT_EXAMPLE.

DATA lv_number TYPE i.

DO 10 TIMES.

  IF sy-index = 5.
    EXIT.
  ENDIF.

  WRITE: / sy-index.

ENDDO.

WRITE: / 'Loop stopped'.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              The output contains 1, 2, 3 and 4. When sy-index reaches 5,
              EXIT terminates the loop.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              2. EXIT with a WHILE Loop
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              EXIT also works with WHILE loops. It is useful when you want
              to stop a loop before its normal condition becomes false.
            </p>

            <CodeExample
              title="EXIT in WHILE"
              description="Stop when the number becomes 6."
              code={`REPORT Z_EXIT_WHILE.

DATA lv_number TYPE i.

lv_number = 1.

WHILE lv_number <= 10.

  IF lv_number = 6.
    EXIT.
  ENDIF.

  WRITE: / lv_number.

  lv_number = lv_number + 1.

ENDWHILE.

WRITE: / 'Process completed'.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              The program displays numbers 1 to 5 and then exits the loop
              when the number reaches 6.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              3. What is CONTINUE?
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              CONTINUE skips the remaining statements in the current loop
              pass and moves to the next iteration. The loop itself does
              not terminate.
            </p>

            <CodeExample
              title="Basic CONTINUE example"
              description="Skip the iteration when the number is 5."
              code={`REPORT Z_CONTINUE_EXAMPLE.

DO 10 TIMES.

  IF sy-index = 5.
    CONTINUE.
  ENDIF.

  WRITE: / sy-index.

ENDDO.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              The output displays 1, 2, 3, 4, 6, 7, 8, 9 and 10.
              Only the iteration for 5 is skipped.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              4. Print Only Odd Numbers
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              We can combine CONTINUE with the MOD operator to skip
              even numbers.
            </p>

            <CodeExample
              title="Odd number program"
              description="Skip numbers divisible by 2."
              code={`REPORT Z_ODD_NUMBERS.

DO 10 TIMES.

  IF sy-index MOD 2 = 0.
    CONTINUE.
  ENDIF.

  WRITE: / sy-index.

ENDDO.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              MOD returns the remainder. Even numbers have a remainder
              of zero when divided by 2, so CONTINUE skips them.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              5. Skip Numbers Greater Than 5
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              CONTINUE can also be used with a WHILE loop to skip values
              without stopping the entire loop.
            </p>

            <CodeExample
              title="Using CONTINUE with WHILE"
              description="Skip numbers that are greater than 5."
              code={`REPORT Z_SKIP_NUMBERS.

DATA lv_number TYPE i.

lv_number = 1.

WHILE lv_number <= 10.

  IF lv_number > 5.
    lv_number = lv_number + 1.
    CONTINUE.
  ENDIF.

  WRITE: / lv_number.

  lv_number = lv_number + 1.

ENDWHILE.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              Numbers 1 to 5 are displayed. Numbers 6 to 10 are skipped,
              but the loop continues until its condition becomes false.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              6. Difference Between EXIT and CONTINUE
            </h2>

            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-700">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="bg-slate-800 text-slate-200">
                  <tr>
                    <th className="p-4">EXIT</th>
                    <th className="p-4">CONTINUE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-400">
                  <tr>
                    <td className="p-4">Terminates the current loop.</td>
                    <td className="p-4">Skips the current iteration.</td>
                  </tr>
                  <tr>
                    <td className="p-4">Control moves after the loop.</td>
                    <td className="p-4">Control moves to the next iteration.</td>
                  </tr>
                  <tr>
                    <td className="p-4">No more iterations are executed.</td>
                    <td className="p-4">Remaining iterations can execute.</td>
                  </tr>
                  <tr>
                    <td className="p-4">Useful for stopping early.</td>
                    <td className="p-4">Useful for skipping selected values.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-5">
                <p className="font-bold text-red-300">EXIT</p>
                <p className="mt-2 text-sm text-slate-300">
                  Stop the entire current loop.
                </p>
              </div>
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-5">
                <p className="font-bold text-blue-300">CONTINUE</p>
                <p className="mt-2 text-sm text-slate-300">
                  Skip only the current iteration.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              7. Practical Example – Find a Number
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Imagine checking numbers from 1 to 10. When the target
              number is found, stop the loop using EXIT.
            </p>

            <CodeExample
              title="Find the target number"
              description="Stop searching when the target is found."
              code={`REPORT Z_FIND_NUMBER.

DATA: lv_number TYPE i,
      lv_target TYPE i.

lv_target = 7.

DO 10 TIMES.

  lv_number = sy-index.

  IF lv_number = lv_target.
    WRITE: / 'Number Found:', lv_number.
    EXIT.
  ENDIF.

ENDDO.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              When the number 7 is found, EXIT stops the loop immediately.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              8. Important Points to Remember
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["EXIT", "Terminates the current loop."],
                ["CONTINUE", "Skips the current iteration."],
                ["DO", "Can be controlled using EXIT and CONTINUE."],
                ["WHILE", "Can also use EXIT and CONTINUE."],
                ["MOD", "Useful for identifying even and odd numbers."],
                ["Counter updates", "Make sure WHILE loops can eventually finish."],
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
              href="/courses/abap/lessons/while-loops"
              className="rounded-xl border border-slate-700 px-5 py-3 text-center text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              ← Previous Lesson
            </Link>
            <Link
              href="/courses/abap/lessons/nested-loops"
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
