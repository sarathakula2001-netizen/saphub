import BookmarkButton from "@/components/learning/BookmarkButton";

import Link from "next/link";
import KnowledgeCheck from "./knowledge-check";

const dataTypes = [
  {
    type: "I",
    name: "Integer",
    description: "Stores whole numbers without decimal places.",
    example: "DATA lv_age TYPE i.",
    value: "25",
  },
  {
    type: "C",
    name: "Character",
    description: "Stores fixed-length character data.",
    example: "DATA lv_name TYPE c LENGTH 20.",
    value: "'SARATH'",
  },
  {
    type: "N",
    name: "Numeric text",
    description: "Stores digit characters as text.",
    example: "DATA lv_number TYPE n LENGTH 5.",
    value: "'00123'",
  },
  {
    type: "P",
    name: "Packed number",
    description: "Stores numeric values, including decimal places.",
    example: "DATA lv_salary TYPE p DECIMALS 2.",
    value: "25000.50",
  },
  {
    type: "STRING",
    name: "String",
    description: "Stores text with variable length.",
    example: "DATA lv_city TYPE string.",
    value: "'Bangalore'",
  },
  {
    type: "D",
    name: "Date",
    description: "Stores date values in internal date format.",
    example: "DATA lv_date TYPE d.",
    value: "'20261104'",
  },
  {
    type: "T",
    name: "Time",
    description: "Stores time values in internal time format.",
    example: "DATA lv_time TYPE t.",
    value: "'143000'",
  },
];

