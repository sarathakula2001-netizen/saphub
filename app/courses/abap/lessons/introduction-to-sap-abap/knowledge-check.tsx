
"use client";

import { useState } from "react";

const questions = [
  {
    question: "What does ABAP stand for?",
    options: [
      "Advanced Business Application Programming",
      "Automated Business Application Process",
      "Advanced Basic Application Program",
      "Application Business Access Protocol",
    ],
    answer: 0,
    explanation:
      "ABAP stands for Advanced Business Application Programming. It is a programming language used in SAP environments.",
  },
  {
    question: "What is the primary purpose of ABAP?",
    options: [
      "To design computer hardware",
      "To develop and extend SAP applications",
      "To create operating systems",
      "To manage computer networks",
    ],
    answer: 1,
    explanation:
      "ABAP is used to develop business applications, reports, and custom functionality in SAP systems.",
  },
  {
    question: "Which statement declares an executable ABAP report?",
    options: [
      "START PROGRAM",
      "CREATE REPORT",
      "REPORT",
      "BEGIN REPORT",
    ],
    answer: 2,
    explanation:
      "The REPORT statement identifies an executable ABAP report program.",
  },
  {
    question: "Which ABAP statement is used to display output?",
    options: [
      "DISPLAY",
      "PRINT",
      "SHOW",
      "WRITE",
    ],
    answer: 3,
    explanation:
      "The WRITE statement displays output in an ABAP list.",
  },
  {
    question: "What is SAP GUI?",
    options: [
      "A database",
      "A user interface for accessing SAP systems",
      "A programming language",
      "An operating system",
    ],
    answer: 1,
    explanation:
      "SAP GUI provides a user interface through which users access SAP systems and transactions.",
  },
];

export default function KnowledgeCheck() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});

  const handleAnswer = (questionIndex: number, optionIndex: number) => {
    if (submitted[questionIndex]) return;

    setAnswers((previous) => ({
      ...previous,
      [questionIndex]: optionIndex,
    }));

    setSubmitted((previous) => ({
      ...previous,
      [questionIndex]: true,
    }));
  };

  const resetQuestion = (questionIndex: number) => {
    setAnswers((previous) => {
      const updated = { ...previous };
      delete updated[questionIndex];
      return updated;
    });

    setSubmitted((previous) => {
      const updated = { ...previous };
      delete updated[questionIndex];
      return updated;
    });
  };

  const resetQuiz = () => {
    setAnswers({});
    setSubmitted({});
  };

  const score = questions.filter(
    (question, index) => answers[index] === question.answer
  ).length;

  const answeredCount = Object.keys(submitted).length;

  return (
    <div className="mt-6 space-y-6">
      {questions.map((question, questionIndex) => {
        const selectedAnswer = answers[questionIndex];
        const isSubmitted = submitted[questionIndex];

        return (
          <div
            key={questionIndex}
            className="rounded-2xl border border-white/10 bg-[#111c30] p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-blue-400">
                QUESTION {questionIndex + 1} OF {questions.length}
              </span>

              {isSubmitted && (
                <span
                  className={
                    selectedAnswer === question.answer
                      ? "text-xs font-semibold text-green-400"
                      : "text-xs font-semibold text-red-400"
                  }
                >
                  {selectedAnswer === question.answer ? "Correct" : "Incorrect"}
                </span>
              )}
            </div>

            <h3 className="mt-4 font-semibold leading-7">
              {question.question}
            </h3>

            <div className="mt-5 space-y-3">
              {question.options.map((option, optionIndex) => {
                const isCorrect = optionIndex === question.answer;
                const isSelected = selectedAnswer === optionIndex;

                let optionStyle =
                  "border-white/10 bg-white/[0.02] text-slate-300 hover:border-blue-400/50 hover:bg-blue-400/[0.05]";

                if (isSubmitted && isCorrect) {
                  optionStyle =
                    "border-green-500 bg-green-500/10 text-green-300";
                } else if (isSubmitted && isSelected && !isCorrect) {
                  optionStyle =
                    "border-red-500 bg-red-500/10 text-red-300";
                }

                return (
                  <button
                    key={optionIndex}
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => handleAnswer(questionIndex, optionIndex)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl border p-4 text-left text-sm transition ${optionStyle}`}
                  >
                    <span>
                      <span className="mr-3 font-bold opacity-60">
                        {String.fromCharCode(65 + optionIndex)}.
                      </span>
                      {option}
                    </span>

                    {isSubmitted && isCorrect && (
                      <span className="shrink-0 text-green-400">✓</span>
                    )}

                    {isSubmitted && isSelected && !isCorrect && (
                      <span className="shrink-0 text-red-400">✕</span>
                    )}
                  </button>
                );
              })}
            </div>

            {isSubmitted && (
              <div className="mt-5 space-y-4">
                <div
                  className={`rounded-xl border p-4 ${
                    selectedAnswer === question.answer
                      ? "border-green-500/30 bg-green-500/10"
                      : "border-red-500/30 bg-red-500/10"
                  }`}
                >
                  <p
                    className={`font-semibold ${
                      selectedAnswer === question.answer
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {selectedAnswer === question.answer
                      ? "Correct! Well done."
                      : "Incorrect! Review the explanation."}
                  </p>

                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {question.explanation}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => resetQuestion(questionIndex)}
                  className="rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        );
      })}

      <div className="rounded-xl border border-blue-400/20 bg-blue-400/[0.05] p-5">
        <p className="font-semibold text-blue-300">Your Quiz Score</p>

        <p className="mt-2 text-2xl font-bold">
          {score} / {questions.length}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Questions answered: {answeredCount} / {questions.length}
        </p>

        {answeredCount === questions.length && (
          <p className="mt-3 text-sm font-semibold text-teal-300">
            Quiz completed! You scored {score} out of {questions.length}.
          </p>
        )}

        <button
          type="button"
          onClick={resetQuiz}
          className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold hover:bg-blue-500"
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
}
