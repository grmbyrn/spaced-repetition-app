"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import rustData from "@/../data/rust.json";
import svelteData from "@/../data/svelte.json";
import { use } from 'react';

const languageData: Record<string, typeof rustData> = {
  rust: rustData,
  svelte: svelteData,
};

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
      localStorage.setItem(key, JSON.stringify(unlockedChapters)); // persist!
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

export default function LanguagePage({ params }: { params: Promise<{ language: string }> }) {
  const { language } = use(params);
  const data = languageData[language];
  const { unlocked, unlock } = useUnlockedChapters(language);
  const [showPopup, setShowPopup] = useState(false);
  const [pendingChapter, setPendingChapter] = useState<string | null>(null);

  if (!data) return <div className="p-8 text-red-600 font-bold">Language not found.</div>;

  const handleChapterClick = (chapterId: string, isUnlocked: boolean) => {
    if (isUnlocked) return;
    setPendingChapter(chapterId);
    setShowPopup(true);
  };

  const confirmUnlock = () => {
    if (pendingChapter) unlock(pendingChapter);
    setShowPopup(false);
    setPendingChapter(null);
  };

  const cancelUnlock = () => {
    setShowPopup(false);
    setPendingChapter(null);
  };

  return (
    <main className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          {data.title}
        </h1>
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-600">
          Select a Chapter
        </h2>
        <ul className="space-y-4">
          {/* Review chapter at the top */}
          <li>
            <Link
              href={`/session?language=${language}&chapter=review`}
              className="block px-6 py-4 rounded-lg shadow text-lg font-medium text-center bg-yellow-50 text-yellow-700 hover:bg-yellow-100 hover:scale-105 transition-all duration-200"
            >
              Review (Spaced Repetition)
            </Link>
          </li>
          {/* Other chapters */}
          {data.chapters.map((chapter) => {
            const isUnlocked = unlocked.includes(chapter.id);
            return (
              <li key={chapter.id}>
                {isUnlocked ? (
                  <Link
                    href={`/session?language=${language}&chapter=${chapter.id}`}
                    className={`block px-6 py-4 rounded-lg shadow text-lg font-medium text-center bg-green-50 text-green-700 hover:bg-green-100 hover:scale-105 transition-all duration-200`}
                  >
                    {chapter.title}
                  </Link>
                ) : (
                  <button
                    className="block w-full px-6 py-4 rounded-lg shadow text-lg font-medium text-center bg-gray-200 text-gray-500 cursor-not-allowed"
                    onClick={() => handleChapterClick(chapter.id, false)}
                  >
                    {chapter.title} (Locked)
                  </button>
                )}
              </li>
            );
          })}
        </ul>
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold mb-2">Unlock Chapter?</h3>
              <p className="mb-4">
                Accessing this chapter will unlock its questions. These questions will also appear in the future in the review chapter, which will review all accessed chapters.
              </p>
              <div className="flex gap-4 justify-end">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={confirmUnlock}
                >
                  Yes, Unlock
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                  onClick={cancelUnlock}
                >
                  No, Keep Locked
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}