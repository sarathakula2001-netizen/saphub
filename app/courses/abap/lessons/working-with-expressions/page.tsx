import BookmarkButton from "@/components/learning/BookmarkButton";

import Link from "next/link";
import KnowledgeCheck from "./knowledge-check";

const topics = [
  "Understanding expressions",
  "Arithmetic expressions",
  "Comparison expressions",
  "Logical expressions",
  "Operator precedence",
  "Combining multiple expressions",
  "Practical ABAP programs",
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

export default function WorkingWithExpressions() {
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
          {/* Heading */}
          <div className="mb-8">
            <p className="text-sm font-medium text-blue-400">
              ABAP FUNDAMENTALS · LESSON 12 OF 24
            </p>
            <h1 className="mt-3 text-4xl font-bold text-white">
              Working with Expressions
            </h1>
            {/* Bookmark Button */}
            <div className="mt-6">
              <BookmarkButton
                lessonSlug="working-with-expressions"
                lessonTitle="Working with Expressions"
                courseName="SAP ABAP"
              />
            </div>
            <p className="mt-4 leading-7 text-slate-400">
              Expressions allow us to combine values, variables and
              operators to calculate results and evaluate conditions.
              Let's understand how expressions work in ABAP.
            </p>
          </div>

          {/* Objectives */}
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
              1. What is an Expression?
            </h2>
            <p className="leading-7 text-slate-400">
              An expression is a combination of operands and operators
              that produces a result.
            </p>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-semibold text-teal-400">
                Simple example
              </h3>
              <p className="mt-3 text-lg text-white">
                10 + 20 = 30
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Here, 10 and 20 are operands, + is the operator,
                and 30 is the result.
              </p>
            </div>
          </section>

          {/* Arithmetic expressions */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              2. Arithmetic Expressions
            </h2>
            <p className="leading-7 text-slate-400">
              Arithmetic expressions perform mathematical calculations
              using operators such as +, -, * and /.
            </p>

            <CodeExample
              code={`REPORT Z_ARITHMETIC_EXPRESSION.

DATA: lv_a TYPE i,
      lv_b TYPE i,
      lv_result TYPE i.

lv_a = 20.
lv_b = 10.

lv_result = lv_a + lv_b * 2.

WRITE: / 'Result:', lv_result.`}
              output={`Result: 40`}
            />

            <p className="text-sm leading-6 text-slate-400">
              Multiplication is performed before addition, so the
              calculation is 20 + (10 * 2) = 40.
            </p>
          </section>

          {/* Comparison expressions */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              3. Comparison Expressions
            </h2>
            <p className="leading-7 text-slate-400">
              Comparison expressions compare two values and are commonly
              used inside IF statements.
            </p>

            <CodeExample
              code={`REPORT Z_COMPARISON_EXPRESSION.

DATA: lv_age TYPE i.

lv_age = 25.

IF lv_age >= 18.
  WRITE: / 'Eligible to vote'.
ELSE.
  WRITE: / 'Not eligible to vote'.
ENDIF.`}
              output={`Eligible to vote`}
            />
          </section>

          {/* Logical expressions */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              4. Logical Expressions
            </h2>
            <p className="leading-7 text-slate-400">
              Logical expressions combine multiple conditions using
              AND, OR and NOT.
            </p>

            <CodeExample
              code={`REPORT Z_LOGICAL_EXPRESSION.

DATA: lv_age TYPE i,
      lv_experience TYPE i.

lv_age = 25.
lv_experience = 3.

IF lv_age >= 21 AND lv_experience >= 2.
  WRITE: / 'Eligible for the position'.
ELSE.
  WRITE: / 'Not eligible'.
ENDIF.`}
              output={`Eligible for the position`}
            />
          </section>

          {/* Operator precedence */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              5. Operator Precedence
            </h2>
            <p className="leading-7 text-slate-400">
              Operator precedence determines which operation is
              performed first when an expression contains multiple
              operators.
            </p>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-slate-300">
                    <tr>
                      <th className="p-4">Priority</th>
                      <th className="p-4">Operator</th>
                      <th className="p-4">Operation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-slate-400">
                    <tr>
                      <td className="p-4">1</td>
                      <td className="p-4 text-blue-300">()</td>
                      <td className="p-4">Parentheses</td>
                    </tr>
                    <tr>
                      <td className="p-4">2</td>
                      <td className="p-4 text-blue-300">* /</td>
                      <td className="p-4">Multiplication and division</td>
                    </tr>
                    <tr>
                      <td className="p-4">3</td>
                      <td className="p-4 text-blue-300">+ -</td>
                      <td className="p-4">Addition and subtraction</td>
                    </tr>
                    <tr>
                      <td className="p-4">4</td>
                      <td className="p-4 text-blue-300">Comparison</td>
                      <td className="p-4">Compare values</td>
                    </tr>
                    <tr>
                      <td className="p-4">5</td>
                      <td className="p-4 text-blue-300">NOT</td>
                      <td className="p-4">Logical NOT</td>
                    </tr>
                    <tr>
                      <td className="p-4">6</td>
                      <td className="p-4 text-blue-300">AND</td>
                      <td className="p-4">Logical AND</td>
                    </tr>
                    <tr>
                      <td className="p-4">7</td>
                      <td className="p-4 text-blue-300">OR</td>
                      <td className="p-4">Logical OR</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <CodeExample
              code={`REPORT Z_OPERATOR_PRECEDENCE.

DATA: lv_result TYPE i.

lv_result = 10 + 5 * 2.

WRITE: / 'Without Parentheses:', lv_result.

lv_result = ( 10 + 5 ) * 2.

WRITE: / 'With Parentheses:', lv_result.`}
              output={`Without Parentheses: 20
With Parentheses: 30`}
            />

            <p className="text-sm leading-6 text-slate-400">
              Parentheses help control the calculation order.
              In the first expression, multiplication happens first.
              In the second, the addition inside parentheses happens first.
            </p>
          </section>

          {/* Combining expressions */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              6. Combining Multiple Expressions
            </h2>
            <p className="leading-7 text-slate-400">
              We can combine arithmetic calculations and logical
              conditions in the same program.
            </p>

            <CodeExample
              code={`REPORT Z_COMBINED_EXPRESSION.

DATA: lv_basic TYPE i,
      lv_bonus TYPE i,
      lv_total TYPE i.

lv_basic = 30000.
lv_bonus = 5000.

lv_total = lv_basic + lv_bonus.

IF lv_total >= 35000.
  WRITE: / 'Salary requirement satisfied'.
ELSE.
  WRITE: / 'Salary requirement not satisfied'.
ENDIF.

WRITE: / 'Total Salary:', lv_total.`}
              output={`Salary requirement satisfied
Total Salary: 35000`}
            />
          </section>

          {/* Practical program */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              7. Practical Program: Student Result
            </h2>
            <p className="leading-7 text-slate-400">
              Let's calculate the total marks and percentage, then
              check whether the student has passed.
            </p>

            <CodeExample
              code={`REPORT Z_STUDENT_EXPRESSION.

DATA: lv_maths TYPE i,
      lv_science TYPE i,
      lv_total TYPE i,
      lv_percentage TYPE p LENGTH 5 DECIMALS 2.

lv_maths = 80.
lv_science = 70.

lv_total = lv_maths + lv_science.
lv_percentage = lv_total / 2.

WRITE: / 'Maths Marks:', lv_maths.
WRITE: / 'Science Marks:', lv_science.
WRITE: / 'Total Marks:', lv_total.
WRITE: / 'Percentage:', lv_percentage.

IF lv_maths >= 40 AND lv_science >= 40.
  WRITE: / 'Result: PASS'.
ELSE.
  WRITE: / 'Result: FAIL'.
ENDIF.`}
              output={`Maths Marks: 80
Science Marks: 70
Total Marks: 150
Percentage: 75.00
Result: PASS`}
            />

            <p className="text-sm leading-6 text-slate-400">
              This program combines arithmetic expressions,
              comparison expressions and logical expressions.
            </p>
          </section>

          {/* Key takeaways */}
          <section className="mb-10 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">
              Key Takeaways
            </h2>
            <ul className="space-y-3 text-sm leading-6 text-slate-300">
              <li>✓ Expressions combine operands and operators.</li>
              <li>✓ Arithmetic expressions calculate values.</li>
              <li>✓ Comparison expressions compare values.</li>
              <li>✓ Logical expressions combine conditions.</li>
              <li>✓ Operator precedence controls evaluation order.</li>
              <li>✓ Parentheses help make calculations clear.</li>
            </ul>
          </section>

          <KnowledgeCheck />

          {/* Navigation */}
          <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6">
            <Link
              href="/courses/abap/lessons/logical-operators"
              className="rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-300 hover:bg-white/5"
            >
              ← Previous Lesson
            </Link>

            <Link
              href="/courses/abap/lessons/if-and-else"
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
