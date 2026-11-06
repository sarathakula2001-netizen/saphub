import BookmarkButton from "@/components/learning/BookmarkButton";

import Link from "next/link";
import KnowledgeCheck from "./knowledge-check";

const topics = [
  "Addition (+)",
  "Subtraction (-)",
  "Multiplication (*)",
  "Division (/)",
  "Remainder (MOD)",
  "Practical arithmetic programs",
];

export default function ArithmeticOperators() {
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
              ABAP FUNDAMENTALS · LESSON 9 OF 24
            </p>
            <h1 className="mt-3 text-4xl font-bold text-white">
              Arithmetic Operators
            </h1>
            {/* Bookmark Button */}
            <div className="mt-6">
              <BookmarkButton
                lessonSlug="arithmetic-operators"
                lessonTitle="Arithmetic Operators"
                courseName="SAP ABAP"
              />
            </div>
            <p className="mt-4 leading-7 text-slate-400">
              Arithmetic operators help us perform mathematical calculations
              in ABAP programs. In this lesson, we will learn how to use
              these operators with practical examples.
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
              1. What are Arithmetic Operators?
            </h2>
            <p className="leading-7 text-slate-400">
              Arithmetic operators are symbols or keywords used to perform
              mathematical calculations such as addition, subtraction,
              multiplication and division.
            </p>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="border-b border-white/10 bg-[#17243A] px-4 py-3 text-sm font-medium text-blue-300">
                Arithmetic Operators in ABAP
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-slate-300">
                    <tr>
                      <th className="p-4">Operator</th>
                      <th className="p-4">Operation</th>
                      <th className="p-4">Example</th>
                      <th className="p-4">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-slate-400">
                    <tr>
                      <td className="p-4 text-blue-300">+</td>
                      <td className="p-4">Addition</td>
                      <td className="p-4">10 + 5</td>
                      <td className="p-4">15</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-blue-300">-</td>
                      <td className="p-4">Subtraction</td>
                      <td className="p-4">10 - 5</td>
                      <td className="p-4">5</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-blue-300">*</td>
                      <td className="p-4">Multiplication</td>
                      <td className="p-4">10 * 5</td>
                      <td className="p-4">50</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-blue-300">/</td>
                      <td className="p-4">Division</td>
                      <td className="p-4">10 / 5</td>
                      <td className="p-4">2</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-blue-300">MOD</td>
                      <td className="p-4">Remainder</td>
                      <td className="p-4">10 MOD 3</td>
                      <td className="p-4">1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Addition */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              2. Addition (+)
            </h2>
            <p className="leading-7 text-slate-400">
              The addition operator adds two or more numeric values.
            </p>

            <CodeExample
              code={`REPORT Z_ADDITION.

DATA: lv_num1 TYPE i,
      lv_num2 TYPE i,
      lv_result TYPE i.

lv_num1 = 100.
lv_num2 = 50.

lv_result = lv_num1 + lv_num2.

WRITE: / 'First Number :', lv_num1.
WRITE: / 'Second Number:', lv_num2.
WRITE: / 'Addition     :', lv_result.`}
              output={`First Number : 100
Second Number: 50
Addition     : 150`}
            />

            <p className="text-sm text-slate-400">
              Explanation: The + operator adds lv_num1 and lv_num2.
              The result is stored in lv_result.
            </p>
          </section>

          {/* Subtraction */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              3. Subtraction (-)
            </h2>
            <p className="leading-7 text-slate-400">
              The subtraction operator subtracts one numeric value from another.
            </p>

            <CodeExample
              code={`REPORT Z_SUBTRACTION.

DATA: lv_num1 TYPE i,
      lv_num2 TYPE i,
      lv_result TYPE i.

lv_num1 = 100.
lv_num2 = 40.

lv_result = lv_num1 - lv_num2.

WRITE: / 'First Number :', lv_num1.
WRITE: / 'Second Number:', lv_num2.
WRITE: / 'Subtraction  :', lv_result.`}
              output={`First Number : 100
Second Number: 40
Subtraction  : 60`}
            />
          </section>

          {/* Multiplication */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              4. Multiplication (*)
            </h2>
            <p className="leading-7 text-slate-400">
              The multiplication operator multiplies two numeric values.
            </p>

            <CodeExample
              code={`REPORT Z_MULTIPLICATION.

DATA: lv_price TYPE i,
      lv_quantity TYPE i,
      lv_total TYPE i.

lv_price = 500.
lv_quantity = 4.

lv_total = lv_price * lv_quantity.

WRITE: / 'Price    :', lv_price.
WRITE: / 'Quantity :', lv_quantity.
WRITE: / 'Total    :', lv_total.`}
              output={`Price    : 500
Quantity : 4
Total    : 2000`}
            />

            <p className="text-sm text-slate-400">
              Practical example: If one product costs 500 and you buy
              4 products, the total cost is 2000.
            </p>
          </section>

          {/* Division */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              5. Division (/)
            </h2>
            <p className="leading-7 text-slate-400">
              The division operator divides one numeric value by another.
            </p>

            <CodeExample
              code={`REPORT Z_DIVISION.

DATA: lv_num1 TYPE p LENGTH 8 DECIMALS 2,
      lv_num2 TYPE p LENGTH 8 DECIMALS 2,
      lv_result TYPE p LENGTH 8 DECIMALS 2.

lv_num1 = 100.
lv_num2 = 4.

IF lv_num2 <> 0.
  lv_result = lv_num1 / lv_num2.
  WRITE: / 'Division Result:', lv_result.
ELSE.
  WRITE: / 'Cannot divide by zero'.
ENDIF.`}
              output={`Division Result: 25.00`}
            />

            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="font-semibold text-amber-300">
                Important: Division by zero
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Always check that the divisor is not zero before performing
                division. Dividing by zero can cause a runtime error.
              </p>
            </div>
          </section>

          {/* MOD */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              6. MOD – Remainder Operator
            </h2>
            <p className="leading-7 text-slate-400">
              MOD returns the remainder after dividing one integer by another.
            </p>

            <CodeExample
              code={`REPORT Z_MOD_OPERATOR.

DATA: lv_num1 TYPE i,
      lv_num2 TYPE i,
      lv_result TYPE i.

lv_num1 = 10.
lv_num2 = 3.

lv_result = lv_num1 MOD lv_num2.

WRITE: / 'Number 1 :', lv_num1.
WRITE: / 'Number 2 :', lv_num2.
WRITE: / 'Remainder:', lv_result.`}
              output={`Number 1 : 10
Number 2 : 3
Remainder: 1`}
            />

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-semibold text-teal-400">
                Understand MOD
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                10 divided by 3 gives a quotient of 3 and a remainder of 1.
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Therefore: 10 MOD 3 = 1
              </p>
            </div>
          </section>

          {/* Practical program */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              7. Practical Program: Employee Salary Calculation
            </h2>
            <p className="leading-7 text-slate-400">
              Let's combine addition, subtraction, multiplication and
              division in one program.
            </p>

            <CodeExample
              code={`REPORT Z_EMPLOYEE_CALCULATION.

DATA: lv_basic TYPE p LENGTH 8 DECIMALS 2,
      lv_bonus TYPE p LENGTH 8 DECIMALS 2,
      lv_deduction TYPE p LENGTH 8 DECIMALS 2,
      lv_total TYPE p LENGTH 8 DECIMALS 2.

lv_basic = 30000.
lv_bonus = 5000.
lv_deduction = 2000.

lv_total = lv_basic + lv_bonus - lv_deduction.

WRITE: / 'EMPLOYEE SALARY DETAILS'.
WRITE: / 'Basic Salary :', lv_basic.
WRITE: / 'Bonus        :', lv_bonus.
WRITE: / 'Deduction    :', lv_deduction.
WRITE: / 'Final Salary :', lv_total.`}
              output={`EMPLOYEE SALARY DETAILS
Basic Salary : 30000.00
Bonus        : 5000.00
Deduction    : 2000.00
Final Salary : 33000.00`}
            />
          </section>

          {/* Key takeaways */}
          <section className="mb-10 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">
              Key Takeaways
            </h2>
            <ul className="space-y-3 text-sm leading-6 text-slate-300">
              <li>✓ + performs addition.</li>
              <li>✓ - performs subtraction.</li>
              <li>✓ * performs multiplication.</li>
              <li>✓ / performs division.</li>
              <li>✓ MOD returns the remainder.</li>
              <li>✓ Check for zero before division.</li>
            </ul>
          </section>

          {/* Quiz */}
          <KnowledgeCheck />

          {/* Navigation */}
          <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6">
            <Link
              href="/courses/abap/lessons/practical-coding-examples"
              className="rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-300 hover:bg-white/5"
            >
              ← Previous Lesson
            </Link>

            <Link
              href="/courses/abap/lessons/comparison-operators"
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
