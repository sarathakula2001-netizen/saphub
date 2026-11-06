import BookmarkButton from "@/components/learning/BookmarkButton";

import Link from "next/link";
import KnowledgeCheck from "./knowledge-check";

const dataTypes = [
  {
    category: "Numeric types",
    types: [
      {
        type: "I",
        name: "Integer",
        description: "Stores whole numbers without decimal places.",
        example: "DATA lv_age TYPE i.",
        value: "25",
      },
      {
        type: "P",
        name: "Packed number",
        description:
          "Stores decimal numbers using packed decimal representation. Useful for amounts and calculations.",
        example: "DATA lv_salary TYPE p LENGTH 8 DECIMALS 2.",
        value: "35000.50",
      },
      {
        type: "F",
        name: "Floating point",
        description:
          "Stores floating-point numbers. It is useful for approximate scientific calculations.",
        example: "DATA lv_value TYPE f.",
        value: "125.75",
      },
    ],
  },
  {
    category: "Character types",
    types: [
      {
        type: "C",
        name: "Character",
        description:
          "Stores fixed-length character data. The length can be specified.",
        example: "DATA lv_name TYPE c LENGTH 20.",
        value: "SARATH",
      },
      {
        type: "N",
        name: "Numeric text",
        description:
          "Stores digit characters as text, often used for numeric identifiers.",
        example: "DATA lv_code TYPE n LENGTH 5.",
        value: "00123",
      },
      {
        type: "STRING",
        name: "String",
        description:
          "Stores text with variable length.",
        example: "DATA lv_city TYPE string.",
        value: "Bangalore",
      },
    ],
  },
  {
    category: "Date and time types",
    types: [
      {
        type: "D",
        name: "Date",
        description:
          "Stores date values. The internal format is YYYYMMDD.",
        example: "DATA lv_date TYPE d.",
        value: "20261104",
      },
      {
        type: "T",
        name: "Time",
        description:
          "Stores time values. The internal format is HHMMSS.",
        example: "DATA lv_time TYPE t.",
        value: "143000",
      },
    ],
  },
];

