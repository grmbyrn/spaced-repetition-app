import Link from "next/link";
import rustData from "@/../data/rust.json";
import svelteData from "@/../data/svelte.json";

type Chapter = {
  id: string;
  title: string;
  questions: {
    id: string;
    questionText: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
  }[];
};

type LanguageData = {
  language: string;
  title: string;
  chapters: Chapter[];
};

const languageData: Record<string, LanguageData> = {
  rust: rustData,
  svelte: svelteData,
};

export default function LanguagePage({ params }: { params: { language: string } }) {
  const data = languageData[params.language];
  if (!data) return <div>Language not found.</div>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Select a Chapter</h1>
      <ul>
        {data.chapters.map((chapter) => (
          <li key={chapter.id}>
            <Link
              href={`/session?language=${params.language}&chapter=${chapter.id}`}
              className={params.language === "rust" ? "text-blue-600 underline" : "text-purple-600 underline"}
            >
              {data.title}: {chapter.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}