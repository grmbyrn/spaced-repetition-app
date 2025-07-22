"use client";
import { useQuizStore } from "@/store/quizStore";
import { useEffect } from "react";
import rustData from "@/../data/rust.json";

export default function SessionPage() {
  const { session, startSession, nextQuestion, answerQuestion } = useQuizStore();

  useEffect(() => {
    if (!session) {
      // Start with first 10 questions from Rust Ownership
      startSession(rustData.chapters[0].questions.slice(0, 10));
    }
  }, [session, startSession]);

  if (!session) return <div>Loading...</div>;
  const q = session.questions[session.currentIndex];

  return (
    <main className="p-8">
      <h2 className="text-lg font-bold mb-2">Session</h2>
      <div>
        {q ? (
          <>
            <div className="mb-4">{q.questionText}</div>
            <ul>
              {q.options.map((opt, i) => (
                <li key={i}>
                  <button
                    className="border px-2 py-1 rounded m-1"
                    onClick={() => {
                      answerQuestion(q.id, i === q.correctIndex);
                      nextQuestion();
                    }}
                  >
                    {opt}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              {session.currentIndex + 1}/{session.questions.length}
            </div>
          </>
        ) : (
          <a href="/result" className="mt-4 block text-blue-600 underline">
            See Results
          </a>
        )}
      </div>
    </main>
  );
}