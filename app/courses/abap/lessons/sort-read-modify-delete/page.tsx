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

export default function SortReadModifyDeleteLesson() {
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
              LESSON 24 · INTERNAL TABLES
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">
              SORT, READ, MODIFY and DELETE
            </h1>
            {/* Bookmark Button */}
            <div className="mt-6">
              <BookmarkButton
                lessonSlug="sort-read-modify-delete"
                lessonTitle="SORT, READ, MODIFY and DELETE"
                courseName="SAP ABAP"
              />
            </div>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              Learn how to manage internal table records using four
              essential ABAP statements.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              1. Introduction
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              In the previous lessons, you learned how to create internal
              tables, declare work areas, and add records using APPEND
              and INSERT.
            </p>
            <p className="mt-4 leading-8 text-slate-400">
              Now we will learn how to organize, search, update, and
              delete records from an internal table.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ["SORT", "Arrange internal table records in a particular order."],
                ["READ TABLE", "Search for a particular record."],
                ["MODIFY", "Change an existing record."],
                ["DELETE", "Remove records from an internal table."],
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
              2. SORT Statement
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              SORT is used to arrange the records of an internal table
              based on one or more fields.
            </p>

            <CodeExample
              title="Basic SORT syntax"
              description="Sort an internal table by employee ID."
              code={`SORT lt_employee BY emp_id.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              By default, the records are sorted in ascending order.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              3. Ascending and Descending Order
            </h2>

            <CodeExample
              title="Ascending order"
              description="Arrange employee IDs from smallest to largest."
              code={`SORT lt_employee BY emp_id ASCENDING.`}
            />

            <CodeExample
              title="Descending order"
              description="Arrange employee IDs from largest to smallest."
              code={`SORT lt_employee BY emp_id DESCENDING.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              You can also sort using multiple fields. For example:
            </p>

            <CodeExample
              title="Sort using multiple fields"
              description="Sort by city, then by employee ID."
              code={`SORT lt_employee BY city ASCENDING
                     emp_id DESCENDING.`}
            />
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              4. READ TABLE Statement
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              READ TABLE searches an internal table for a record.
              If a matching record is found, it can copy that record
              into a work area.
            </p>

            <CodeExample
              title="READ TABLE syntax"
              description="Search by employee ID."
              code={`READ TABLE lt_employee
  INTO ls_employee
  WITH KEY emp_id = 101.

IF sy-subrc = 0.
  WRITE: / ls_employee-emp_name.
ELSE.
  WRITE: / 'Employee not found'.
ENDIF.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              sy-subrc = 0 means the record was found. A non-zero
              value means no matching record was found.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              5. MODIFY Statement
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              MODIFY is used to change existing records in an internal
              table. One common approach is to read a record into a
              work area, change its fields, and update the corresponding
              table row.
            </p>

            <CodeExample
              title="MODIFY using an index"
              description="Update the employee name at index 1."
              code={`READ TABLE lt_employee
  INTO ls_employee
  WITH KEY emp_id = 101.

IF sy-subrc = 0.

  ls_employee-emp_name = 'Sarath Kumar'.

  MODIFY lt_employee
    FROM ls_employee
    INDEX sy-tabix.

ENDIF.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              sy-tabix contains the index of the row found by READ TABLE
              for an index-based standard table. We use it to update
              that same row.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              6. DELETE Statement
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              DELETE removes records from an internal table. You can
              delete a row by its index or remove rows that match
              a condition.
            </p>

            <CodeExample
              title="Delete by index"
              description="Remove the second row from a standard table."
              code={`DELETE lt_employee INDEX 2.`}
            />

            <CodeExample
              title="Delete using a condition"
              description="Remove employees whose city is Chennai."
              code={`DELETE lt_employee
  WHERE city = 'Chennai'.`}
            />

            <CodeExample
              title="Delete all records"
              description="Remove every row from the internal table."
              code={`CLEAR lt_employee.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              CLEAR empties the internal table. It is different from
              deleting one selected row.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              7. Understanding sy-subrc and sy-tabix
            </h2>
            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-700">
              <table className="w-full min-w-[430px] text-left text-sm">
                <thead className="bg-slate-800 text-slate-200">
                  <tr>
                    <th className="p-4">System field</th>
                    <th className="p-4">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-400">
                  <tr>
                    <td className="p-4 font-semibold text-blue-300">sy-subrc</td>
                    <td className="p-4">Indicates the result of an ABAP operation.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-blue-300">sy-tabix</td>
                    <td className="p-4">Holds the current row index for index-based table processing.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4 leading-8 text-slate-400">
              Remember: sy-tabix is meaningful for index-based tables.
              Hashed tables do not support index-based access.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              8. Complete Practical Program
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Let's combine everything into an employee management
              example. We will add records, sort them, search for
              an employee, update the record, delete a record, and
              display the final table.
            </p>

            <CodeExample
              title="Employee internal table management"
              description="Practise SORT, READ TABLE, MODIFY, DELETE and LOOP AT."
              code={`REPORT Z_EMPLOYEE_MANAGEMENT.

TYPES: BEGIN OF ty_employee,
         emp_id TYPE i,
         emp_name TYPE string,
         city TYPE string,
       END OF ty_employee.

DATA: lt_employee TYPE STANDARD TABLE OF ty_employee
                  WITH EMPTY KEY,
      ls_employee TYPE ty_employee.

"Add first employee
ls_employee-emp_id = 103.
ls_employee-emp_name = 'Kumar'.
ls_employee-city = 'Hyderabad'.
APPEND ls_employee TO lt_employee.

"Add second employee
ls_employee-emp_id = 101.
ls_employee-emp_name = 'Sarath'.
ls_employee-city = 'Bangalore'.
APPEND ls_employee TO lt_employee.

"Add third employee
ls_employee-emp_id = 102.
ls_employee-emp_name = 'Ravi'.
ls_employee-city = 'Chennai'.
APPEND ls_employee TO lt_employee.

"Sort employees by ID
SORT lt_employee BY emp_id ASCENDING.

"Search for employee 101
READ TABLE lt_employee
  INTO ls_employee
  WITH KEY emp_id = 101.

IF sy-subrc = 0.

  "Update employee name
  ls_employee-emp_name = 'Sarath Kumar'.

  MODIFY lt_employee
    FROM ls_employee
    INDEX sy-tabix.

ENDIF.

"Delete employee 102
DELETE lt_employee
  WHERE emp_id = 102.

"Display final records
WRITE: / 'FINAL EMPLOYEE DETAILS'.
WRITE: / '-------------------------'.

LOOP AT lt_employee INTO ls_employee.

  WRITE: / 'Employee ID:', ls_employee-emp_id.
  WRITE: / 'Employee Name:', ls_employee-emp_name.
  WRITE: / 'City:', ls_employee-city.

ENDLOOP.`}
            />
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              9. Important Points to Remember
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["SORT", "Arranges internal table records."],
                ["ASCENDING", "Sorts from smallest to largest."],
                ["DESCENDING", "Sorts from largest to smallest."],
                ["READ TABLE", "Searches for a record."],
                ["MODIFY", "Updates an existing record."],
                ["DELETE", "Removes selected records."],
                ["sy-subrc", "Checks an operation's result."],
                ["sy-tabix", "Provides an index for index-based table processing."],
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
              href="/courses/abap/lessons/append-and-insert"
              className="rounded-xl border border-slate-700 px-5 py-3 text-center text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              ← Previous Lesson
            </Link>
            <Link
              href="/courses/abap"
              className="rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Complete ABAP Course →
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
