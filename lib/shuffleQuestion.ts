type Question = {
  id: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export function shuffleQuestion(question: Question): Question {
  const options = [...question.options];
  const correctOption = options[question.correctIndex];
  // Fisher-Yates shuffle
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  const newCorrectIndex = options.indexOf(correctOption);
  return {
    ...question,
    options,
    correctIndex: newCorrectIndex,
  };
}