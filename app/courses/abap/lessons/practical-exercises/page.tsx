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

export default function PracticalExercisesLesson() {
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
              LESSON 16 · PRACTICAL EXERCISES
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">
              Practical Exercises in SAP ABAP
            </h1>
            {/* Bookmark Button */}
            <div className="mt-6">
              <BookmarkButton
                lessonSlug="practical-exercises"
                lessonTitle="Practical Exercises in SAP ABAP"
                courseName="SAP ABAP"
              />
            </div>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              Apply your ABAP knowledge through practical programs.
              Understand how variables, data types, operators and
              conditional statements work together.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              1. Student Details Program
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Let's start with a simple program that stores and displays
              student information using variables.
            </p>

            <CodeExample
              title="Student information"
              description="Declare variables, assign values and display them."
              code={`REPORT Z_STUDENT_DETAILS.

DATA: lv_id TYPE i,
      lv_name TYPE string,
      lv_city TYPE string,
      lv_marks TYPE i.

lv_id = 101.
lv_name = 'SARATH'.
lv_city = 'BANGALORE'.
lv_marks = 85.

WRITE: / 'STUDENT DETAILS'.
WRITE: / '----------------------'.
WRITE: / 'Student ID:', lv_id.
WRITE: / 'Student Name:', lv_name.
WRITE: / 'City:', lv_city.
WRITE: / 'Marks:', lv_marks.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              This program demonstrates DATA declarations, assignments
              and WRITE statements.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              2. Employee Salary Calculation
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Suppose an employee receives a basic salary. We want to
              calculate the total salary by adding allowances.
            </p>

            <CodeExample
              title="Salary calculation"
              description="Use arithmetic operators to calculate gross salary."
              code={`REPORT Z_EMPLOYEE_SALARY.

DATA: lv_basic TYPE p LENGTH 8 DECIMALS 2,
      lv_hra TYPE p LENGTH 8 DECIMALS 2,
      lv_bonus TYPE p LENGTH 8 DECIMALS 2,
      lv_total TYPE p LENGTH 8 DECIMALS 2.

lv_basic = '30000.00'.
lv_hra = '5000.00'.
lv_bonus = '2000.00'.

lv_total = lv_basic + lv_hra + lv_bonus.

WRITE: / 'Basic Salary:', lv_basic.
WRITE: / 'HRA:', lv_hra.
WRITE: / 'Bonus:', lv_bonus.
WRITE: / 'Total Salary:', lv_total.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              Expected total salary: 37000.00. The exact number formatting
              can depend on your SAP user and system settings.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              3. Student Pass or Fail and Grade Calculation
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Now combine comparison operators and ELSEIF to determine
              whether a student passed and which grade they received.
            </p>

            <CodeExample
              title="Student result program"
              description="Check marks and assign a grade."
              code={`REPORT Z_STUDENT_RESULT.

DATA: lv_marks TYPE i,
      lv_grade TYPE c LENGTH 1.

lv_marks = 82.

IF lv_marks >= 90.
  lv_grade = 'A'.
ELSEIF lv_marks >= 75.
  lv_grade = 'B'.
ELSEIF lv_marks >= 50.
  lv_grade = 'C'.
ELSEIF lv_marks >= 35.
  lv_grade = 'D'.
ELSE.
  lv_grade = 'F'.
ENDIF.

WRITE: / 'Student Marks:', lv_marks.
WRITE: / 'Student Grade:', lv_grade.

IF lv_marks >= 35.
  WRITE: / 'Result: PASS'.
ELSE.
  WRITE: / 'Result: FAIL'.
ENDIF.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              With 82 marks, the student receives Grade B and passes.
              Notice how we use two separate IF structures for grade
              calculation and pass/fail checking.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              4. Electricity Bill Classification
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Use conditions to classify electricity consumption into
              different categories.
            </p>

            <CodeExample
              title="Electricity usage program"
              description="Use ELSEIF to classify consumed units."
              code={`REPORT Z_ELECTRICITY_BILL.

DATA lv_units TYPE i.

lv_units = 250.

IF lv_units <= 100.
  WRITE: / 'Low Consumption'.
ELSEIF lv_units <= 200.
  WRITE: / 'Medium Consumption'.
ELSEIF lv_units <= 300.
  WRITE: / 'High Consumption'.
ELSE.
  WRITE: / 'Very High Consumption'.
ENDIF.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              Since the units are 250, the output is High Consumption.
              This example classifies usage; it does not calculate an
              actual electricity tariff.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              5. Menu-Driven Program Using CASE
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              A menu-driven program lets a user choose an option.
              We can use CASE to handle the selected option.
            </p>

            <CodeExample
              title="SAP learning menu"
              description="Choose a technology using a selection-screen parameter."
              code={`REPORT Z_SAP_MENU.

PARAMETERS p_choice TYPE c LENGTH 1.

CASE p_choice.
  WHEN '1'.
    WRITE: / 'You selected SAP ABAP'.
  WHEN '2'.
    WRITE: / 'You selected SAP HANA'.
  WHEN '3'.
    WRITE: / 'You selected SAP Fiori'.
  WHEN OTHERS.
    WRITE: / 'Invalid Selection'.
ENDCASE.`}
            />

            <div className="mt-5 rounded-xl border border-slate-700 bg-slate-900/70 p-5">
              <h3 className="font-semibold text-white">Try these inputs</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-400">
                <li>1 → SAP ABAP</li>
                <li>2 → SAP HANA</li>
                <li>3 → SAP Fiori</li>
                <li>4 → Invalid Selection</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              6. Combined Practical Exercise
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              This final program combines variables, arithmetic operators,
              IF, ELSEIF and logical operators.
            </p>

            <CodeExample
              title="Employee eligibility program"
              description="Calculate an employee's salary and check bonus eligibility."
              code={`REPORT Z_EMPLOYEE_ELIGIBILITY.

DATA: lv_salary TYPE i,
      lv_experience TYPE i,
      lv_bonus TYPE i.

lv_salary = 35000.
lv_experience = 4.
lv_bonus = 0.

IF lv_salary >= 30000 AND lv_experience >= 3.
  lv_bonus = 5000.
ELSEIF lv_salary >= 20000 AND lv_experience >= 2.
  lv_bonus = 2000.
ELSE.
  lv_bonus = 0.
ENDIF.

WRITE: / 'Employee Salary:', lv_salary.
WRITE: / 'Experience:', lv_experience.
WRITE: / 'Eligible Bonus:', lv_bonus.

WRITE: / 'Total Compensation:', lv_salary + lv_bonus.`}
            />

            <p className="mt-4 leading-8 text-slate-400">
              Here, the employee meets the first condition, so the bonus
              is 5000. The total compensation is 40000.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              7. Practice These Exercises Yourself
            </h2>
            <div className="mt-5 space-y-4">
              {[
                {
                  title: "Exercise 1 – Employee Details",
                  description:
                    "Create variables for employee ID, name, department and salary. Display all details.",
                },
                {
                  title: "Exercise 2 – Even or Odd",
                  description:
                    "Take an integer and use MOD to check whether it is even or odd.",
                },
                {
                  title: "Exercise 3 – Largest Number",
                  description:
                    "Declare three integer variables and use IF and ELSEIF to find the largest number.",
                },
                {
                  title: "Exercise 4 – Simple Calculator",
                  description:
                    "Take two numbers and an operator. Use CASE to perform addition, subtraction, multiplication or division. Handle division by zero.",
                },
                {
                  title: "Exercise 5 – Student Result",
                  description:
                    "Take marks as input and display the grade and pass/fail result.",
                },
              ].map((exercise, index) => (
                <div
                  key={exercise.title}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
                >
                  <p className="font-semibold text-blue-400">
                    {exercise.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    {exercise.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white">
              8. Important Concepts You Have Practised
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["DATA", "Declare variables."],
                ["Data Types", "Choose the appropriate type."],
                ["CONSTANTS", "Store fixed values."],
                ["Operators", "Perform calculations and comparisons."],
                ["IF / ELSEIF", "Make decisions using conditions."],
                ["CASE", "Handle multiple fixed-value choices."],
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
              href="/courses/abap/lessons/case-statements"
              className="rounded-xl border border-slate-700 px-5 py-3 text-center text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              ← Previous Lesson
            </Link>
            <Link
              href="/courses/abap/lessons/do-loops"
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
