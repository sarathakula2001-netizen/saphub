
"use client";

import { useState } from "react";

const questions = [
  {
    question:
      "How many main layers are in the commonly taught three-tier SAP architecture?",
    options: ["Two", "Three", "Four", "Five"],
    answer: 1,
    explanation:
      "The three-tier architecture consists of the presentation, application, and database layers.",
  },
  {
    question:
      "Which layer provides the user interface in an SAP system?",
    options: [
      "Database Layer",
      "Application Layer",
      "Presentation Layer",
      "Storage Layer",
    ],
    answer: 2,
    explanation:
      "The presentation layer provides the interface through which users interact with the SAP system.",
  },
  {
    question:
      "Where do ABAP programs generally execute in an ABAP-based SAP system?",
    options: [
      "Presentation Layer",
      "Application Layer",
      "Database Layer",
      "Network Layer",
    ],
    answer: 1,
    explanation:
      "ABAP application logic generally executes in the application layer.",
  },
  {
    question:
      "What is the primary responsibility of the database layer?",
    options: [
      "Display user screens",
      "Accept user input",
      "Execute user interface commands",
      "Store and manage business information",
    ],
    answer: 3,
    explanation:
      "The database layer stores and manages business information used by SAP applications.",
  },
  {
    question: "Which layer processes business logic?",
    options: [
      "Application Layer",
      "Presentation Layer",
      "Database Layer",
      "Display Layer",
    ],
    answer: 0,
    explanation:
      "The application layer executes application logic and processes business requests.",
  },
];

export default function KnowledgeCheck() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});

  const handleAnswer = (
    questionIndex: number,
    optionIndex: number
  ) => {
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
                  {selectedAnswer === question.answer
                    ? "Correct"
                    : "Incorrect"}
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
                    onClick={() =>
                      handleAnswer(questionIndex, optionIndex)
                    }
                    className={`flex w-full items-center justify-between gap-3 rounded-xl border p-4 text-left text-sm transition ${optionStyle}`}
                  >
                    <span>
                      <span className="mr-3 font-bold opacity-60">
                        {String.fromCharCode(65 + optionIndex)}.
                      </span>
                      {option}
                    </span>

                    {isSubmitted && isCorrect && (
                      <span className="shrink-0 text-green-400">
                        ✓
                      </span>
                    )}

                    {isSubmitted && isSelected && !isCorrect && (
                      <span className="shrink-0 text-red-400">
                        ✕
                      </span>
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

      {/* Quiz Score */}
      <div className="rounded-xl border border-blue-400/20 bg-blue-400/[0.05] p-5">
        <p className="font-semibold text-blue-300">
          Your Quiz Score
        </p>

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
