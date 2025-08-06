import React from "react";
import Card from "./Card";

type Props = {
  didQuiz: boolean;
  unlockedQuiz: boolean;
  fiveDayStreak: boolean;
};

export default function Accomplishments({ didQuiz, unlockedQuiz, fiveDayStreak }: Props) {
  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Your Accomplishments
      </h2>
      <ul className="space-y-4">
        <li
          className={`px-4 py-3 rounded-lg text-lg font-semibold text-center shadow ${
            didQuiz ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {didQuiz ? "✅" : "❌"} Did a quiz
        </li>
        <li
          className={`px-4 py-3 rounded-lg text-lg font-semibold text-center shadow ${
            unlockedQuiz
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {unlockedQuiz ? "✅" : "❌"} Unlocked a quiz
        </li>
        <li
          className={`px-4 py-3 rounded-lg text-lg font-semibold text-center shadow ${
            fiveDayStreak
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {fiveDayStreak ? "✅" : "❌"} Completed a five day streak
        </li>
      </ul>
    </Card>
  );
}