import BookmarkButton from "@/components/learning/BookmarkButton";

import Link from "next/link";
import KnowledgeCheck from "./knowledge-check";

export default function ConstantsAndLiteralsLesson() {
  return (
    <main className="min-h-screen bg-[#0b1120] text-slate-200">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0b1120]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-2xl font-bold tracking-tight text-white">
            SAP<span className="text-blue-400">Hub</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-slate-400 md:flex">
            <Link href="/" className="transition hover:text-white">Home</Link>
            <Link href="/courses/abap" className="text-blue-400">ABAP Course</Link>
            <Link href="/courses/hana" className="transition hover:text-white">HANA Course</Link>
          </nav>

          <Link
            href="/courses/abap"
            className="rounded-lg border border-white/15 px-4 py-2 text-sm transition hover:border-blue-400 hover:text-white"
          >
            Course Overview
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10">
        <article className="min-w-0">
          <div className="mb-8">
            <Link href="/courses/abap" className="text-sm text-blue-400 hover:text-blue-300">
              ABAP Course
            </Link>
            <span className="mx-2 text-slate-600">/</span>
            <span className="text-sm text-slate-500">Lesson 7</span>
          </div>

          <div className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-300">
                CHAPTER 2
              </span>
              <span className="text-sm text-slate-500">15–20 min read</span>
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              Constants and Literals
            </h1>
            {/* Bookmark Button */}
            <div className="mt-6">
              <BookmarkButton
                lessonSlug="constants-and-literals"
                lessonTitle="Constants and Literals"
                courseName="SAP ABAP"
              />
            </div>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              Learn how to define fixed values using constants and understand
              literals in ABAP programs. Discover when and why developers use
              them.
            </p>
          </div>

          <section className="mb-10 rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-teal-500/5 p-6">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-300">
              Learning objectives
            </p>
            <ul className="list-inside list-disc space-y-2 leading-7 text-slate-300">
              <li>Understand what constants are.</li>
              <li>Declare constants using the CONSTANTS keyword.</li>
              <li>Understand the difference between variables and constants.</li>
              <li>Identify different types of literals.</li>
              <li>Use constants and literals in practical programs.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              1. What are constants?
            </h2>

            <p className="mb-4 leading-8 text-slate-300">
              A <strong className="text-white">constant</strong> is a named
              value that cannot be changed after it has been declared.
              Constants are useful when a value should remain the same
              throughout a program.
            </p>

            <p className="mb-5 leading-8 text-slate-300">
              For example, a company name, tax rate, or application version
              might be represented using a constant when the value is fixed
              for that program.
            </p>

            <div className="rounded-xl border border-white/10 bg-[#111c30] p-5">
              <p className="mb-3 font-semibold text-white">Real-world example</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Company", "SAP"],
                  ["Country code", "IN"],
                  ["Application version", "1.0"],
                  ["Maximum attempts", "3"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-[#0b1120] p-4">
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="mt-1 font-semibold text-blue-300">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              2. How to declare constants in ABAP
            </h2>

            <p className="mb-5 leading-8 text-slate-300">
              ABAP provides the <code className="text-blue-300">CONSTANTS</code>{" "}
              keyword to declare a constant.
            </p>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="border-b border-white/10 bg-[#17243a] px-4 py-3 text-sm font-semibold text-slate-300">
                Basic syntax
              </div>
              <pre className="overflow-x-auto bg-[#080e19] p-5 text-sm leading-7 text-slate-300">
                <code>{`CONSTANTS constant_name TYPE data_type VALUE value.`}</code>
              </pre>
            </div>

            <p className="mb-4 mt-6 font-semibold text-white">Example:</p>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <pre className="overflow-x-auto bg-[#080e19] p-5 text-sm leading-7 text-slate-300">
                <code>{`CONSTANTS c_company TYPE string VALUE 'SAP'.
CONSTANTS c_country TYPE string VALUE 'INDIA'.
CONSTANTS c_max_attempts TYPE i VALUE 3.`}</code>
              </pre>
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-[#111c30] p-5">
              <h3 className="mb-3 font-semibold text-white">
                Understanding the syntax
              </h3>
              <ul className="space-y-3 text-sm leading-6 text-slate-400">
                <li>
                  <code className="text-blue-300">CONSTANTS</code> – declares
                  a constant.
                </li>
                <li>
                  <code className="text-blue-300">c_company</code> – the
                  constant's name.
                </li>
                <li>
                  <code className="text-blue-300">TYPE string</code> – defines
                  the data type.
                </li>
                <li>
                  <code className="text-blue-300">VALUE 'SAP'</code> – gives
                  the constant its fixed value.
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              3. Variables vs constants
            </h2>

            <p className="mb-5 leading-8 text-slate-300">
              The main difference is that a variable can be assigned a new
              value, while a constant cannot be changed after declaration.
            </p>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#17243a] text-slate-300">
                  <tr>
                    <th className="px-4 py-3">Feature</th>
                    <th className="px-4 py-3">Variable</th>
                    <th className="px-4 py-3">Constant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-[#111c30] text-slate-400">
                  <tr>
                    <td className="px-4 py-3">Keyword</td>
                    <td className="px-4 py-3 font-mono text-blue-300">DATA</td>
                    <td className="px-4 py-3 font-mono text-blue-300">CONSTANTS</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Value</td>
                    <td className="px-4 py-3">Can change</td>
                    <td className="px-4 py-3">Cannot change</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Initial value</td>
                    <td className="px-4 py-3">Can be assigned later</td>
                    <td className="px-4 py-3">Must be specified at declaration</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Example</td>
                    <td className="px-4 py-3 font-mono">lv_age</td>
                    <td className="px-4 py-3 font-mono">c_company</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-blue-400/20 bg-blue-400/5 p-5">
                <p className="mb-2 font-semibold text-blue-300">Variable</p>
                <pre className="whitespace-pre-wrap font-mono text-sm leading-7 text-slate-300">
{`DATA lv_age TYPE i.

lv_age = 25.
lv_age = 26.

" Value can change`}
                </pre>
              </div>
              <div className="rounded-xl border border-teal-400/20 bg-teal-400/5 p-5">
                <p className="mb-2 font-semibold text-teal-300">Constant</p>
                <pre className="whitespace-pre-wrap font-mono text-sm leading-7 text-slate-300">
{`CONSTANTS c_age TYPE i VALUE 25.

" c_age = 26.
" This reassignment is not allowed`}
                </pre>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              4. Why do we use constants?
            </h2>

            <div className="space-y-3">
              {[
                "Prevent accidental changes to fixed values.",
                "Make programs easier to understand.",
                "Avoid repeating the same fixed value in many places.",
                "Make maintenance easier when a fixed value needs updating in the source code.",
              ].map((item, index) => (
                <div key={index} className="flex gap-3 text-slate-300">
                  <span className="mt-1 text-teal-400">✓</span>
                  <p className="leading-7">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              5. What are literals?
            </h2>

            <p className="mb-4 leading-8 text-slate-300">
              A <strong className="text-white">literal</strong> is a value
              written directly in the source code rather than stored through
              a variable or constant name.
            </p>

            <p className="mb-5 leading-8 text-slate-300">
              For example, in the statement{" "}
              <code className="text-blue-300">lv_age = 25.</code>, the number
              <code className="text-blue-300"> 25</code> is a literal.
            </p>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="border-b border-white/10 bg-[#17243a] px-4 py-3 text-sm font-semibold text-slate-300">
                Literal examples
              </div>
              <pre className="overflow-x-auto bg-[#080e19] p-5 text-sm leading-7 text-slate-300">
                <code>{`DATA lv_age TYPE i.
DATA lv_name TYPE string.
DATA lv_salary TYPE p DECIMALS 2.

lv_age = 25.
lv_name = 'SARATH'.
lv_salary = '35000.50'.`}</code>
              </pre>
            </div>

            <p className="mt-4 leading-8 text-slate-300">
              Here, <code className="text-blue-300">25</code>,{" "}
              <code className="text-blue-300">'SARATH'</code>, and{" "}
              <code className="text-blue-300">'35000.50'</code> are values
              written directly in the program.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              6. Types of literals
            </h2>

            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-[#111c30] p-5">
                <h3 className="font-semibold text-white">Numeric literals</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Numeric values written directly in the program.
                </p>
                <pre className="mt-3 rounded-lg bg-[#080e19] p-3 font-mono text-sm leading-6 text-teal-300">
{`lv_age = 25.
lv_count = 100.`}
                </pre>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111c30] p-5">
                <h3 className="font-semibold text-white">Character literals</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Text values written inside single quotation marks.
                </p>
                <pre className="mt-3 rounded-lg bg-[#080e19] p-3 font-mono text-sm leading-6 text-teal-300">
{`lv_name = 'SARATH'.
lv_city = 'BANGALORE'.`}
                </pre>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111c30] p-5">
                <h3 className="font-semibold text-white">String literals</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Text written using backticks in ABAP string templates
                  or string literal syntax.
                </p>
                <pre className="mt-3 rounded-lg bg-[#080e19] p-3 font-mono text-sm leading-6 text-teal-300">
{`DATA lv_message TYPE string.

lv_message = \`Welcome to SAPHub\`.`}
                </pre>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/5 p-5">
              <p className="font-semibold text-amber-300">Important note</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                ABAP also supports text field literals and string literals.
                Single quotes and backticks are not interchangeable in every
                context. Learn their syntax carefully when writing programs.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              7. Practical ABAP program using constants
            </h2>

            <p className="mb-5 leading-8 text-slate-300">
              Let's create a simple employee program using variables and
              constants together.
            </p>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="border-b border-white/10 bg-[#17243a] px-4 py-3 text-sm font-semibold text-slate-300">
                Z_CONSTANTS_DEMO
              </div>
              <pre className="overflow-x-auto bg-[#080e19] p-5 text-sm leading-7 text-slate-300">
                <code>{`REPORT Z_CONSTANTS_DEMO.

CONSTANTS c_company TYPE string VALUE 'SAP'.

DATA lv_name TYPE string.
DATA lv_age TYPE i.
DATA lv_city TYPE string.

lv_name = 'SARATH KUMAR'.
lv_age = 25.
lv_city = 'BANGALORE'.

WRITE: / 'EMPLOYEE DETAILS'.
WRITE: / '-------------------------'.
WRITE: / 'COMPANY : ', c_company.
WRITE: / 'NAME    : ', lv_name.
WRITE: / 'AGE     : ', lv_age.
WRITE: / 'CITY    : ', lv_city.`}</code>
              </pre>
            </div>

            <div className="mt-5 rounded-xl border border-teal-400/20 bg-teal-400/5 p-5">
              <p className="mb-3 font-semibold text-teal-300">
                Expected output
              </p>
              <pre className="whitespace-pre-wrap font-mono text-sm leading-7 text-slate-300">
{`EMPLOYEE DETAILS
-------------------------
COMPANY : SAP
NAME    : SARATH KUMAR
AGE     : 25
CITY    : BANGALORE`}
              </pre>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              8. Key takeaways
            </h2>

            <div className="space-y-3">
              {[
                "CONSTANTS declares fixed values in ABAP.",
                "A constant must receive a value when declared.",
                "A constant cannot be reassigned.",
                "DATA declares variables whose values can change.",
                "A literal is a value written directly in the source code.",
                "Constants improve readability and help prevent accidental changes.",
              ].map((item, index) => (
                <div key={index} className="flex gap-3 text-slate-300">
                  <span className="mt-1 text-teal-400">✓</span>
                  <p className="leading-7">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="knowledge-check" className="mb-12">
            <div className="mb-5">
              <span className="text-sm font-semibold uppercase tracking-wider text-blue-300">
                Test your knowledge
              </span>
              <h2 className="mt-2 text-2xl font-bold text-white">
                Lesson 7 Knowledge Check
              </h2>
              <p className="mt-2 leading-7 text-slate-400">
                Answer all five questions to test your understanding.
              </p>
            </div>
            <KnowledgeCheck />
          </section>

          <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row">
            <Link
              href="/courses/abap/lessons/abap-data-types"
              className="rounded-xl border border-white/15 px-5 py-3 text-center text-sm font-semibold text-slate-300 transition hover:border-blue-400 hover:text-white"
            >
              ← Previous Lesson
            </Link>

            <Link
              href="/courses/abap/lessons/practical-coding-examples"
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
