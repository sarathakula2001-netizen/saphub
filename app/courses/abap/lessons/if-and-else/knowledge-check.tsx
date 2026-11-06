
"use client";

import { useState } from "react";

const questions = [
  {
    question: "What is the main purpose of an IF statement in ABAP?",
    options: [
      "To repeat code",
      "To check a condition",
      "To declare a variable",
      "To create a database table",
    ],
    answer: 1,
    explanation:
      "IF checks a condition and executes its code block when the condition is true.",
  },
  {
    question: "Which keyword executes when the IF condition is false?",
    options: ["ENDIF", "ELSEIF", "ELSE", "DATA"],
    answer: 2,
    explanation:
      "ELSE executes its block when the preceding IF condition is false.",
  },
  {
    question: "Which keyword is used to check another condition?",
    options: ["ELSEIF", "WRITE", "STOP", "PARAMETERS"],
    answer: 0,
    explanation:
      "ELSEIF lets you check another condition when earlier conditions were false.",
  },
  {
    question: "Which keyword closes an IF statement in ABAP?",
    options: ["END", "ENDLOOP", "ENDIF", "CLOSE"],
    answer: 2,
    explanation:
      "ENDIF marks the end of an IF control structure.",
  },
  {
    question: "What is a nested IF statement?",
    options: [
      "An IF statement inside another IF statement",
      "An IF statement without a condition",
      "An IF statement inside a database table",
      "A loop inside a variable",
    ],
    answer: 0,
    explanation:
      "A nested IF is an IF statement placed inside another IF statement.",
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
        Lesson 13 Knowledge Check
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
