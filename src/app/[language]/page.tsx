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
  const language = params.language;
  const data = languageData[language];
  if (!data) return <div className="p-8 text-red-600 font-bold">Language not found.</div>;

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
          {data.chapters.map((chapter) => (
            <li key={chapter.id}>
              <Link
                href={`/session?language=${language}&chapter=${chapter.id}`}
                className={`block px-6 py-4 rounded-lg shadow transition-all duration-200 text-lg font-medium text-center ${
                  language === "rust"
                    ? "bg-blue-50 text-blue-700 hover:bg-blue-100 hover:scale-105"
                    : "bg-purple-50 text-purple-700 hover:bg-purple-100 hover:scale-105"
                }`}
              >
                {chapter.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}