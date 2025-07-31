function getSessionScore(session: { questions: { id: string }[] }, review: Record<string, { history: { correct: boolean }[] }>) {
  const total = session.questions.length;
  const correct = session.questions.filter(
    (q) => review[q.id]?.history.slice(-1)[0]?.correct
  ).length;
  return { total, correct };
}

describe("Quiz scoring logic", () => {
  it("counts correct answers accurately", () => {
    const session = {
      questions: [
        { id: "q1" },
        { id: "q2" },
        { id: "q3" },
      ],
    };
    const review = {
      q1: { history: [{ correct: true }] },
      q2: { history: [{ correct: false }] },
      q3: { history: [{ correct: true }] },
    };

    const score = getSessionScore(session, review);
    expect(score.total).toBe(3);
    expect(score.correct).toBe(2);
  });
});