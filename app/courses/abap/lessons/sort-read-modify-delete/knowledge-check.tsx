
"use client";

import { useState } from "react";

const questions = [
  {
    question: "Which statement sorts an internal table?",
    options: ["READ TABLE", "SORT", "MODIFY", "DELETE"],
    answer: 1,
    explanation:
      "SORT arranges internal table records according to the selected fields.",
  },
  {
    question: "What is the default sorting order in ABAP?",
    options: [
      "Descending",
      "Random",
      "Ascending",
      "Alphabetical only",
    ],
    answer: 2,
    explanation:
      "SORT uses ascending order by default unless another direction is specified.",
  },
  {
    question: "Which statement searches for a record in an internal table?",
    options: ["APPEND", "READ TABLE", "CLEAR", "WRITE"],
    answer: 1,
    explanation:
      "READ TABLE searches for a matching row and can copy it into a work area.",
  },
  {
    question: "Which statement updates an existing internal table record?",
    options: ["MODIFY", "DELETE", "SORT", "APPEND"],
    answer: 0,
    explanation:
      "MODIFY changes an existing record in an internal table.",
  },
  {
    question: "What does DELETE lt_employee INDEX 2 do?",
    options: [
      "Deletes the first row",
      "Deletes the second row",
      "Deletes all rows",
      "Sorts the second row",
    ],
    answer: 1,
    explanation:
      "DELETE with INDEX 2 removes the row at the second position from an index-based internal table.",
  },
];

export default function KnowledgeCheck() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = questions.reduce(
    (total, question, index) =>
      total + (answers[index] === question.answer ? 1 : 0),
    0
  );

  function selectAnswer(questionIndex: number, optionIndex: number) {
    if (submitted) return;

    setAnswers((previous) => ({
      ...previous,
      [questionIndex]: optionIndex,
    }));
  }

  function restartQuiz() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5 sm:p-7">
      <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
        Test your knowledge
      </p>

      <h2 className="mt-2 text-2xl font-bold text-white">
        Lesson 24 Knowledge Check
      </h2>

      <p className="mt-2 text-sm text-slate-400">
        Answer all five questions to check your understanding.
      </p>

      <div className="mt-7 space-y-7">
        {questions.map((question, questionIndex) => (
          <div
            key={questionIndex}
            className="border-b border-slate-700 pb-6 last:border-0"
          >
            <p className="font-semibold leading-7 text-white">
              {questionIndex + 1}. {question.question}
            </p>

            <div className="mt-4 space-y-3">
              {question.options.map((option, optionIndex) => {
                const selected = answers[questionIndex] === optionIndex;
                const correct = question.answer === optionIndex;

                let optionStyle =
                  "border-slate-700 bg-slate-800/60 text-slate-300 hover:border-blue-500";

                if (submitted && correct) {
                  optionStyle =
                    "border-green-500 bg-green-500/10 text-green-300";
                } else if (submitted && selected && !correct) {
                  optionStyle =
                    "border-red-500 bg-red-500/10 text-red-300";
                } else if (selected) {
                  optionStyle =
                    "border-blue-500 bg-blue-500/10 text-blue-300";
                }

                return (
                  <button
                    key={optionIndex}
                    type="button"
                    disabled={submitted}
                    onClick={() => selectAnswer(questionIndex, optionIndex)}
                    className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left text-sm transition ${optionStyle}`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {submitted && (
              <div className="mt-4 rounded-lg bg-slate-800 p-4">
                <p
                  className={`text-sm font-semibold ${
                    answers[questionIndex] === question.answer
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {answers[questionIndex] === question.answer
                    ? "Correct answer!"
                    : "Incorrect answer"}
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {question.explanation}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(answers).length !== questions.length}
          className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Submit Answers
        </button>
      ) : (
        <div className="mt-6 rounded-xl border border-slate-700 bg-slate-800/70 p-5 text-center">
          <p className="text-sm text-slate-400">Your final score</p>

          <p className="mt-2 text-4xl font-bold text-white">
            {score}/{questions.length}
          </p>

          <p className="mt-2 text-sm text-slate-300">
            {score === 5
              ? "Excellent! You understood this lesson."
              : score >= 3
                ? "Good work! Review the explanations for improvement."
                : "Keep practising. Review the lesson and try again."}
          </p>

          <button
            type="button"
            onClick={restartQuiz}
            className="mt-5 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}
