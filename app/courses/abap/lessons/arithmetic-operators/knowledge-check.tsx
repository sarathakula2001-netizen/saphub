
"use client";

import { useState } from "react";

const questions = [
  {
    question: "Which operator is used for addition in ABAP?",
    options: ["-", "+", "*", "/"],
    answer: "+",
    explanation: "The + operator adds two or more numeric values.",
  },
  {
    question: "What is the result of 100 - 40?",
    options: ["140", "50", "60", "40"],
    answer: "60",
    explanation: "100 minus 40 equals 60.",
  },
  {
    question: "Which operator is used for multiplication?",
    options: ["/", "-", "*", "+"],
    answer: "*",
    explanation: "The * operator multiplies numeric values.",
  },
  {
    question: "What is the result of 10 MOD 3?",
    options: ["3", "1", "0", "10"],
    answer: "1",
    explanation: "10 divided by 3 leaves a remainder of 1.",
  },
  {
    question: "What should you check before performing division?",
    options: [
      "Check whether the divisor is zero",
      "Check the variable name",
      "Check the program title",
      "Check the WRITE statement",
    ],
    answer: "Check whether the divisor is zero",
    explanation:
      "A zero divisor can cause a runtime error. Check it before dividing.",
  },
];

export default function KnowledgeCheck() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = questions.reduce(
    (total, question, index) =>
      total + (answers[index] === question.answer ? 1 : 0),
    0
  );

  function restartQuiz() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <section className="mt-12 rounded-2xl border border-white/10 bg-[#111C30] p-6">
      <p className="text-sm font-medium text-blue-400">
        TEST YOUR KNOWLEDGE
      </p>

      <h2 className="mt-2 text-2xl font-bold text-white">
        Lesson 9 Knowledge Check
      </h2>

      <p className="mt-2 text-sm text-slate-400">
        Answer all five questions to check your understanding.
      </p>

      <div className="mt-8 space-y-8">
        {questions.map((question, index) => {
          const selected = answers[index];
          const isCorrect = selected === question.answer;

          return (
            <div key={index}>
              <h3 className="font-semibold text-white">
                {index + 1}. {question.question}
              </h3>

              <div className="mt-4 grid gap-3">
                {question.options.map((option, optionIndex) => {
                  const isSelected = selected === option;
                  const isAnswer = question.answer === option;

                  let style =
                    "border-white/10 bg-white/5 hover:bg-white/10";

                  if (submitted && isAnswer) {
                    style =
                      "border-green-500 bg-green-500/10 text-green-300";
                  } else if (submitted && isSelected && !isCorrect) {
                    style =
                      "border-red-500 bg-red-500/10 text-red-300";
                  } else if (isSelected) {
                    style =
                      "border-blue-500 bg-blue-500/10 text-blue-300";
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={submitted}
                      onClick={() =>
                        setAnswers((previous) => ({
                          ...previous,
                          [index]: option,
                        }))
                      }
                      className={`w-full rounded-xl border p-4 text-left text-sm transition ${style} ${
                        submitted ? "cursor-default" : "cursor-pointer"
                      }`}
                    >
                      <span className="mr-3 text-slate-500">
                        {String.fromCharCode(65 + optionIndex)}.
                      </span>

                      {option}

                      {submitted && isAnswer && (
                        <span className="float-right">✓</span>
                      )}

                      {submitted && isSelected && !isCorrect && (
                        <span className="float-right">✕</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div
                  className={`mt-4 rounded-xl border p-4 ${
                    isCorrect
                      ? "border-green-500/20 bg-green-500/5"
                      : "border-red-500/20 bg-red-500/5"
                  }`}
                >
                  <p
                    className={`text-sm font-semibold ${
                      isCorrect ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {isCorrect ? "Correct answer!" : "Incorrect answer"}
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
          disabled={Object.keys(answers).length !== questions.length}
          onClick={() => setSubmitted(true)}
          className="mt-8 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Submit Answers
        </button>
      ) : (
        <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 text-center">
          <p className="text-sm text-slate-400">Your final score</p>

          <p className="mt-2 text-4xl font-bold text-white">
            {score} / {questions.length}
          </p>

          <p className="mt-2 text-sm text-slate-400">
            {score === 5
              ? "Excellent! You mastered this lesson."
              : "Good effort! Review the explanations and try again."}
          </p>

          <button
            type="button"
            onClick={restartQuiz}
            className="mt-5 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </section>
  );
}
