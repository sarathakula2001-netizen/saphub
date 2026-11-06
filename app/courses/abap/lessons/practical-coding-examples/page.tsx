import BookmarkButton from "@/components/learning/BookmarkButton";

import Link from "next/link";
import KnowledgeCheck from "./knowledge-check";

const topics = [
  "Combining variables and data types",
  "Using constants in ABAP",
  "Accepting and displaying values",
  "A complete customer-details program",
];

export default function PracticalCodingExamples() {
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
              ABAP FUNDAMENTALS · LESSON 8 OF 24
            </p>
            <h1 className="mt-3 text-4xl font-bold text-white">
              Practical Coding Examples
            </h1>
            {/* Bookmark Button */}
            <div className="mt-6">
              <BookmarkButton
                lessonSlug="practical-coding-examples"
                lessonTitle="Practical Coding Examples"
                courseName="SAP ABAP"
              />
            </div>
            <p className="mt-4 leading-7 text-slate-400">
              Now let's combine the ABAP concepts you have learned and
              write complete programs with practical examples.
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

          {/* Example 1 */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              1. Example: Student Details
            </h2>
            <p className="leading-7 text-slate-400">
              We can use variables to store student information such as
              ID, name, city and marks.
            </p>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="border-b border-white/10 bg-[#17243A] px-4 py-3 text-sm font-medium text-blue-300">
                ABAP Program
              </div>
              <pre className="overflow-x-auto bg-[#080F1C] p-5 text-sm leading-7 text-slate-300">
                <code>{`REPORT Z_STUDENT_DETAILS.

DATA: lv_id    TYPE i,
      lv_name  TYPE string,
      lv_city  TYPE string,
      lv_marks TYPE p LENGTH 5 DECIMALS 2.

lv_id = 101.
lv_name = 'SARATH'.
lv_city = 'BANGALORE'.
lv_marks = '85.50'.

WRITE: / 'STUDENT DETAILS'.
WRITE: / '----------------------'.
WRITE: / 'Student ID :', lv_id.
WRITE: / 'Name       :', lv_name.
WRITE: / 'City       :', lv_city.
WRITE: / 'Marks      :', lv_marks.`}</code>
              </pre>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="mb-3 font-semibold text-teal-400">
                Expected output
              </h3>
              <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
{`STUDENT DETAILS
----------------------
Student ID : 101
Name       : SARATH
City       : BANGALORE
Marks      : 85.50`}
              </pre>
            </div>

            <div className="rounded-xl bg-blue-500/5 p-4">
              <h3 className="mb-2 font-semibold text-blue-300">
                Explanation
              </h3>
              <ul className="space-y-2 text-sm leading-6 text-slate-400">
                <li>• DATA declares variables.</li>
                <li>• TYPE i stores an integer.</li>
                <li>• TYPE string stores text.</li>
                <li>• TYPE p stores packed decimal numbers.</li>
                <li>• WRITE displays the information.</li>
              </ul>
            </div>
          </section>

          {/* Example 2 */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              2. Example: Using Constants
            </h2>
            <p className="leading-7 text-slate-400">
              Constants store fixed values that should not change
              during program execution.
            </p>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="border-b border-white/10 bg-[#17243A] px-4 py-3 text-sm font-medium text-blue-300">
                ABAP Program
              </div>
              <pre className="overflow-x-auto bg-[#080F1C] p-5 text-sm leading-7 text-slate-300">
                <code>{`REPORT Z_COMPANY_DETAILS.

CONSTANTS c_company TYPE string VALUE 'SAP'.

DATA: lv_employee TYPE string,
      lv_salary   TYPE p LENGTH 8 DECIMALS 2.

lv_employee = 'SARATH'.
lv_salary = '35000.00'.

WRITE: / 'COMPANY DETAILS'.
WRITE: / 'Company  :', c_company.
WRITE: / 'Employee :', lv_employee.
WRITE: / 'Salary   :', lv_salary.`}</code>
              </pre>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="mb-3 font-semibold text-teal-400">
                Expected output
              </h3>
              <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
{`COMPANY DETAILS
Company  : SAP
Employee : SARATH
Salary   : 35000.00`}
              </pre>
            </div>

            <div className="rounded-xl bg-blue-500/5 p-4">
              <h3 className="mb-2 font-semibold text-blue-300">
                Explanation
              </h3>
              <ul className="space-y-2 text-sm leading-6 text-slate-400">
                <li>• CONSTANTS declares a fixed value.</li>
                <li>• VALUE assigns the initial constant value.</li>
                <li>• c_company stores the company name SAP.</li>
                <li>• Variables can be reassigned; constants cannot be reassigned.</li>
              </ul>
            </div>
          </section>

          {/* Example 3 */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              3. Example: Taking Input from the User
            </h2>
            <p className="leading-7 text-slate-400">
              In a classic executable ABAP report, PARAMETERS lets
              the user enter values on the selection screen.
            </p>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="border-b border-white/10 bg-[#17243A] px-4 py-3 text-sm font-medium text-blue-300">
                ABAP Program
              </div>
              <pre className="overflow-x-auto bg-[#080F1C] p-5 text-sm leading-7 text-slate-300">
                <code>{`REPORT Z_USER_INPUT.

PARAMETERS p_name TYPE string.
PARAMETERS p_city TYPE string.

START-OF-SELECTION.

  WRITE: / 'USER INFORMATION'.
  WRITE: / 'Name :', p_name.
  WRITE: / 'City :', p_city.`}</code>
              </pre>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="mb-3 font-semibold text-teal-400">
                Example input
              </h3>
              <p className="text-sm text-slate-300">Name: SARATH</p>
              <p className="text-sm text-slate-300">City: BANGALORE</p>

              <h3 className="mb-2 mt-4 font-semibold text-teal-400">
                Expected output
              </h3>
              <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
{`USER INFORMATION
Name : SARATH
City : BANGALORE`}
              </pre>
            </div>

            <div className="rounded-xl bg-blue-500/5 p-4">
              <h3 className="mb-2 font-semibold text-blue-300">
                Explanation
              </h3>
              <ul className="space-y-2 text-sm leading-6 text-slate-400">
                <li>• PARAMETERS creates input fields.</li>
                <li>• p_name receives the name entered by the user.</li>
                <li>• p_city receives the city entered by the user.</li>
                <li>• START-OF-SELECTION begins the main report processing.</li>
              </ul>
            </div>

            <p className="text-sm leading-6 text-slate-400">
              To test it, execute the report in SAP GUI, enter the name
              and city on the selection screen, and run it.
            </p>
          </section>

          {/* Example 4 */}
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              4. Example: Employee Salary Calculation
            </h2>
            <p className="leading-7 text-slate-400">
              Let's combine variables and arithmetic operators to
              calculate an employee's total salary.
            </p>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="border-b border-white/10 bg-[#17243A] px-4 py-3 text-sm font-medium text-blue-300">
                ABAP Program
              </div>
              <pre className="overflow-x-auto bg-[#080F1C] p-5 text-sm leading-7 text-slate-300">
                <code>{`REPORT Z_SALARY_CALCULATION.

DATA: lv_basic TYPE p LENGTH 8 DECIMALS 2,
      lv_bonus TYPE p LENGTH 8 DECIMALS 2,
      lv_total TYPE p LENGTH 8 DECIMALS 2.

lv_basic = '30000.00'.
lv_bonus = '5000.00'.

lv_total = lv_basic + lv_bonus.

WRITE: / 'SALARY CALCULATION'.
WRITE: / 'Basic Salary :', lv_basic.
WRITE: / 'Bonus        :', lv_bonus.
WRITE: / 'Total Salary :', lv_total.`}</code>
              </pre>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="mb-3 font-semibold text-teal-400">
                Expected output
              </h3>
              <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
{`SALARY CALCULATION
Basic Salary : 30000.00
Bonus        : 5000.00
Total Salary : 35000.00`}
              </pre>
            </div>

            <div className="rounded-xl bg-blue-500/5 p-4">
              <h3 className="mb-2 font-semibold text-blue-300">
                Explanation
              </h3>
              <ul className="space-y-2 text-sm leading-6 text-slate-400">
                <li>• lv_basic stores the basic salary.</li>
                <li>• lv_bonus stores the bonus amount.</li>
                <li>• The + operator adds the two values.</li>
                <li>• lv_total stores the calculated salary.</li>
              </ul>
            </div>
          </section>

          {/* Key takeaways */}
          <section className="mb-10 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">
              Key Takeaways
            </h2>
            <ul className="space-y-3 text-sm leading-6 text-slate-300">
              <li>✓ DATA is used to declare variables.</li>
              <li>✓ CONSTANTS is used to declare fixed values.</li>
              <li>✓ PARAMETERS accepts input from users.</li>
              <li>✓ WRITE displays information in the output.</li>
              <li>✓ Arithmetic operators perform calculations.</li>
            </ul>
          </section>

          {/* Quiz */}
          <KnowledgeCheck />

          {/* Lesson navigation */}
          <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6">
            <Link
              href="/courses/abap/lessons/constants-and-literals"
              className="rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-300 hover:bg-white/5"
            >
              ← Previous Lesson
            </Link>

            <Link
              href="/courses/abap/lessons/arithmetic-operators"
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
