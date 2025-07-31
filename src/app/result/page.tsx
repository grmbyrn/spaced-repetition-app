"use client";
import { useEffect } from "react";
import { useQuizStore } from "@/store/quizStore";
import Link from "next/link";
import { languageData } from "@/lib/languageData";
import type { Chapter, LanguageJson } from "@/types/language";
import Chatbot from "@/components/Chatbot";

function markQuizCompletedToday() {
  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  const stored = localStorage.getItem("completedDays");
  const completedDays = stored ? JSON.parse(stored) : [];
  if (!completedDays.includes(today)) {
    completedDays.push(today);
    localStorage.setItem("completedDays", JSON.stringify(completedDays));
  }
}

export default function ResultPage() {
  const { session, review } = useQuizStore();

  useEffect(() => {
    markQuizCompletedToday();
  }, []);

  if (!session) return <div>No session found.</div>;

  const total = session.questions.length;
  const correct = session.questions.filter(
    (q) => review[q.id]?.history.slice(-1)[0]?.correct
  ).length;

  // Get chapter data if not a review session
  let chapter: Chapter | undefined;
  if (
    session.chapterId !== "review" &&
    session.language &&
    languageData[session.language]
  ) {
    const data: LanguageJson = languageData[session.language];
    chapter = data.chapters.find((c) => c.id === session.chapterId);
  }

  return (
    <main className="p-8">
      <h2 className="text-xl font-bold mb-2">Results</h2>
      <div className="mb-4">
        Score: {correct} / {total}
      </div>
      <h3 className="font-semibold mb-2">Review Answers</h3>
      <ul>
        {session.questions.map((q, idx) => {
          const userHistory = review[q.id]?.history;
          const lastAttempt = userHistory?.slice(-1)[0];
          const userCorrect = lastAttempt?.correct;

          let answerBg = "";
          if (userCorrect === true) answerBg = "bg-green-100 border-green-400";
          if (userCorrect === false) answerBg = "bg-red-100 border-red-400";

          return (
            <li key={`${q.id}-${idx}`} className="mb-6">
              <div className="font-bold">{q.questionText}</div>
              <div className={`mt-2 p-2 rounded border ${answerBg}`}>
                <strong>Your Answer:</strong>{" "}
                {userCorrect === true && (
                  <span className="text-green-700 font-bold">Correct</span>
                )}
                {userCorrect === false && (
                  <span className="text-red-700 font-bold">Incorrect</span>
                )}
                {userCorrect === undefined && (
                  <span className="italic text-gray-500">No answer</span>
                )}
              </div>
              <div className="mt-2">
                <strong>Correct Answer:</strong>{" "}
                {String.fromCharCode(65 + q.correctIndex)}.{" "}
                {q.options[q.correctIndex]}
              </div>
              <div className="mt-1 text-gray-700">
                <strong>Explanation:</strong> {q.explanation}
              </div>
            </li>
          );
        })}
      </ul>
      <Chatbot />
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        {chapter?.resourceUrl && (
          <Link
            href={chapter.resourceUrl}
            target="_blank"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors duration-150 text-center"
          >
            📺 Resource
          </Link>
        )}
        {chapter?.gitHubNotes && (
          <Link
            href={chapter.gitHubNotes}
            target="_blank"
            className="px-6 py-3 rounded-lg bg-gray-800 text-white font-semibold shadow hover:bg-gray-900 transition-colors duration-150 text-center"
          >
            📝 GitHub Notes
          </Link>
        )}
        <Link
          href="/"
          className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition-colors duration-150 text-center"
        >
          ⬅️ Back to Home
        </Link>
      </div>
    </main>
  );
}