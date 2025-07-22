"use client";
import { useQuizStore } from "@/store/quizStore";
import Link from "next/link";

export default function ResultPage() {
  const { session, review } = useQuizStore();

  if (!session) return <div>No session found.</div>;

  const total = session.questions.length;
  const correct = session.questions.filter(
    (q) => review[q.id]?.history.slice(-1)[0]?.correct
  ).length;

  return (
    <main className="p-8">
      <h2 className="text-xl font-bold mb-2">Session Results</h2>
      <div className="mb-4">
        Score: {correct} / {total}
      </div>
      <h3 className="font-semibold mb-2">Review Schedule</h3>
      <ul>
        {session.questions.map((q) => (
          <li key={q.id}>
            <span>{q.questionText}</span>
            <br />
            <span>
              Next review: {review[q.id]?.nextReviewDate?.slice(0, 10) || "N/A"}
            </span>
            <br />
            <span>Ease factor: {review[q.id]?.easeFactor?.toFixed(2) || "N/A"}</span>
          </li>
        ))}
      </ul>
      <Link href="/" className="mt-4 block text-blue-600 underline">
        Back to Home
      </Link>
    </main>
  );
}