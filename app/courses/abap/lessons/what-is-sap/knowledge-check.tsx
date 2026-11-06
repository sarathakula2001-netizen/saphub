
"use client";

import { useState } from "react";

const questions = [
  {
    question: "What does SAP stand for?",
    options: [
      "System Application Process",
      "Systems, Applications, and Products in Data Processing",
      "Software Application Programming",
      "System Analysis Program",
    ],
    answer: 1,
    explanation:
      "SAP stands for Systems, Applications, and Products in Data Processing.",
  },
  {
    question: "What is the primary purpose of SAP ERP?",
    options: [
      "Only to create websites",
      "Only to write programming code",
      "To integrate and manage business processes",
      "Only to design mobile applications",
    ],
    answer: 2,
    explanation:
      "ERP integrates business functions such as finance, sales, purchasing, inventory, and production into a connected system.",
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

  const score = questions.filter(
    (question, index) => answers[index] === question.answer
  ).length;

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
            <h3 className="font-semibold leading-7">
              {questionIndex + 1}. {question.question}
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
                      : "Incorrect! Please review the explanation."}
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
          Your score updates as you answer each question.
        </p>
      </div>
    </div>
  );
}
