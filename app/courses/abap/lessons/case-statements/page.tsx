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

export default function CaseStatementsLesson() {
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
              LESSON 15 · CONDITIONAL STATEMENTS
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">
              CASE Statements in SAP ABAP
            </h1>
            {/* Bookmark Button */}
            <div className="mt-6">
              <BookmarkButton
                lessonSlug="case-statements"
                lessonTitle="CASE Statements in SAP ABAP"
                courseName="SAP ABAP"
              />
            </div>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              Learn how to select and execute different blocks of code based
              on the value of a variable.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              1. What is a CASE Statement?
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              CASE is a conditional statement in ABAP. It checks the value
              of an expression and executes the matching WHEN block.
            </p>
            <p className="mt-3 leading-8 text-slate-400">
              For example, imagine a program that displays a department name
              based on a department code. CASE makes this type of decision
              easier to read.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              2. CASE Statement Syntax
            </h2>
            <CodeExample
              title="Basic CASE syntax"
              description="General structure of a CASE statement."
              code={`CASE variable_name.

  WHEN value_1.
    " Statements for value 1

  WHEN value_2.
    " Statements for value 2

  WHEN value_3.
    " Statements for value 3

  WHEN OTHERS.
    " Default statements

ENDCASE.`}
            />

            <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-5">
              <p className="font-semibold text-blue-300">Understand the keywords</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                <li><strong>CASE</strong> – Starts the selection structure.</li>
                <li><strong>WHEN</strong> – Specifies a value to match.</li>
                <li><strong>WHEN OTHERS</strong> – Handles values not matched by earlier WHEN branches.</li>
                <li><strong>ENDCASE</strong> – Ends the CASE structure.</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              3. Simple CASE Example
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Let's check a student's grade and display a message.
            </p>

            <CodeExample
              title="Grade display"
              description="Select a message based on the grade."
              code={`REPORT Z_CASE_EXAMPLE.

DATA lv_grade TYPE c LENGTH 1.

lv_grade = 'A'.

CASE lv_grade.
  WHEN 'A'.
    WRITE: / 'Excellent'.
  WHEN 'B'.
    WRITE: / 'Very Good'.
  WHEN 'C'.
    WRITE: / 'Good'.
  WHEN 'D'.
    WRITE: / 'Needs Improvement'.
  WHEN OTHERS.
    WRITE: / 'Invalid Grade'.
ENDCASE.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              Since lv_grade contains A, the program displays Excellent.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              4. Understanding WHEN OTHERS
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              WHEN OTHERS is the default branch. It executes when none of
              the specified WHEN values matches the CASE expression.
            </p>

            <CodeExample
              title="Department selection"
              description="Display a department name or an unknown department message."
              code={`REPORT Z_CASE_DEPARTMENT.

DATA lv_dept TYPE c LENGTH 1.

lv_dept = 'X'.

CASE lv_dept.
  WHEN 'A'.
    WRITE: / 'Human Resources'.
  WHEN 'B'.
    WRITE: / 'Finance'.
  WHEN 'C'.
    WRITE: / 'Information Technology'.
  WHEN OTHERS.
    WRITE: / 'Unknown Department'.
ENDCASE.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              The value X does not match A, B or C, so WHEN OTHERS executes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              5. Multiple Values in a WHEN Branch
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              You can use OR in a WHEN branch to match more than one value.
              This is useful when several values should produce the same result.
            </p>

            <CodeExample
              title="Multiple matching values"
              description="Group several department codes into one branch."
              code={`REPORT Z_CASE_MULTIPLE.

DATA lv_dept TYPE c LENGTH 1.

lv_dept = 'B'.

CASE lv_dept.
  WHEN 'A' OR 'B'.
    WRITE: / 'Business Department'.
  WHEN 'C'.
    WRITE: / 'Technical Department'.
  WHEN OTHERS.
    WRITE: / 'Other Department'.
ENDCASE.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              Both A and B display Business Department. Each WHEN branch
              can contain multiple values separated by OR.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              6. CASE vs IF...ELSE
            </h2>

            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-700">
              <table className="w-full min-w-[500px] text-left text-sm">
                <thead className="bg-slate-800 text-slate-200">
                  <tr>
                    <th className="p-4">CASE</th>
                    <th className="p-4">IF...ELSE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-400">
                  <tr>
                    <td className="p-4">Matches values of an expression.</td>
                    <td className="p-4">Checks logical conditions.</td>
                  </tr>
                  <tr>
                    <td className="p-4">Uses WHEN branches.</td>
                    <td className="p-4">Uses ELSEIF and ELSE branches.</td>
                  </tr>
                  <tr>
                    <td className="p-4">Useful for fixed choices.</td>
                    <td className="p-4">Useful for ranges and complex conditions.</td>
                  </tr>
                  <tr>
                    <td className="p-4">Ends with ENDCASE.</td>
                    <td className="p-4">Ends with ENDIF.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              7. Practical Example – Menu Selection
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Let's create a simple menu program that responds to a
              selected option.
            </p>

            <CodeExample
              title="Menu selection program"
              description="Read the option from the report selection screen."
              code={`REPORT Z_MENU_SELECTION.

PARAMETERS p_choice TYPE c LENGTH 1.

CASE p_choice.
  WHEN '1'.
    WRITE: / 'You selected ABAP'.
  WHEN '2'.
    WRITE: / 'You selected HANA'.
  WHEN '3'.
    WRITE: / 'You selected Fiori'.
  WHEN OTHERS.
    WRITE: / 'Invalid Selection'.
ENDCASE.`}
            />

            <div className="mt-5 rounded-xl border border-slate-700 bg-slate-900/70 p-5">
              <h3 className="font-semibold text-white">Try these inputs</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-400">
                <li>1 → You selected ABAP</li>
                <li>2 → You selected HANA</li>
                <li>3 → You selected Fiori</li>
                <li>4 → Invalid Selection</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              8. Important Points to Remember
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["CASE", "Starts the selection structure."],
                ["WHEN", "Defines a value to match."],
                ["WHEN OTHERS", "Provides a default branch."],
                ["ENDCASE", "Closes the CASE structure."],
                ["Multiple values", "OR can group values in a WHEN branch."],
                ["Best use", "Choose CASE for fixed-value alternatives."],
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
              href="/courses/abap/lessons/elseif-statements"
              className="rounded-xl border border-slate-700 px-5 py-3 text-center text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              ← Previous Lesson
            </Link>
            <Link
              href="/courses/abap/lessons/practical-exercises"
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
