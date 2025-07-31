export type Chapter = {
  id: string;
  title: string;
  resourceUrl?: string;
  gitHubNotes?: string;
  questions: {
    id: string;
    questionText: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
};

export type LanguageJson = {
  language: string;
  title: string;
  chapters: Chapter[];
};