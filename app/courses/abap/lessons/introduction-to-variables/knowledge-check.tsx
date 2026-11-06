
"use client";

import { useState } from "react";

const questions = [
  {
    question: "What is a variable in ABAP?",
    options: [
      "A database table",
      "A named memory location used to store information",
      "A transaction code",
      "An SAP module",
    ],
    answer: 1,
    explanation:
      "A variable is a named memory location that stores information while a program is running.",
  },
  {
    question: "Which keyword is used to declare a variable in ABAP?",
    options: ["WRITE", "REPORT", "DATA", "TYPE"],
    answer: 2,
    explanation:
      "DATA is used to declare variables in ABAP.",
  },
  {
    question: "Which data type is used to store whole numbers?",
    options: ["STRING", "I", "D", "T"],
    answer: 1,
    explanation:
      "TYPE I represents an integer and is used to store whole numbers.",
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    options: ["+", "=", ">", "<"],
    answer: 1,
    explanation:
      "The equals sign (=) is used to assign a value to a variable.",
  },
  {
    question: "Which statement displays output in an ABAP program?",
    options: ["DATA", "TYPE", "REPORT", "WRITE"],
    answer: 3,
    explanation:
      "WRITE displays information in the ABAP output screen.",
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
    <div className="rounded-2xl border border-white/10 bg-[#111c30] p-5 sm:p-7">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white">
            Check your understanding
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            5 questions · Choose one answer for each question
          </p>
        </div>

        <span className="rounded-full bg-blue-500/10 px-3 py-1.5 text-sm font-semibold text-blue-300">
          {Object.keys(answers).length}/5 answered
        </span>
      </div>

      <div className="space-y-7">
        {questions.map((question, questionIndex) => {
          const selectedAnswer = answers[questionIndex];
          const isCorrect = selectedAnswer === question.answer;

          return (
            <div
              key={questionIndex}
              className="border-b border-white/10 pb-6 last:border-0 last:pb-0"
            >
              <p className="mb-4 font-semibold leading-7 text-white">
                <span className="mr-2 text-blue-400">
                  Q{questionIndex + 1}.
                </span>
                {question.question}
              </p>

              <div className="space-y-3">
                {question.options.map((option, optionIndex) => {
                  const isSelected = selectedAnswer === optionIndex;
                  const isRightAnswer = question.answer === optionIndex;

                  let optionStyle =
                    "border-white/10 bg-[#0b1120] text-slate-300 hover:border-blue-400/50";

                  if (submitted && isRightAnswer) {
                    optionStyle =
                      "border-green-500/50 bg-green-500/10 text-green-300";
                  } else if (submitted && isSelected && !isCorrect) {
                    optionStyle =
                      "border-red-500/50 bg-red-500/10 text-red-300";
                  } else if (!submitted && isSelected) {
                    optionStyle =
                      "border-blue-500 bg-blue-500/10 text-blue-300";
                  }

                  return (
                    <button
                      key={optionIndex}
                      type="button"
                      onClick={() =>
                        selectAnswer(questionIndex, optionIndex)
                      }
                      disabled={submitted}
                      className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left text-sm transition ${optionStyle} ${
                        submitted ? "cursor-default" : "cursor-pointer"
                      }`}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current text-xs font-semibold">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>

                      <span className="flex-1">{option}</span>

                      {submitted && isRightAnswer && (
                        <span className="font-bold">✓</span>
                      )}

                      {submitted && isSelected && !isCorrect && (
                        <span className="font-bold">✕</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div
                  className={`mt-4 rounded-xl p-4 ${
                    isCorrect
                      ? "border border-green-500/20 bg-green-500/5"
                      : "border border-red-500/20 bg-red-500/5"
                  }`}
                >
                  <p
                    className={`text-sm font-semibold ${
                      isCorrect ? "text-green-300" : "text-red-300"
                    }`}
                  >
                    {isCorrect ? "Correct answer!" : "Not quite. Review this:"}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {question.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(answers).length !== questions.length}
          className="mt-7 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Submit Answers
        </button>
      ) : (
        <div className="mt-7 rounded-xl border border-blue-400/20 bg-blue-400/5 p-5 text-center">
          <p className="text-sm text-slate-400">Your final score</p>

          <p className="mt-2 text-4xl font-bold text-white">
            {score}/5
          </p>

          <p className="mt-2 text-sm text-slate-300">
            {score === 5
              ? "Excellent! You understood this lesson very well."
              : score >= 3
                ? "Good work! Review the explanations to improve."
                : "Keep practising. Review the lesson and try again."}
          </p>

          <button
            type="button"
            onClick={restartQuiz}
            className="mt-5 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}
