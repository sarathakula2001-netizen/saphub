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

export default function WorkAreasLesson() {
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
              LESSON 22 · INTERNAL TABLES
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">
              Work Areas in SAP ABAP
            </h1>
            {/* Bookmark Button */}
            <div className="mt-6">
              <BookmarkButton
                lessonSlug="work-areas"
                lessonTitle="Work Areas in SAP ABAP"
                courseName="SAP ABAP"
              />
            </div>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              Understand how work areas hold individual records while
              working with internal tables in ABAP.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              1. What Is a Work Area?
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              A work area is a data object that holds one row of data
              temporarily. It is commonly used when inserting, reading,
              or processing records in an internal table.
            </p>

            <div className="mt-5 rounded-xl border border-blue-500/20 bg-blue-500/10 p-5">
              <p className="font-semibold text-blue-300">Simple example</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Imagine an internal table containing 100 employee records.
                A work area can hold one employee record at a time while
                your program processes the table.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              2. Why Do We Need Work Areas?
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ["Prepare records", "Fill individual fields before adding a row to an internal table."],
                ["Read records", "Receive a row returned by READ TABLE."],
                ["Process records", "Access and calculate values one row at a time."],
                ["Display records", "Use individual fields to display information."],
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
              3. Work Area vs Internal Table
            </h2>

            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-700">
              <table className="w-full min-w-[450px] text-left text-sm">
                <thead className="bg-slate-800 text-slate-200">
                  <tr>
                    <th className="p-4">Work Area</th>
                    <th className="p-4">Internal Table</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-400">
                  <tr>
                    <td className="p-4">Holds one row at a time.</td>
                    <td className="p-4">Stores multiple rows.</td>
                  </tr>
                  <tr>
                    <td className="p-4">Example: ls_employee.</td>
                    <td className="p-4">Example: lt_employee.</td>
                  </tr>
                  <tr>
                    <td className="p-4">Used to prepare or receive a row.</td>
                    <td className="p-4">Used to store and process records.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              4. Declaring a Work Area
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              We can declare a work area using DATA and the structure
              defined with TYPES.
            </p>

            <CodeExample
              title="Work area declaration"
              description="Create an employee structure, an internal table, and a work area."
              code={`REPORT Z_WORK_AREA.

TYPES: BEGIN OF ty_employee,
         emp_id TYPE i,
         emp_name TYPE string,
         city TYPE string,
       END OF ty_employee.

DATA: lt_employee TYPE STANDARD TABLE OF ty_employee
                  WITH EMPTY KEY,
      ls_employee TYPE ty_employee.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              Here, ls_employee has the same structure as one row of
              lt_employee. The prefix ls is commonly used for a
              structure or work area, while lt is commonly used for
              an internal table.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              5. Assigning Values to a Work Area
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              After declaring a work area, we can assign values to
              individual fields using the structure-field syntax.
            </p>

            <CodeExample
              title="Assign employee details"
              description="Fill the fields of one employee work area."
              code={`ls_employee-emp_id = 101.
ls_employee-emp_name = 'Sarath'.
ls_employee-city = 'Bangalore'.

WRITE: / ls_employee-emp_id.
WRITE: / ls_employee-emp_name.
WRITE: / ls_employee-city.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              The hyphen connects the structure name to its field name.
              For example, ls_employee-emp_name accesses the employee
              name field.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              6. Adding Records Using APPEND
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Once the work area contains a complete record, APPEND
              copies that record into the internal table.
            </p>

            <CodeExample
              title="APPEND using a work area"
              description="Add two employee records."
              code={`REPORT Z_APPEND_WORK_AREA.

TYPES: BEGIN OF ty_employee,
         emp_id TYPE i,
         emp_name TYPE string,
       END OF ty_employee.

DATA: lt_employee TYPE STANDARD TABLE OF ty_employee
                  WITH EMPTY KEY,
      ls_employee TYPE ty_employee.

ls_employee-emp_id = 101.
ls_employee-emp_name = 'Sarath'.
APPEND ls_employee TO lt_employee.

ls_employee-emp_id = 102.
ls_employee-emp_name = 'Ravi'.
APPEND ls_employee TO lt_employee.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              Notice that we reuse ls_employee for the second employee.
              APPEND copies its current contents into the table, so
              changing the work area afterwards does not overwrite
              the previously appended row.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              7. Reading a Record Using READ TABLE
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              READ TABLE searches an internal table and can copy the
              matching row into a work area.
            </p>

            <CodeExample
              title="READ TABLE example"
              description="Find the employee with ID 102."
              code={`READ TABLE lt_employee
  INTO ls_employee
  WITH KEY emp_id = 102.

IF sy-subrc = 0.

  WRITE: / 'Employee Found'.
  WRITE: / ls_employee-emp_name.

ELSE.

  WRITE: / 'Employee Not Found'.

ENDIF.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              sy-subrc is a system field that indicates the result of
              the READ TABLE operation. A value of 0 means the record
              was found. A non-zero value means it was not found.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              8. Processing Records Using LOOP AT
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              LOOP AT processes each row of the internal table and
              copies the current row into the work area.
            </p>

            <CodeExample
              title="LOOP AT with a work area"
              description="Display every employee record."
              code={`LOOP AT lt_employee INTO ls_employee.

  WRITE: / 'Employee ID:', ls_employee-emp_id.
  WRITE: / 'Employee Name:', ls_employee-emp_name.

ENDLOOP.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              During each iteration, ls_employee receives the current
              row from lt_employee. This lets us process one employee
              at a time.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              9. Complete Practical Program
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Let's combine the concepts and create an employee program
              that inserts records, searches for one employee, and
              displays all employees.
            </p>

            <CodeExample
              title="Complete work area program"
              description="Declare, insert, search, and display employee records."
              code={`REPORT Z_WORK_AREA_DEMO.

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

"Search employee with ID 102
READ TABLE lt_employee
  INTO ls_employee
  WITH KEY emp_id = 102.

IF sy-subrc = 0.
  WRITE: / 'Employee Found:', ls_employee-emp_name.
ENDIF.

"Display all employees
LOOP AT lt_employee INTO ls_employee.

  WRITE: / 'ID:', ls_employee-emp_id.
  WRITE: / 'Name:', ls_employee-emp_name.
  WRITE: / 'City:', ls_employee-city.

ENDLOOP.`}
            />
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              10. Important Points to Remember
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["Work area", "Temporarily holds one row of data."],
                ["ls_employee", "Example name for an employee work area."],
                ["lt_employee", "Example name for an employee internal table."],
                ["APPEND", "Copies a work area's current contents into a table row."],
                ["READ TABLE", "Searches for a row in an internal table."],
                ["LOOP AT", "Processes table rows one at a time."],
                ["sy-subrc", "Checks whether an operation succeeded."],
                ["Structure-field", "Accesses a field using a hyphen."],
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
              href="/courses/abap/lessons/introduction-to-internal-tables"
              className="rounded-xl border border-slate-700 px-5 py-3 text-center text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              ← Previous Lesson
            </Link>
            <Link
              href="/courses/abap/lessons/append-and-insert"
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
