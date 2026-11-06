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

export default function InternalTablesLesson() {
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
              LESSON 21 · INTERNAL TABLES
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">
              Introduction to Internal Tables
            </h1>
            {/* Bookmark Button */}
            <div className="mt-6">
              <BookmarkButton
                lessonSlug="introduction-to-internal-tables"
                lessonTitle="Introduction to Internal Tables"
                courseName="SAP ABAP"
              />
            </div>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              Learn how to store and process multiple records in memory
              using internal tables in SAP ABAP.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              1. What Are Internal Tables?
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              An internal table is a temporary data structure used by an
              ABAP program to store multiple rows of data in the program's
              memory during execution.
            </p>
            <p className="mt-4 leading-8 text-slate-400">
              For example, if you want to store details of 100 employees,
              creating 100 separate variables would be difficult.
              Instead, you can store all employee records in one internal
              table.
            </p>

            <div className="mt-5 rounded-xl border border-blue-500/20 bg-blue-500/10 p-5">
              <p className="font-semibold text-blue-300">Think of it like this</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                A normal variable stores one value. An internal table can
                store multiple rows, with each row containing several fields.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              2. Why Do We Need Internal Tables?
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Internal tables are useful when an ABAP program needs to
              collect, process, or display multiple records.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ["Store multiple records", "Keep many employee, customer, or product records together."],
                ["Process data", "Loop through records and perform calculations."],
                ["Sort information", "Arrange records based on selected fields."],
                ["Search records", "Find a particular row using its key or conditions."],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
                >
                  <h3 className="font-semibold text-blue-400">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              3. Normal Variable vs Internal Table
            </h2>

            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-700">
              <table className="w-full min-w-[450px] text-left text-sm">
                <thead className="bg-slate-800 text-slate-200">
                  <tr>
                    <th className="p-4">Normal variable</th>
                    <th className="p-4">Internal table</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-400">
                  <tr>
                    <td className="p-4">Stores one value or structure.</td>
                    <td className="p-4">Stores multiple rows.</td>
                  </tr>
                  <tr>
                    <td className="p-4">Example: one employee ID.</td>
                    <td className="p-4">Example: many employee records.</td>
                  </tr>
                  <tr>
                    <td className="p-4">Access one variable directly.</td>
                    <td className="p-4">Process rows using statements such as LOOP AT.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              4. Types of Internal Tables
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              ABAP provides three main categories of internal tables.
              They differ in how records are organized and accessed.
            </p>

            <div className="mt-5 space-y-4">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                <h3 className="font-semibold text-blue-400">1. Standard Table</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  A standard table maintains rows in an index-based sequence.
                  It is suitable for general-purpose storage and sequential
                  processing.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                <h3 className="font-semibold text-blue-400">2. Sorted Table</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  A sorted table automatically maintains its rows in sorted
                  order according to its table key. Its key can be unique
                  or non-unique.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                <h3 className="font-semibold text-blue-400">3. Hashed Table</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  A hashed table uses a hash key for key-based access.
                  Its primary key must be unique, and it does not provide
                  index-based access.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              5. Declaring an Internal Table
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Before creating an internal table, we define the structure
              of one row. In this example, each employee record contains
              an ID, name, and city.
            </p>

            <CodeExample
              title="Declare an internal table"
              description="Define a row structure and then create a standard internal table."
              code={`REPORT Z_INTERNAL_TABLE.

TYPES: BEGIN OF ty_employee,
         emp_id TYPE i,
         emp_name TYPE string,
         city TYPE string,
       END OF ty_employee.

DATA lt_employee TYPE STANDARD TABLE OF ty_employee
                 WITH EMPTY KEY.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              Let's understand the declarations:
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-6 text-sm leading-7 text-slate-400">
              <li><strong className="text-white">TYPES:</strong> Defines a reusable data type.</li>
              <li><strong className="text-white">ty_employee:</strong> Represents the structure of one employee row.</li>
              <li><strong className="text-white">emp_id:</strong> Employee ID field.</li>
              <li><strong className="text-white">emp_name:</strong> Employee name field.</li>
              <li><strong className="text-white">city:</strong> Employee city field.</li>
              <li><strong className="text-white">lt_employee:</strong> Internal table that can contain multiple employee rows.</li>
              <li><strong className="text-white">WITH EMPTY KEY:</strong> Declares an explicit empty primary key for this standard table.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              6. Adding Records Using APPEND
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              We can add records to an internal table using APPEND.
              Here, we use a work area to prepare each employee record
              before adding it to the table.
            </p>

            <CodeExample
              title="Add employee records"
              description="Create three records and append them to the internal table."
              code={`REPORT Z_INTERNAL_TABLE.

TYPES: BEGIN OF ty_employee,
         emp_id TYPE i,
         emp_name TYPE string,
         city TYPE string,
       END OF ty_employee.

DATA: lt_employee TYPE STANDARD TABLE OF ty_employee
                  WITH EMPTY KEY,
      ls_employee TYPE ty_employee.

ls_employee-emp_id = 101.
ls_employee-emp_name = 'Sarath'.
ls_employee-city = 'Bangalore'.
APPEND ls_employee TO lt_employee.

ls_employee-emp_id = 102.
ls_employee-emp_name = 'Ravi'.
ls_employee-city = 'Chennai'.
APPEND ls_employee TO lt_employee.

ls_employee-emp_id = 103.
ls_employee-emp_name = 'Kumar'.
ls_employee-city = 'Hyderabad'.
APPEND ls_employee TO lt_employee.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              Each time APPEND executes, the current contents of the work
              area are copied into a new row at the end of the standard
              internal table.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              7. Displaying Records Using LOOP AT
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              LOOP AT reads the rows of an internal table one by one.
              We can display each row using WRITE.
            </p>

            <CodeExample
              title="Read and display records"
              description="Loop through the employee table and display its contents."
              code={`LOOP AT lt_employee INTO ls_employee.

  WRITE: / 'Employee ID:', ls_employee-emp_id.
  WRITE: / 'Employee Name:', ls_employee-emp_name.
  WRITE: / 'City:', ls_employee-city.

ENDLOOP.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              INTO ls_employee copies the current row into the work area.
              The program then uses the work area's fields to display
              that employee's information.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              8. Complete Practical Program
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Now combine everything into one program. You can practise
              this example in your SAP ABAP editor.
            </p>

            <CodeExample
              title="Complete employee internal table program"
              description="Declare, populate, and display an internal table."
              code={`REPORT Z_EMPLOYEE_TABLE.

TYPES: BEGIN OF ty_employee,
         emp_id TYPE i,
         emp_name TYPE string,
         city TYPE string,
       END OF ty_employee.

DATA: lt_employee TYPE STANDARD TABLE OF ty_employee
                  WITH EMPTY KEY,
      ls_employee TYPE ty_employee.

"First employee
ls_employee-emp_id = 101.
ls_employee-emp_name = 'Sarath'.
ls_employee-city = 'Bangalore'.
APPEND ls_employee TO lt_employee.

"Second employee
ls_employee-emp_id = 102.
ls_employee-emp_name = 'Ravi'.
ls_employee-city = 'Chennai'.
APPEND ls_employee TO lt_employee.

"Third employee
ls_employee-emp_id = 103.
ls_employee-emp_name = 'Kumar'.
ls_employee-city = 'Hyderabad'.
APPEND ls_employee TO lt_employee.

"Display all employees
LOOP AT lt_employee INTO ls_employee.

  WRITE: / 'Employee ID:', ls_employee-emp_id.
  WRITE: / 'Employee Name:', ls_employee-emp_name.
  WRITE: / 'City:', ls_employee-city.
  WRITE: / '------------------------'.

ENDLOOP.`}
            />
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              9. Important Points to Remember
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["Internal table", "Stores multiple rows in program memory."],
                ["TYPES", "Defines a reusable data type."],
                ["STANDARD TABLE", "Stores rows in index-based sequence."],
                ["SORTED TABLE", "Maintains rows in sorted key order."],
                ["HASHED TABLE", "Supports key-based access using a hash key."],
                ["APPEND", "Adds a row to the end of a standard table."],
                ["LOOP AT", "Processes internal table rows one by one."],
                ["Work area", "Holds a row while you prepare or process it."],
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
              href="/courses/abap/lessons/nested-loops"
              className="rounded-xl border border-slate-700 px-5 py-3 text-center text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              ← Previous Lesson
            </Link>
            <Link
              href="/courses/abap/lessons/work-areas"
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
