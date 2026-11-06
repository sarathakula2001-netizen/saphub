import BookmarkButton from "@/components/learning/BookmarkButton";

import Link from "next/link";
import KnowledgeCheck from "./knowledge-check";

const topics = [
  "AND operator",
  "OR operator",
  "NOT operator",
  "Combining multiple conditions",
  "Practical examples using IF statements",
];

function CodeExample({
  code,
  output,
}: {
  code: string;
  output: string;
}) {
  return (
    <>
      <div className="overflow-hidden rounded-xl border border-white/10">
        <div className="border-b border-white/10 bg-[#17243A] px-4 py-3 text-sm font-medium text-blue-300">
          ABAP Program
        </div>
        <pre className="overflow-x-auto bg-[#080F1C] p-5 text-sm leading-7 text-slate-300">
          <code>{code}</code>
        </pre>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <h3 className="mb-3 font-semibold text-teal-400">
          Expected output
        </h3>
        <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
          {output}
        </pre>
      </div>
    </>
  );
}

export default function LogicalOperators() {
  return (
    <main className="min-h-screen bg-[#0B1120] text-slate-200">
      <header className="border-b border-white/10 bg-[#101827]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold text-blue-400">
            SAPHub
          </Link>
          <Link
            href="/courses/abap"
            className="text-sm text-slate-400 hover:text-white"
          >
            ABAP Course
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10">
        <article>
          <div className="mb-8">
            <p className="text-sm font-medium text-blue-400">
              ABAP FUNDAMENTALS · LESSON 11 OF 24
            </p>
            <h1 className="mt-3 text-4xl font-bold text-white">
              Logical Operators
            </h1>
            {/* Bookmark Button */}
            <div className="mt-6">
              <BookmarkButton
                lessonSlug="logical-operators"
                lessonTitle="Logical Operators"
                courseName="SAP ABAP"
              />
            </div>
            <p className="mt-4 leading-7 text-slate-400">
              Logical operators help us combine multiple conditions
              and control program decisions. In this lesson, we will
              understand AND, OR and NOT with practical ABAP examples.
            </p>
          </div>

          <section className="mb-8 rounded-2xl border border-white/10 bg-[#111C30] p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">
              What you will learn
            </h2>
            <ul className="space-y-3">
              {topics.map((topic) => (
                <li key={topic} className="flex gap-3 text-slate-300">
                  <span className="text-teal-400">✓</span>
                  {topic}
                </li>
              ))}
            </ul>
          </section>

          {/* Introduction */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              1. What are Logical Operators?
            </h2>
            <p className="leading-7 text-slate-400">
              Logical operators are used to combine or reverse conditions.
              They are commonly used with IF statements when a program
              needs to evaluate more than one condition.
            </p>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="border-b border-white/10 bg-[#17243A] px-4 py-3 text-sm font-medium text-blue-300">
                Logical Operators
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-slate-300">
                    <tr>
                      <th className="p-4">Operator</th>
                      <th className="p-4">Meaning</th>
                      <th className="p-4">Condition</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-slate-400">
                    <tr>
                      <td className="p-4 text-blue-300">AND</td>
                      <td className="p-4">Both conditions must be true</td>
                      <td className="p-4">A AND B</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-blue-300">OR</td>
                      <td className="p-4">At least one must be true</td>
                      <td className="p-4">A OR B</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-blue-300">NOT</td>
                      <td className="p-4">Reverses the condition</td>
                      <td className="p-4">NOT A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* AND */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              2. AND Operator
            </h2>
            <p className="leading-7 text-slate-400">
              AND is used when all specified conditions must be true.
              If even one condition is false, the complete condition is false.
            </p>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="mb-3 font-semibold text-teal-400">
                Example
              </h3>
              <p className="text-sm text-slate-300">
                A student must score at least 40 in both subjects to pass.
              </p>
              <p className="mt-3 text-sm text-slate-400">
                Maths = 75 (Pass)
              </p>
              <p className="text-sm text-slate-400">
                Science = 65 (Pass)
              </p>
              <p className="mt-3 text-sm font-semibold text-green-400">
                Both conditions are true, so the student passes.
              </p>
            </div>

            <CodeExample
              code={`REPORT Z_AND_OPERATOR.

DATA: lv_maths TYPE i,
      lv_science TYPE i.

lv_maths = 75.
lv_science = 65.

IF lv_maths >= 40 AND lv_science >= 40.
  WRITE: / 'Student Passed Both Subjects'.
ELSE.
  WRITE: / 'Student Failed'.
ENDIF.`}
              output={`Student Passed Both Subjects`}
            />
          </section>

          {/* OR */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              3. OR Operator
            </h2>
            <p className="leading-7 text-slate-400">
              OR is used when at least one condition must be true.
              The complete condition is false only when both conditions
              are false.
            </p>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="mb-3 font-semibold text-teal-400">
                Example
              </h3>
              <p className="text-sm text-slate-300">
                A student can qualify if they score at least 90 in
                either Maths or Science.
              </p>
            </div>

            <CodeExample
              code={`REPORT Z_OR_OPERATOR.

DATA: lv_maths TYPE i,
      lv_science TYPE i.

lv_maths = 95.
lv_science = 50.

IF lv_maths >= 90 OR lv_science >= 90.
  WRITE: / 'Student Qualified'.
ELSE.
  WRITE: / 'Student Not Qualified'.
ENDIF.`}
              output={`Student Qualified`}
            />
          </section>

          {/* NOT */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              4. NOT Operator
            </h2>
            <p className="leading-7 text-slate-400">
              NOT reverses a condition. If the original condition is
              true, NOT makes it false. If it is false, NOT makes it true.
            </p>

            <CodeExample
              code={`REPORT Z_NOT_OPERATOR.

DATA: lv_age TYPE i.

lv_age = 16.

IF NOT lv_age >= 18.
  WRITE: / 'Person is below 18'.
ELSE.
  WRITE: / 'Person is 18 or above'.
ENDIF.`}
              output={`Person is below 18`}
            />

            <p className="text-sm leading-6 text-slate-400">
              Here, lv_age is not greater than or equal to 18.
              Therefore, the NOT condition evaluates to true.
            </p>
          </section>

          {/* Combined conditions */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              5. Combining Multiple Conditions
            </h2>
            <p className="leading-7 text-slate-400">
              We can combine AND and OR to create more detailed
              business rules. Use parentheses to make the intended
              grouping clear.
            </p>

            <CodeExample
              code={`REPORT Z_COMBINED_CONDITIONS.

DATA: lv_age TYPE i,
      lv_experience TYPE i.

lv_age = 25.
lv_experience = 3.

IF lv_age >= 21 AND lv_experience >= 2.
  WRITE: / 'Eligible for the position'.
ELSE.
  WRITE: / 'Not eligible for the position'.
ENDIF.`}
              output={`Eligible for the position`}
            />
          </section>

          {/* Practical example */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              6. Practical Example: Employee Bonus Eligibility
            </h2>
            <p className="leading-7 text-slate-400">
              An employee receives a bonus if their performance rating
              is at least 4 and their experience is at least 2 years.
            </p>

            <CodeExample
              code={`REPORT Z_EMPLOYEE_BONUS.

DATA: lv_rating TYPE i,
      lv_experience TYPE i.

lv_rating = 5.
lv_experience = 3.

IF lv_rating >= 4 AND lv_experience >= 2.
  WRITE: / 'Employee is eligible for bonus'.
ELSE.
  WRITE: / 'Employee is not eligible for bonus'.
ENDIF.`}
              output={`Employee is eligible for bonus`}
            />
          </section>

          {/* Truth table */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              7. Logical Operators Truth Table
            </h2>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-slate-300">
                    <tr>
                      <th className="p-4">A</th>
                      <th className="p-4">B</th>
                      <th className="p-4">A AND B</th>
                      <th className="p-4">A OR B</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-slate-400">
                    <tr>
                      <td className="p-4">True</td>
                      <td className="p-4">True</td>
                      <td className="p-4 text-green-400">True</td>
                      <td className="p-4 text-green-400">True</td>
                    </tr>
                    <tr>
                      <td className="p-4">True</td>
                      <td className="p-4">False</td>
                      <td className="p-4 text-red-400">False</td>
                      <td className="p-4 text-green-400">True</td>
                    </tr>
                    <tr>
                      <td className="p-4">False</td>
                      <td className="p-4">True</td>
                      <td className="p-4 text-red-400">False</td>
                      <td className="p-4 text-green-400">True</td>
                    </tr>
                    <tr>
                      <td className="p-4">False</td>
                      <td className="p-4">False</td>
                      <td className="p-4 text-red-400">False</td>
                      <td className="p-4 text-red-400">False</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Key takeaways */}
          <section className="mb-10 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">
              Key Takeaways
            </h2>
            <ul className="space-y-3 text-sm leading-6 text-slate-300">
              <li>✓ AND requires all conditions to be true.</li>
              <li>✓ OR requires at least one condition to be true.</li>
              <li>✓ NOT reverses a condition.</li>
              <li>✓ Logical operators can combine comparison conditions.</li>
              <li>✓ Parentheses help make complex conditions clear.</li>
            </ul>
          </section>

          <KnowledgeCheck />

          {/* Navigation */}
          <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6">
            <Link
              href="/courses/abap/lessons/comparison-operators"
              className="rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-300 hover:bg-white/5"
            >
              ← Previous Lesson
            </Link>

            <Link
              href="/courses/abap/lessons/working-with-expressions"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Next Lesson →
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