export default function IntroductionToVariablesLesson() {
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
            <Link
              href="/courses/abap"
              className="text-sm text-blue-400 transition hover:text-blue-300"
            >
              ABAP Course
            </Link>
            <span className="mx-2 text-slate-600">/</span>
            <span className="text-sm text-slate-500">Lesson 5</span>
          </div>

          <div className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-300">
                CHAPTER 2
              </span>
              <span className="text-sm text-slate-500">15–20 min read</span>
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              Introduction to Variables
            </h1>
            {/* Bookmark Button */}
            <div className="mt-6">
              <BookmarkButton
                lessonSlug="introduction-to-variables"
                lessonTitle="Introduction to Variables"
                courseName="SAP ABAP"
              />
            </div>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              Learn how to declare variables, choose data types, assign values,
              and display information in an ABAP program.
            </p>
          </div>

          <section className="mb-10 rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-teal-500/5 p-6">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-300">
              Learning objectives
            </p>
            <ul className="list-inside list-disc space-y-2 leading-7 text-slate-300">
              <li>Understand what variables are.</li>
              <li>Declare variables using DATA.</li>
              <li>Identify commonly used ABAP data types.</li>
              <li>Assign values and display them using WRITE.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              1. What is a variable?
            </h2>

            <p className="mb-4 leading-8 text-slate-300">
              A <strong className="text-white">variable</strong> is a named
              memory location used to store information while a program is
              running.
            </p>

            <p className="mb-5 leading-8 text-slate-300">
              For example, imagine you want to store a person's age, name,
              city, or salary in an ABAP program. You can create variables
              to hold these values.
            </p>

            <div className="rounded-xl border border-white/10 bg-[#111c30] p-5">
              <p className="mb-3 font-semibold text-white">
                Real-world example
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Name", "SARATH"],
                  ["Age", "25"],
                  ["City", "Bangalore"],
                  ["Salary", "35000"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-[#0b1120] p-4">
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="mt-1 font-semibold text-blue-300">{value}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-500">
                Each item can be stored in a separate variable.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              2. Why do we use variables?
            </h2>

            <p className="mb-5 leading-8 text-slate-300">
              Variables allow a program to store and work with information.
              Instead of writing the same fixed value throughout your
              program, you can store it once and reuse it.
            </p>

            <div className="space-y-3">
              {[
                "Store user information such as name and age.",
                "Perform calculations using numeric values.",
                "Read and process database information.",
                "Reuse and update values while a program runs.",
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
              3. How to declare a variable in ABAP
            </h2>

            <p className="mb-5 leading-8 text-slate-300">
              In ABAP, we use the <code className="text-blue-300">DATA</code>{" "}
              keyword to declare variables.
            </p>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="border-b border-white/10 bg-[#17243a] px-4 py-3 text-sm font-semibold text-slate-300">
                Basic syntax
              </div>
              <pre className="overflow-x-auto bg-[#080e19] p-5 text-sm leading-7 text-slate-300">
                <code>{`DATA variable_name TYPE data_type.`}</code>
              </pre>
            </div>

            <p className="mb-4 mt-6 font-semibold text-white">
              Example:
            </p>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <pre className="overflow-x-auto bg-[#080e19] p-5 text-sm leading-7 text-slate-300">
                <code>{`DATA lv_age TYPE i.
DATA lv_name TYPE string.
DATA lv_salary TYPE p DECIMALS 2.`}</code>
              </pre>
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-[#111c30] p-5">
              <h3 className="mb-3 font-semibold text-white">
                Understanding the syntax
              </h3>
              <ul className="space-y-3 text-sm leading-6 text-slate-400">
                <li>
                  <code className="text-blue-300">DATA</code> – declares a
                  variable.
                </li>
                <li>
                  <code className="text-blue-300">lv_age</code> – the variable
                  name.
                </li>
                <li>
                  <code className="text-blue-300">TYPE</code> – specifies the
                  variable's data type.
                </li>
                <li>
                  <code className="text-blue-300">i</code> – represents an
                  integer data type.
                </li>
                <li>
                  <code className="text-blue-300">.</code> – ends the ABAP
                  statement.
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              4. Common ABAP data types
            </h2>

            <p className="mb-5 leading-8 text-slate-300">
              A data type defines what kind of value a variable can hold.
              Here are some commonly used elementary ABAP data types.
            </p>

            <div className="space-y-3">
              {dataTypes.map((item) => (
                <div
                  key={item.type}
                  className="rounded-xl border border-white/10 bg-[#111c30] p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-semibold text-white">{item.name}</h3>
                    <span className="rounded-md bg-blue-500/10 px-3 py-1 font-mono text-sm text-blue-300">
                      TYPE {item.type}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {item.description}
                  </p>
                  <pre className="mt-3 overflow-x-auto rounded-lg bg-[#080e19] p-3 text-xs leading-6 text-teal-300">
                    <code>{item.example}</code>
                  </pre>
                  <p className="mt-2 text-xs text-slate-500">
                    Example value:{" "}
                    <code className="text-slate-300">{item.value}</code>
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              5. How to assign values to variables
            </h2>

            <p className="mb-5 leading-8 text-slate-300">
              After declaring a variable, you can assign a value using the
              assignment operator <code className="text-blue-300">=</code>.
            </p>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <pre className="overflow-x-auto bg-[#080e19] p-5 text-sm leading-7 text-slate-300">
                <code>{`REPORT Z_VARIABLES.

DATA lv_age TYPE i.
DATA lv_name TYPE string.
DATA lv_city TYPE string.

lv_age = 25.
lv_name = 'SARATH KUMAR'.
lv_city = 'BANGALORE'.`}</code>
              </pre>
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-[#111c30] p-5">
              <h3 className="mb-3 font-semibold text-white">
                What happens here?
              </h3>
              <ul className="space-y-3 text-sm leading-6 text-slate-400">
                <li>
                  <code className="text-blue-300">lv_age = 25.</code> stores
                  the number 25.
                </li>
                <li>
                  <code className="text-blue-300">lv_name = 'SARATH KUMAR'.</code>{" "}
                  stores the person's name.
                </li>
                <li>
                  <code className="text-blue-300">lv_city = 'BANGALORE'.</code>{" "}
                  stores the city.
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              6. Display variable values using WRITE
            </h2>

            <p className="mb-5 leading-8 text-slate-300">
              The <code className="text-blue-300">WRITE</code> statement
              displays information in the ABAP output screen.
            </p>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="border-b border-white/10 bg-[#17243a] px-4 py-3 text-sm text-slate-300">
                Complete ABAP program
              </div>
              <pre className="overflow-x-auto bg-[#080e19] p-5 text-sm leading-7 text-slate-300">
                <code>{`REPORT Z_VARIABLES.

DATA lv_age TYPE i.
DATA lv_name TYPE string.
DATA lv_city TYPE string.

lv_age = 25.
lv_name = 'SARATH KUMAR'.
lv_city = 'BANGALORE'.

WRITE: / 'NAME  : ', lv_name.
WRITE: / 'AGE   : ', lv_age.
WRITE: / 'CITY  : ', lv_city.`}</code>
              </pre>
            </div>

            <div className="mt-5 rounded-xl border border-teal-400/20 bg-teal-400/5 p-5">
              <p className="mb-3 font-semibold text-teal-300">
                Expected output
              </p>
              <pre className="whitespace-pre-wrap font-mono text-sm leading-7 text-slate-300">
{`NAME  : SARATH KUMAR
AGE   : 25
CITY  : BANGALORE`}
              </pre>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              7. Variable naming convention
            </h2>

            <p className="mb-5 leading-8 text-slate-300">
              ABAP developers often use prefixes to make variable names
              easier to understand. These are conventions, not mandatory
              language keywords.
            </p>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#17243a] text-slate-300">
                  <tr>
                    <th className="px-4 py-3">Prefix</th>
                    <th className="px-4 py-3">Common meaning</th>
                    <th className="px-4 py-3">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-[#111c30] text-slate-400">
                  <tr>
                    <td className="px-4 py-3 font-mono text-blue-300">lv_</td>
                    <td className="px-4 py-3">Local variable</td>
                    <td className="px-4 py-3 font-mono">lv_age</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-blue-300">gv_</td>
                    <td className="px-4 py-3">Global variable</td>
                    <td className="px-4 py-3 font-mono">gv_count</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-blue-300">c_</td>
                    <td className="px-4 py-3">Constant</td>
                    <td className="px-4 py-3 font-mono">c_company</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-blue-300">lt_</td>
                    <td className="px-4 py-3">Local internal table</td>
                    <td className="px-4 py-3 font-mono">lt_students</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-blue-300">ls_</td>
                    <td className="px-4 py-3">Local structure</td>
                    <td className="px-4 py-3 font-mono">ls_student</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              8. Key takeaways
            </h2>

            <div className="space-y-3">
              {[
                "Variables store information while a program runs.",
                "DATA is used to declare variables.",
                "TYPE defines the variable's data type.",
                "The equals sign (=) assigns values.",
                "WRITE displays variable values.",
                "Prefixes such as lv_ help organize variable names.",
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
                Lesson 5 Knowledge Check
              </h2>
              <p className="mt-2 leading-7 text-slate-400">
                Answer all five questions to test your understanding.
              </p>
            </div>
            <KnowledgeCheck />
          </section>

          <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row">
            <Link
              href="/courses/abap/lessons/understanding-abap-workbench"
              className="rounded-xl border border-white/15 px-5 py-3 text-center text-sm font-semibold text-slate-300 transition hover:border-blue-400 hover:text-white"
            >
              ← Previous Lesson
            </Link>

            <Link
              href="/courses/abap/lessons/abap-data-types"
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
