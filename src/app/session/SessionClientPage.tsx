"use client";
import { useQuizStore } from "@/store/quizStore";
import { useEffect, useState } from "react";
import { languageData } from "@/lib/languageData";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { shuffleQuestion } from "@/lib/shuffleQuestion";
import type { Chapter, LanguageJson } from "@/types/language";

function useUnlockedChapters(language: string) {
  const key = `unlockedChapters_${language}`;
  const [unlocked, setUnlocked] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    let unlockedChapters = stored ? JSON.parse(stored) : [];
    // Always include the first chapter
    const firstChapterId = languageData[language].chapters[0]?.id;
    if (firstChapterId && !unlockedChapters.includes(firstChapterId)) {
      unlockedChapters = [firstChapterId, ...unlockedChapters];
      localStorage.setItem(key, JSON.stringify(unlockedChapters));
    }
    setUnlocked(unlockedChapters);
  }, [key, language]);

  const unlock = (chapterId: string) => {
    const updated = unlocked.includes(chapterId)
      ? unlocked
      : [...unlocked, chapterId];
    setUnlocked(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  return { unlocked, unlock };
}

export default function SessionPage() {
  const { session, startSession, nextQuestion, answerQuestion, resetSession } = useQuizStore();
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  // Get language and chapter from query params
  const searchParams = useSearchParams();
  const language = searchParams?.get("language") || "rust";
  const chapterId = searchParams?.get("chapter") || "ownership";
  const data: LanguageJson = languageData[language];
  const chapter: Chapter | undefined = data.chapters.find((c) => c.id === chapterId);
  const isReview = chapterId === "review";
  const { unlocked } = useUnlockedChapters(language);

  useEffect(() => {
    resetSession();
    if (isReview) {
      // Get unlocked chapters
      const unlockedChapters = data.chapters.filter((ch) => unlocked.includes(ch.id));
      const allQuestions = unlockedChapters.flatMap((ch) => ch.questions);

      // Remove duplicates by question id
      const uniqueQuestionsMap = new Map();
      allQuestions.forEach((q) => {
        if (!uniqueQuestionsMap.has(q.id)) {
          uniqueQuestionsMap.set(q.id, q);
        }
      });
      const uniqueQuestions = Array.from(uniqueQuestionsMap.values());

      // Determine how many questions to ask
      const numQuestions = unlockedChapters.length > 1 ? 10 : 5;
      // Shuffle and pick the required number
      const shuffled = uniqueQuestions
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(numQuestions, uniqueQuestions.length))
        .map(q => shuffleQuestion(q));
      startSession(shuffled, language, chapterId);
    } else if (chapter) {
      const shuffledQuestions = chapter.questions.map(q => shuffleQuestion(q));
      startSession(shuffledQuestions, language, chapterId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, chapterId, unlocked]);

  if (!session || !session.questions.length) {
    return (
      <main className="p-8">
        <h2 className="text-lg font-bold mb-2">Session</h2>
        <div>No questions available for this review. Unlock more chapters to get more questions!</div>
      </main>
    );
  }

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
      <h2 className="text-lg font-bold mb-2">
        {isReview
          ? `${data.title} Review`
          : chapter?.title || "Session"}
      </h2>
      <div>
        {q ? (
          <>
            <div className="mb-4">{q.questionText}</div>
            <ul className="list-none pl-0">
              {q.options.map((opt, i) => {
                const isCorrect = i === q.correctIndex;
                const isSelected = selected === i;
                let buttonStyle = "border px-2 cursor-pointer py-1 rounded w-full text-left";
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
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer inline-block text-center"
                  >
                    See Results
                  </Link>
                ) : (
                  <button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
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