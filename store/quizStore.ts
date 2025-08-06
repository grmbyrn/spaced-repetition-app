import { create } from "zustand";
import { persist } from "zustand/middleware";

type Question = {
  id: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

type ReviewState = {
  history: { date: string; correct: boolean }[];
  nextReviewDate: string;
  easeFactor: number;
};

type QuizSession = {
  questions: Question[];
  currentIndex: number;
  language: string;
  chapterId: string;
};

type StoreState = {
  session: QuizSession | null;
  review: Record<string, ReviewState>;
  startSession: (questions: Question[], language: string, chapterId: string) => void;
  answerQuestion: (questionId: string, correct: boolean) => void;
  nextQuestion: () => void;
  resetSession: () => void;
};

export const useQuizStore = create<StoreState>()(
  persist(
    (set, get) => ({
      session: null,
      review: {},
      startSession: (questions, language, chapterId) => {
        // Mark quiz as unlocked
        localStorage.setItem("unlockedQuiz", "true");
        set({
          session: { questions, currentIndex: 0, language, chapterId },
        });
      },
      answerQuestion: (questionId, correct) => {
        const now = new Date().toISOString();
        const prev = get().review[questionId] || {
          history: [],
          nextReviewDate: now,
          easeFactor: 2.5,
        };
        // Simple SM2-like scheduling
        const newEase = correct
          ? Math.max(prev.easeFactor + 0.1, 1.3)
          : Math.max(prev.easeFactor - 0.2, 1.3);
        const interval = correct ? Math.ceil(newEase * 1) : 1;
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + interval);

        // Mark quiz as completed if answering the last question in session
        const session = get().session;
        if (
          session &&
          session.currentIndex === session.questions.length - 1
        ) {
          localStorage.setItem("didQuiz", "true");
        }

        // --- Streak tracking logic ---
        // Get today's date string (YYYY-MM-DD)
        const todayStr = new Date().toISOString().slice(0, 10);
        // Get completed days from localStorage
        let completedDays: string[] = JSON.parse(localStorage.getItem("completedDays") || "[]");
        // Add today if not already present
        if (!completedDays.includes(todayStr)) {
          completedDays.push(todayStr);
          localStorage.setItem("completedDays", JSON.stringify(completedDays));
        }
        // Calculate current streak
        completedDays = completedDays.sort();
        let streak = 1;
        let longestStreak = Number(localStorage.getItem("longestStreak") || "1");
        for (let i = completedDays.length - 1; i > 0; i--) {
          const prevDate = new Date(completedDays[i - 1]);
          const currDate = new Date(completedDays[i]);
          if (currDate.getTime() - prevDate.getTime() === 86400000) {
            streak++;
          } else {
            break;
          }
        }
        if (streak > longestStreak) {
          longestStreak = streak;
          localStorage.setItem("longestStreak", String(longestStreak));
        }

        set((state) => ({
          review: {
            ...state.review,
            [questionId]: {
              history: [...prev.history, { date: now, correct }],
              nextReviewDate: nextDate.toISOString(),
              easeFactor: newEase,
            },
          },
        }));
      },
      nextQuestion: () =>
        set((state) => ({
          session: state.session
            ? {
                ...state.session,
                currentIndex: state.session.currentIndex + 1,
              }
            : null,
        })),
      resetSession: () => set({ session: null }),
    }),
    {
      name: "quiz-store", // localStorage key
    }
  )
);