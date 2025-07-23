"use client";
import { useQuizStore } from "@/store/quizStore";
import { useEffect, useState } from "react";
import rustData from "@/../data/rust.json";
import svelteData from "@/../data/svelte.json";
import { shuffleQuestion } from "@/lib/shuffleQuestion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const languageData: Record<string, typeof rustData> = {
  rust: rustData,
  svelte: svelteData,
};

export default function SessionPage() {
  const { session, startSession, nextQuestion, answerQuestion, resetSession } = useQuizStore();
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  // Get language and chapter from query params
  const searchParams = useSearchParams();
  const language = searchParams.get("language") || "rust";
  const chapterId = searchParams.get("chapter") || "ownership";
  const data = languageData[language];
  const chapter = data.chapters.find((c) => c.id === chapterId);

  useEffect(() => {
    resetSession();
    if (chapter) {
      const shuffledQuestions = chapter.questions.map(q => shuffleQuestion(q));
      startSession(shuffledQuestions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, chapterId]);

  if (!session) return <div>Loading...</div>;
  const q = session.questions[session.currentIndex];

  const handleAnswer = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    answerQuestion(q.id, i === q.correctIndex);
  };

  const handleNext = () => {
    setSelected(null);
    setAnswered(false);
    nextQuestion();
  };

  return (
    <main className="p-8">
      <h2 className="text-lg font-bold mb-2">Session</h2>
      <div>
        {q ? (
          <>
            <div className="mb-4">{q.questionText}</div>
            <ul className="list-none pl-0">
              {q.options.map((opt, i) => {
  const isCorrect = i === q.correctIndex;
  const isSelected = selected === i;

  // Default button style
  let buttonStyle = "border px-2 py-1 rounded w-full text-left";

  // Add color if answered
  if (answered) {
    if (isCorrect) {
      buttonStyle += " bg-green-300";
    } else if (isSelected && !isCorrect) {
      buttonStyle += " bg-red-300";
    }
  }

  return (
    <li key={i} className="mb-2 flex items-center">
      <span className="font-bold mr-2">
        {String.fromCharCode(65 + i)}.
      </span>
      <button
        className={buttonStyle}
        disabled={answered}
        onClick={() => handleAnswer(i)}
      >
        {opt}
      </button>
    </li>
  );
})}
            </ul>
            {answered && (
              <>
                <div className="mt-4 p-3 bg-green-50 border rounded text-green-800">
                  <strong>Correct Answer:</strong>{" "}
                  <span className="font-bold">
                    {String.fromCharCode(65 + q.correctIndex)}. {q.options[q.correctIndex]}
                  </span>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 border rounded text-gray-800">
                  <strong>Explanation:</strong> {q.explanation}
                </div>
                {session.currentIndex === session.questions.length - 1 ? (
                  <Link
                    href="/result"
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded inline-block text-center"
                  >
                    See Results
                  </Link>
                ) : (
                  <button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={handleNext}
                  >
                    Next Question
                  </button>
                )}
              </>
            )}
          </>
        ) : (
          <Link href={`/result?language=${language}&chapter=${chapterId}`} className="mt-4 block text-blue-600 underline">
            See Results
          </Link>
        )}
      </div>
    </main>
  );
}