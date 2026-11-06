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

export default function AppendInsertLesson() {
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
              LESSON 23 · INTERNAL TABLES
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">
              APPEND and INSERT in SAP ABAP
            </h1>
            {/* Bookmark Button */}
            <div className="mt-6">
              <BookmarkButton
                lessonSlug="append-and-insert"
                lessonTitle="APPEND and INSERT in SAP ABAP"
                courseName="SAP ABAP"
              />
            </div>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              Learn how to add records to internal tables using APPEND
              and INSERT statements.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              1. What Is APPEND?
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              APPEND is an ABAP statement used to add a new row at the
              end of an internal table. It is commonly used with standard
              internal tables.
            </p>

            <CodeExample
              title="APPEND syntax"
              description="Add the contents of a work area to an internal table."
              code={`APPEND ls_employee TO lt_employee.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              Here, ls_employee is the work area containing one record,
              and lt_employee is the internal table receiving that record.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              2. Adding Records Using APPEND
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Let's create an employee table and add three employee
              records using APPEND.
            </p>

            <CodeExample
              title="APPEND example"
              description="Add three employees to a standard internal table."
              code={`REPORT Z_APPEND_EXAMPLE.

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
              Each APPEND adds a copy of the current work area contents
              to the end of the internal table.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              3. What Is INSERT?
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              INSERT is another statement used to add rows to internal
              tables. With a standard table, you can insert a row at a
              specific index or use an appropriate key-based form.
            </p>

            <CodeExample
              title="INSERT syntax"
              description="Insert a work area at a particular table index."
              code={`INSERT ls_employee INTO lt_employee INDEX 2.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              INDEX 2 means the new row is inserted at the second
              position. Existing rows from that position onward
              move down by one position.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              4. INSERT at a Specific Index
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Let's understand how INSERT works with a standard
              internal table.
            </p>

            <CodeExample
              title="Insert at index 2"
              description="Insert Ravi between Sarath and Kumar."
              code={`REPORT Z_INSERT_INDEX.

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

ls_employee-emp_id = 103.
ls_employee-emp_name = 'Kumar'.
APPEND ls_employee TO lt_employee.

ls_employee-emp_id = 102.
ls_employee-emp_name = 'Ravi'.

INSERT ls_employee INTO lt_employee INDEX 2.

LOOP AT lt_employee INTO ls_employee.
  WRITE: / ls_employee-emp_id, ls_employee-emp_name.
ENDLOOP.`}
            />

            <p className="mt-4 text-sm font-semibold text-slate-300">
              Expected order
            </p>
            <pre className="mt-3 overflow-x-auto rounded-xl border border-slate-700 bg-[#0b1220] p-5 font-mono text-sm leading-7 text-emerald-300">
{`101  Sarath
102  Ravi
103  Kumar`}
            </pre>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              5. APPEND vs INSERT
            </h2>

            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-700">
              <table className="w-full min-w-[460px] text-left text-sm">
                <thead className="bg-slate-800 text-slate-200">
                  <tr>
                    <th className="p-4">APPEND</th>
                    <th className="p-4">INSERT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-400">
                  <tr>
                    <td className="p-4">Adds a row at the end of a standard table.</td>
                    <td className="p-4">Can add a row at a specified index in a standard table.</td>
                  </tr>
                  <tr>
                    <td className="p-4">Simple way to add rows sequentially.</td>
                    <td className="p-4">Useful when placement or key-based insertion matters.</td>
                  </tr>
                  <tr>
                    <td className="p-4">Commonly used with standard tables.</td>
                    <td className="p-4">Can be used with standard, sorted, and hashed tables, subject to their key rules.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              6. INSERT into a Sorted Table
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              A sorted table automatically maintains rows in the order
              of its primary key. You insert a row without specifying
              an index, and ABAP places it according to that key.
            </p>

            <CodeExample
              title="INSERT into a sorted table"
              description="The table maintains ascending employee ID order."
              code={`REPORT Z_SORTED_INSERT.

TYPES: BEGIN OF ty_employee,
         emp_id TYPE i,
         emp_name TYPE string,
       END OF ty_employee.

DATA: lt_employee TYPE SORTED TABLE OF ty_employee
                  WITH UNIQUE KEY emp_id,
      ls_employee TYPE ty_employee.

ls_employee-emp_id = 103.
ls_employee-emp_name = 'Kumar'.
INSERT ls_employee INTO TABLE lt_employee.

ls_employee-emp_id = 101.
ls_employee-emp_name = 'Sarath'.
INSERT ls_employee INTO TABLE lt_employee.

ls_employee-emp_id = 102.
ls_employee-emp_name = 'Ravi'.
INSERT ls_employee INTO TABLE lt_employee.

LOOP AT lt_employee INTO ls_employee.
  WRITE: / ls_employee-emp_id, ls_employee-emp_name.
ENDLOOP.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              Even though the records were inserted in the order 103,
              101, and 102, the sorted table maintains them in ascending
              order of emp_id.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              7. Handling INSERT Results
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              When inserting into a sorted or hashed table with a unique
              key, a duplicate key can prevent the insertion. Check
              sy-subrc to determine whether the operation succeeded.
            </p>

            <CodeExample
              title="Check insertion result"
              description="Check whether an employee record was inserted."
              code={`INSERT ls_employee INTO TABLE lt_employee.

IF sy-subrc = 0.
  WRITE: / 'Record inserted successfully'.
ELSE.
  WRITE: / 'Record could not be inserted'.
ENDIF.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              A sy-subrc value of 0 indicates success. A non-zero value
              indicates that the insertion was not successful.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              8. Complete Practical Program
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              This example creates a standard internal table, adds two
              records using APPEND, inserts a third record at index 2,
              and displays the final records.
            </p>

            <CodeExample
              title="Complete APPEND and INSERT program"
              description="Practise both statements in one ABAP report."
              code={`REPORT Z_APPEND_INSERT_DEMO.

TYPES: BEGIN OF ty_employee,
         emp_id TYPE i,
         emp_name TYPE string,
       END OF ty_employee.

DATA: lt_employee TYPE STANDARD TABLE OF ty_employee
                  WITH EMPTY KEY,
      ls_employee TYPE ty_employee.

"First employee
ls_employee-emp_id = 101.
ls_employee-emp_name = 'Sarath'.
APPEND ls_employee TO lt_employee.

"Second employee
ls_employee-emp_id = 103.
ls_employee-emp_name = 'Kumar'.
APPEND ls_employee TO lt_employee.

"Insert Ravi at position 2
ls_employee-emp_id = 102.
ls_employee-emp_name = 'Ravi'.

INSERT ls_employee INTO lt_employee INDEX 2.

"Display all records
LOOP AT lt_employee INTO ls_employee.

  WRITE: / 'Employee ID:', ls_employee-emp_id.
  WRITE: / 'Employee Name:', ls_employee-emp_name.

ENDLOOP.`}
            />
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              9. Important Points to Remember
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["APPEND", "Adds a row at the end of a standard table."],
                ["INSERT", "Adds a row at an index or according to a table key."],
                ["INDEX", "Specifies a row position for index-based insertion."],
                ["Sorted table", "Maintains its primary key order automatically."],
                ["Hashed table", "Uses a unique primary key and does not support index-based access."],
                ["sy-subrc", "Helps check the result of an insertion."],
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
              href="/courses/abap/lessons/work-areas"
              className="rounded-xl border border-slate-700 px-5 py-3 text-center text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              ← Previous Lesson
            </Link>
            <Link
              href="/courses/abap/lessons/sort-read-modify-delete"
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
