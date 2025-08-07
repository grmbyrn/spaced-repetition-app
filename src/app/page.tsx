"use client";
import StreakCalendar from "@/components/StreakCalendar";
import { useEffect, useState } from "react";
import Accomplishments from "@/components/Accomplishments";
import LanguagesList from "@/components/LanguagesList";

export default function Home() {
  const [didQuiz, setDidQuiz] = useState(false);
  const [unlockedQuiz, setUnlockedQuiz] = useState(false);
  const [fiveDayStreak, setFiveDayStreak] = useState(false);

  useEffect(() => {
    setDidQuiz(!!localStorage.getItem("didQuiz"));
    setUnlockedQuiz(!!localStorage.getItem("unlockedQuiz"));
    setFiveDayStreak(Number(localStorage.getItem("longestStreak") || 0) >= 5);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-gray-100 flex flex-col items-center justify-center px-4">
      <div className="w-full flex flex-col lg:flex-row gap-8 mt-12 items-start justify-center">
        {/* Left column: streak + accomplishments */}
        <div className="w-full max-w-md flex flex-col gap-6 mx-auto">
          <StreakCalendar />
          <Accomplishments
            didQuiz={didQuiz}
            unlockedQuiz={unlockedQuiz}
            fiveDayStreak={fiveDayStreak}
          />
        </div>
        {/* Right column: lessons/languages */}
        <div className="w-full max-w-md mx-auto">
          <LanguagesList />
        </div>
      </div>
    </main>
  );
}