export default function ABAPDataTypesLesson() {
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
            <span className="text-sm text-slate-500">Lesson 6</span>
          </div>

          <div className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-300">
                CHAPTER 2
              </span>
              <span className="text-sm text-slate-500">15–20 min read</span>
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              ABAP Data Types
            </h1>
            {/* Bookmark Button */}
            <div className="mt-6">
              <BookmarkButton
                lessonSlug="abap-data-types"
                lessonTitle="ABAP Data Types"
                courseName="SAP ABAP"
              />
            </div>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              Understand how ABAP stores different kinds of information.
              Explore numeric, character, date, and time data types with
              practical coding examples.
            </p>
          </div>

          <section className="mb-10 rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-teal-500/5 p-6">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-300">
              Learning objectives
            </p>
            <ul className="list-inside list-disc space-y-2 leading-7 text-slate-300">
              <li>Understand what a data type means.</li>
              <li>Identify commonly used ABAP elementary data types.</li>
              <li>Choose suitable types for different values.</li>
              <li>Declare and use different types in an ABAP program.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              1. What are data types?
            </h2>

            <p className="mb-4 leading-8 text-slate-300">
              A <strong className="text-white">data type</strong> defines
              what kind of value a variable can store and how that value
              is represented.
            </p>

            <p className="mb-5 leading-8 text-slate-300">
              For example, age is normally stored as a whole number, a
              person's name is stored as text, and a date is stored using
              a date type.
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Age", "25", "I"],
                ["Name", "SARATH", "C / STRING"],
                ["Date", "20261104", "D"],
              ].map(([label, value, type]) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/10 bg-[#111c30] p-5"
                >
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="mt-2 text-xl font-bold text-white">{value}</p>
                  <p className="mt-2 font-mono text-xs text-blue-300">
                    TYPE {type}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              2. Categories of commonly used ABAP data types
            </h2>

            <p className="mb-6 leading-8 text-slate-300">
              In this lesson, we'll group some commonly used elementary
              data types into three practical categories.
            </p>

            <div className="space-y-8">
              {dataTypes.map((group) => (
                <div key={group.category}>
                  <h3 className="mb-4 text-xl font-semibold text-blue-300">
                    {group.category}
                  </h3>

                  <div className="space-y-3">
                    {group.types.map((item) => (
                      <div
                        key={item.type}
                        className="rounded-xl border border-white/10 bg-[#111c30] p-5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h4 className="font-semibold text-white">
                            {item.name}
                          </h4>
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
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              3. Difference between C, N, and STRING
            </h2>

            <p className="mb-5 leading-8 text-slate-300">
              These types are all used for character-based information,
              but they behave differently.
            </p>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#17243a] text-slate-300">
                  <tr>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Purpose</th>
                    <th className="px-4 py-3">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-[#111c30] text-slate-400">
                  <tr>
                    <td className="px-4 py-3 font-mono text-blue-300">C</td>
                    <td className="px-4 py-3">Fixed-length text</td>
                    <td className="px-4 py-3 font-mono">SARATH</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-blue-300">N</td>
                    <td className="px-4 py-3">Digit characters</td>
                    <td className="px-4 py-3 font-mono">00123</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-blue-300">STRING</td>
                    <td className="px-4 py-3">Variable-length text</td>
                    <td className="px-4 py-3 font-mono">Bangalore</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-[#111c30] p-5">
              <p className="font-semibold text-white">Remember:</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                N is a character-like type for digit characters. It is not
                the same as an integer. For example, 00123 can retain its
                leading zeros when stored in an N field.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              4. Practical ABAP program using different data types
            </h2>

            <p className="mb-5 leading-8 text-slate-300">
              Let's create a program that stores a person's name, age,
              salary, city, date, and time.
            </p>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="border-b border-white/10 bg-[#17243a] px-4 py-3 text-sm font-semibold text-slate-300">
                Z_ABAP_DATA_TYPES
              </div>

              <pre className="overflow-x-auto bg-[#080e19] p-5 text-sm leading-7 text-slate-300">
                <code>{`REPORT Z_ABAP_DATA_TYPES.

DATA: lv_name   TYPE string,
      lv_age    TYPE i,
      lv_salary TYPE p LENGTH 8 DECIMALS 2,
      lv_city   TYPE c LENGTH 20,
      lv_date   TYPE d,
      lv_time   TYPE t.

lv_name = 'SARATH KUMAR'.
lv_age = 25.
lv_salary = '35000.50'.
lv_city = 'BANGALORE'.
lv_date = '20261104'.
lv_time = '143000'.

WRITE: / 'EMPLOYEE DETAILS'.
WRITE: / '-------------------------'.
WRITE: / 'NAME   : ', lv_name.
WRITE: / 'AGE    : ', lv_age.
WRITE: / 'SALARY : ', lv_salary.
WRITE: / 'CITY   : ', lv_city.
WRITE: / 'DATE   : ', lv_date.
WRITE: / 'TIME   : ', lv_time.`}</code>
              </pre>
            </div>

            <div className="mt-5 rounded-xl border border-teal-400/20 bg-teal-400/5 p-5">
              <p className="mb-3 font-semibold text-teal-300">
                Expected output
              </p>
              <pre className="whitespace-pre-wrap font-mono text-sm leading-7 text-slate-300">
{`EMPLOYEE DETAILS
-------------------------
NAME   : SARATH KUMAR
AGE    : 25
SALARY : 35000.50
CITY   : BANGALORE
DATE   : 20261104
TIME   : 143000`}
              </pre>
            </div>

            <p className="mt-5 leading-8 text-slate-300">
              The exact formatting of numeric and date output can depend on
              the SAP system and user settings. The output above is a
              simplified illustration.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              5. How to choose the correct data type
            </h2>

            <div className="space-y-3">
              {[
                ["Age or count", "I", "Whole numbers"],
                ["Salary or amount", "P", "Decimal calculations"],
                ["Person's name", "STRING", "Text with flexible length"],
                ["Employee code", "N or C", "Character-based identifiers"],
                ["Date of joining", "D", "Date information"],
                ["Login time", "T", "Time information"],
              ].map(([purpose, type, reason]) => (
                <div
                  key={purpose}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#111c30] p-4"
                >
                  <div>
                    <p className="font-semibold text-white">{purpose}</p>
                    <p className="mt-1 text-xs text-slate-500">{reason}</p>
                  </div>
                  <span className="rounded-md bg-blue-500/10 px-3 py-1 font-mono text-sm text-blue-300">
                    {type}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              6. Key takeaways
            </h2>

            <div className="space-y-3">
              {[
                "A data type defines the kind of value a variable can hold.",
                "I is used for integer values.",
                "P is useful for packed decimal values.",
                "F stores floating-point values.",
                "C, N, and STRING are used for character-based information.",
                "D and T represent date and time values.",
                "Choosing the right type helps make programs reliable.",
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
                Lesson 6 Knowledge Check
              </h2>
              <p className="mt-2 leading-7 text-slate-400">
                Answer all five questions to test your understanding.
              </p>
            </div>
            <KnowledgeCheck />
          </section>

          <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row">
            <Link
              href="/courses/abap/lessons/introduction-to-variables"
              className="rounded-xl border border-white/15 px-5 py-3 text-center text-sm font-semibold text-slate-300 transition hover:border-blue-400 hover:text-white"
            >
              ← Previous Lesson
            </Link>

            <Link
              href="/courses/abap/lessons/constants-and-literals"
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
