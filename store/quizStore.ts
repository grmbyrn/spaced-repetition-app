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
      startSession: (questions, language, chapterId) =>
        set({
          session: { questions, currentIndex: 0, language, chapterId },
        }),
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