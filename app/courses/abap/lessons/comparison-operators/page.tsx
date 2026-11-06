import BookmarkButton from "@/components/learning/BookmarkButton";

import Link from "next/link";
import KnowledgeCheck from "./knowledge-check";

const topics = [
  "Equal to (=)",
  "Not equal to (<>)",
  "Greater than (>)",
  "Less than (<)",
  "Greater than or equal to (>=)",
  "Less than or equal to (<=)",
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

export default function ComparisonOperators() {
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
          {/* Lesson heading */}
          <div className="mb-8">
            <p className="text-sm font-medium text-blue-400">
              ABAP FUNDAMENTALS · LESSON 10 OF 24
            </p>

            <h1 className="mt-3 text-4xl font-bold text-white">
              Comparison Operators
            </h1>
            {/* Bookmark Button */}
            <div className="mt-6">
              <BookmarkButton
                lessonSlug="comparison-operators"
                lessonTitle="Comparison Operators"
                courseName="SAP ABAP"
              />
            </div>

            <p className="mt-4 leading-7 text-slate-400">
              Comparison operators are used to compare two values.
              They help ABAP programs make decisions based on conditions.
              In this lesson, we will learn each operator with practical
              examples.
            </p>
          </div>

          {/* Learning objectives */}
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
              1. What are Comparison Operators?
            </h2>

            <p className="leading-7 text-slate-400">
              Comparison operators compare two operands. The result
              determines whether a condition is true or false.
              They are commonly used with IF, ELSEIF and WHILE statements.
            </p>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="border-b border-white/10 bg-[#17243A] px-4 py-3 text-sm font-medium text-blue-300">
                Comparison Operators in ABAP
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-slate-300">
                    <tr>
                      <th className="p-4">Operator</th>
                      <th className="p-4">Meaning</th>
                      <th className="p-4">Example</th>
                      <th className="p-4">Result</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/10 text-slate-400">
                    <tr>
                      <td className="p-4 text-blue-300">=</td>
                      <td className="p-4">Equal to</td>
                      <td className="p-4">10 = 10</td>
                      <td className="p-4 text-green-400">True</td>
                    </tr>

                    <tr>
                      <td className="p-4 text-blue-300">&lt;&gt;</td>
                      <td className="p-4">Not equal to</td>
                      <td className="p-4">10 &lt;&gt; 5</td>
                      <td className="p-4 text-green-400">True</td>
                    </tr>

                    <tr>
                      <td className="p-4 text-blue-300">&gt;</td>
                      <td className="p-4">Greater than</td>
                      <td className="p-4">10 &gt; 5</td>
                      <td className="p-4 text-green-400">True</td>
                    </tr>

                    <tr>
                      <td className="p-4 text-blue-300">&lt;</td>
                      <td className="p-4">Less than</td>
                      <td className="p-4">5 &lt; 10</td>
                      <td className="p-4 text-green-400">True</td>
                    </tr>

                    <tr>
                      <td className="p-4 text-blue-300">&gt;=</td>
                      <td className="p-4">Greater than or equal to</td>
                      <td className="p-4">10 &gt;= 10</td>
                      <td className="p-4 text-green-400">True</td>
                    </tr>

                    <tr>
                      <td className="p-4 text-blue-300">&lt;=</td>
                      <td className="p-4">Less than or equal to</td>
                      <td className="p-4">5 &lt;= 10</td>
                      <td className="p-4 text-green-400">True</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Equal */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              2. Equal To (=)
            </h2>

            <p className="leading-7 text-slate-400">
              The equal operator checks whether two values are equal.
              If both values are the same, the condition is true.
            </p>

            <CodeExample
              code={`REPORT Z_EQUAL_OPERATOR.

DATA: lv_num1 TYPE i,
      lv_num2 TYPE i.

lv_num1 = 100.
lv_num2 = 100.

IF lv_num1 = lv_num2.
  WRITE: / 'Both numbers are equal'.
ELSE.
  WRITE: / 'Numbers are not equal'.
ENDIF.`}
              output={`Both numbers are equal`}
            />
          </section>

          {/* Not equal */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              3. Not Equal To (&lt;&gt;)
            </h2>

            <p className="leading-7 text-slate-400">
              The not equal operator checks whether two values are different.
            </p>

            <CodeExample
              code={`REPORT Z_NOT_EQUAL.

DATA: lv_age1 TYPE i,
      lv_age2 TYPE i.

lv_age1 = 25.
lv_age2 = 30.

IF lv_age1 <> lv_age2.
  WRITE: / 'Both ages are different'.
ELSE.
  WRITE: / 'Both ages are equal'.
ENDIF.`}
              output={`Both ages are different`}
            />
          </section>

          {/* Greater than */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              4. Greater Than (&gt;)
            </h2>

            <p className="leading-7 text-slate-400">
              The greater than operator checks whether the first value
              is larger than the second value.
            </p>

            <CodeExample
              code={`REPORT Z_GREATER_THAN.

DATA: lv_salary1 TYPE i,
      lv_salary2 TYPE i.

lv_salary1 = 50000.
lv_salary2 = 30000.

IF lv_salary1 > lv_salary2.
  WRITE: / 'Salary 1 is greater'.
ELSE.
  WRITE: / 'Salary 1 is not greater'.
ENDIF.`}
              output={`Salary 1 is greater`}
            />
          </section>

          {/* Less than */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              5. Less Than (&lt;)
            </h2>

            <p className="leading-7 text-slate-400">
              The less than operator checks whether the first value
              is smaller than the second value.
            </p>

            <CodeExample
              code={`REPORT Z_LESS_THAN.

DATA: lv_age TYPE i,
      lv_limit TYPE i.

lv_age = 16.
lv_limit = 18.

IF lv_age < lv_limit.
  WRITE: / 'Age is below 18'.
ELSE.
  WRITE: / 'Age is 18 or above'.
ENDIF.`}
              output={`Age is below 18`}
            />
          </section>

          {/* Greater than or equal */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              6. Greater Than or Equal To (&gt;=)
            </h2>

            <p className="leading-7 text-slate-400">
              This operator checks whether the first value is greater
              than or equal to the second value.
            </p>

            <CodeExample
              code={`REPORT Z_GREATER_EQUAL.

DATA: lv_marks TYPE i,
      lv_pass_marks TYPE i.

lv_marks = 40.
lv_pass_marks = 40.

IF lv_marks >= lv_pass_marks.
  WRITE: / 'Student passed'.
ELSE.
  WRITE: / 'Student failed'.
ENDIF.`}
              output={`Student passed`}
            />

            <p className="text-sm text-slate-400">
              Notice that 40 is equal to 40, so the condition is true.
            </p>
          </section>

          {/* Less than or equal */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              7. Less Than or Equal To (&lt;=)
            </h2>

            <p className="leading-7 text-slate-400">
              This operator checks whether the first value is smaller
              than or equal to the second value.
            </p>

            <CodeExample
              code={`REPORT Z_LESS_EQUAL.

DATA: lv_quantity TYPE i,
      lv_limit TYPE i.

lv_quantity = 5.
lv_limit = 10.

IF lv_quantity <= lv_limit.
  WRITE: / 'Quantity is within the limit'.
ELSE.
  WRITE: / 'Quantity exceeds the limit'.
ENDIF.`}
              output={`Quantity is within the limit`}
            />
          </section>

          {/* Practical example */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              8. Practical Example: Student Result
            </h2>

            <p className="leading-7 text-slate-400">
              Let's check whether a student has passed or failed
              based on their marks.
            </p>

            <CodeExample
              code={`REPORT Z_STUDENT_RESULT.

DATA: lv_marks TYPE i.

lv_marks = 75.

IF lv_marks >= 40.
  WRITE: / 'Student Passed'.
ELSE.
  WRITE: / 'Student Failed'.
ENDIF.

WRITE: / 'Marks:', lv_marks.`}
              output={`Student Passed
Marks: 75`}
            />
          </section>

          {/* Key takeaways */}
          <section className="mb-10 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">
              Key Takeaways
            </h2>

            <ul className="space-y-3 text-sm leading-6 text-slate-300">
              <li>✓ = checks whether two values are equal.</li>
              <li>✓ &lt;&gt; checks whether values are different.</li>
              <li>✓ &gt; checks whether a value is greater.</li>
              <li>✓ &lt; checks whether a value is smaller.</li>
              <li>✓ &gt;= checks greater than or equal to.</li>
              <li>✓ &lt;= checks less than or equal to.</li>
              <li>✓ Comparison operators are commonly used in IF conditions.</li>
            </ul>
          </section>

          {/* Quiz */}
          <KnowledgeCheck />

          {/* Navigation */}
          <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6">
            <Link
              href="/courses/abap/lessons/arithmetic-operators"
              className="rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-300 hover:bg-white/5"
            >
              ← Previous Lesson
            </Link>

            <Link
              href="/courses/abap/lessons/logical-operators"
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
