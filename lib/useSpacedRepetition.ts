type ReviewState = {
  history: { date: string; correct: boolean }[];
  nextReviewDate: string;
  easeFactor: number;
  interval: number;
};

type ReviewUpdate = {
  nextReviewDate: string;
  easeFactor: number;
  interval: number;
  history: { date: string; correct: boolean }[];
};

export function updateReviewSM2(
  prev: ReviewState | undefined,
  correct: boolean
): ReviewUpdate {
  const now = new Date();
  const prevEase = prev?.easeFactor ?? 2.5;
  const prevInterval = prev?.interval ?? 1;
  const history = prev?.history ?? [];

  // Adjust ease factor
  const easeFactor = correct
    ? Math.max(prevEase + 0.1, 1.3)
    : Math.max(prevEase - 0.2, 1.3);

  // Calculate interval
  let interval: number;
  if (!prev) {
    interval = correct ? 1 : 1;
  } else if (correct) {
    interval = prevInterval === 1 ? 2 : Math.round(prevInterval * easeFactor);
  } else {
    interval = 1;
  }

  // Calculate next review date
  const nextReviewDate = new Date(now);
  nextReviewDate.setDate(now.getDate() + interval);

  return {
    nextReviewDate: nextReviewDate.toISOString(),
    easeFactor,
    interval,
    history: [...history, { date: now.toISOString(), correct }],
  };
}