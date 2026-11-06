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

export default function WhileLoopsLesson() {
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
              LESSON 18 · LOOPS AND ITERATIONS
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">
              WHILE Loops in SAP ABAP
            </h1>
            {/* Bookmark Button */}
            <div className="mt-6">
              <BookmarkButton
                lessonSlug="while-loops"
                lessonTitle="WHILE Loops in SAP ABAP"
                courseName="SAP ABAP"
              />
            </div>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              Learn how to execute statements repeatedly as long as a
              condition remains true.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              1. What is a WHILE Loop?
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              A WHILE loop repeatedly executes a block of statements as long
              as its specified condition is true.
            </p>
            <p className="mt-3 leading-8 text-slate-400">
              Unlike a DO loop with a fixed number of repetitions, a WHILE
              loop depends on a condition. When the condition becomes false,
              the loop ends.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              2. WHILE Loop Syntax
            </h2>

            <CodeExample
              title="Basic WHILE syntax"
              description="General structure of a WHILE loop."
              code={`WHILE condition.

  " Statements to execute

ENDWHILE.`}
            />

            <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-5">
              <p className="font-semibold text-blue-300">Explanation</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                <li><strong>WHILE</strong> – Starts the loop and checks the condition.</li>
                <li><strong>Condition</strong> – Determines whether the loop continues.</li>
                <li><strong>Statements</strong> – Execute while the condition is true.</li>
                <li><strong>ENDWHILE</strong> – Ends the loop block.</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              3. Print Numbers from 1 to 10
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Let's use a counter variable to print numbers from 1 to 10.
            </p>

            <CodeExample
              title="Number printing program"
              description="Increment a counter until it reaches 10."
              code={`REPORT Z_WHILE_NUMBERS.

DATA lv_number TYPE i.

lv_number = 1.

WHILE lv_number <= 10.

  WRITE: / lv_number.

  lv_number = lv_number + 1.

ENDWHILE.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              The counter starts at 1. After each iteration, it increases
              by 1. When it becomes 11, the condition is false and the loop
              stops.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              4. Understanding the Counter
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              A counter variable controls how many times a WHILE loop
              executes. You must update the counter when necessary to
              ensure the loop eventually finishes.
            </p>

            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-700">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-800 text-slate-200">
                  <tr>
                    <th className="p-4">Iteration</th>
                    <th className="p-4">Counter</th>
                    <th className="p-4">Condition (counter &lt;= 3)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-400">
                  {[
                    ["1", "1", "TRUE"],
                    ["2", "2", "TRUE"],
                    ["3", "3", "TRUE"],
                    ["4", "4", "FALSE"],
                  ].map((item) => (
                    <tr key={item[0]}>
                      <td className="p-4">{item[0]}</td>
                      <td className="p-4 text-blue-400">{item[1]}</td>
                      <td className="p-4">{item[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              5. Multiplication Table Using WHILE
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              We can combine a WHILE loop with arithmetic operators to
              generate a multiplication table.
            </p>

            <CodeExample
              title="Multiplication table of 5"
              description="Calculate and display the first ten multiples of 5."
              code={`REPORT Z_WHILE_TABLE.

DATA: lv_counter TYPE i,
      lv_result TYPE i.

lv_counter = 1.

WHILE lv_counter <= 10.

  lv_result = 5 * lv_counter.

  WRITE: / '5 x', lv_counter, '=', lv_result.

  lv_counter = lv_counter + 1.

ENDWHILE.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              The loop calculates 5 multiplied by the counter and increases
              the counter after every iteration.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              6. Sum of Numbers Using WHILE
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Let's calculate the sum of numbers from 1 to 10.
            </p>

            <CodeExample
              title="Sum calculation"
              description="Add the counter to the total during each iteration."
              code={`REPORT Z_WHILE_SUM.

DATA: lv_counter TYPE i,
      lv_sum TYPE i.

lv_counter = 1.
lv_sum = 0.

WHILE lv_counter <= 10.

  lv_sum = lv_sum + lv_counter.

  lv_counter = lv_counter + 1.

ENDWHILE.

WRITE: / 'Total Sum:', lv_sum.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              The final output is 55 because the program adds all numbers
              from 1 to 10.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              7. Countdown Program
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              A WHILE loop can also count backwards. In this example, the
              counter decreases by 1 after each iteration.
            </p>

            <CodeExample
              title="Countdown"
              description="Print numbers from 10 down to 1."
              code={`REPORT Z_WHILE_COUNTDOWN.

DATA lv_counter TYPE i.

lv_counter = 10.

WHILE lv_counter >= 1.

  WRITE: / lv_counter.

  lv_counter = lv_counter - 1.

ENDWHILE.

WRITE: / 'Countdown completed'.`}
            />

          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              8. Difference Between DO and WHILE
            </h2>

            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-700">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="bg-slate-800 text-slate-200">
                  <tr>
                    <th className="p-4">DO Loop</th>
                    <th className="p-4">WHILE Loop</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-400">
                  <tr>
                    <td className="p-4">Can use a fixed repetition count.</td>
                    <td className="p-4">Repeats while a condition is true.</td>
                  </tr>
                  <tr>
                    <td className="p-4">Uses DO and ENDDO.</td>
                    <td className="p-4">Uses WHILE and ENDWHILE.</td>
                  </tr>
                  <tr>
                    <td className="p-4">DO without a count can continue until stopped.</td>
                    <td className="p-4">Condition is checked before each iteration.</td>
                  </tr>
                  <tr>
                    <td className="p-4">sy-index gives the iteration number.</td>
                    <td className="p-4">A counter variable is commonly used.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              9. Common Mistake – Infinite Loop
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              If you forget to update the counter, the condition may remain
              true forever. This is called an infinite loop.
            </p>

            <CodeExample
              title="Incorrect example"
              description="The counter never changes, so the condition stays true."
              code={`DATA lv_number TYPE i.

lv_number = 1.

WHILE lv_number <= 5.

  WRITE: / lv_number.

  " Missing counter update!

ENDWHILE.`}
            />

            <CodeExample
              title="Correct example"
              description="Update the counter to allow the loop to finish."
              code={`DATA lv_number TYPE i.

lv_number = 1.

WHILE lv_number <= 5.

  WRITE: / lv_number.

  lv_number = lv_number + 1.

ENDWHILE.`}
            />

            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-5">
              <p className="font-semibold text-red-300">Important warning</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Never run an infinite loop intentionally in a shared or
                production SAP system. Always make sure your loop has a
                reliable termination condition.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              10. Important Points to Remember
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["WHILE", "Starts a condition-based loop."],
                ["ENDWHILE", "Closes the WHILE loop."],
                ["Condition", "Checked before every iteration."],
                ["Counter", "Controls loop progression."],
                ["Increment", "Increases the counter."],
                ["Infinite loop", "Can occur when the condition never becomes false."],
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
              href="/courses/abap/lessons/do-loops"
              className="rounded-xl border border-slate-700 px-5 py-3 text-center text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              ← Previous Lesson
            </Link>
            <Link
              href="/courses/abap/lessons/exit-and-continue"
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
