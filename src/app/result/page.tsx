"use client";
import { useQuizStore } from "@/store/quizStore";
import Link from "next/link";
import { languageData } from "@/lib/languageData";
import type { Chapter, LanguageJson } from "@/types/language";

export default function ResultPage() {
  const { session, review } = useQuizStore();

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
        {session.questions.map((q, idx) => (
          <li key={`${q.id}-${idx}`} className="mb-6">
            <div className="font-bold">{q.questionText}</div>
            <div>
              <strong>Correct Answer:</strong>{" "}
              {String.fromCharCode(65 + q.correctIndex)}. {q.options[q.correctIndex]}
            </div>
            <div className="mt-1 text-gray-700">
              <strong>Explanation:</strong> {q.explanation}
            </div>
          </li>
        ))}
      </ul>
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