import { readFileSync } from "fs";
import path from "path";
import Link from "next/link";

// Define types
type Question = {
  id: string;
  questionText: string;
  options: string[];
  correctIndex: number;
};

type Chapter = {
  id: string;
  title: string;
  resourceUrl?: string;
  gitHubNotes?: string; // <-- optional
  questions: Question[];
};

type CourseData = {
  language: string;
  title: string;
  chapters: Chapter[];
};

// Page component
export default function ChapterPage({
  params,
}: {
  params: { language: string; chapter: string };
}) {
  // Load data from /data/{language}.json
  const filePath = path.join(process.cwd(), "data", `${params.language}.json`);
  const data: CourseData = JSON.parse(readFileSync(filePath, "utf8"));

  const chapter = data.chapters.find((c) => c.id === params.chapter);

  if (!chapter) {
    return (
      <main className="p-8">
        <h1 className="text-xl font-bold text-red-600">Chapter Not Found</h1>
        <Link
          href="/"
          className="mt-4 inline-block text-blue-600 underline"
        >
          Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-2">{chapter.title}</h1>
      <p className="mb-4">Ready to start the quiz?</p>
      <Link
        href="/session"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Start Session
      </Link>
    </main>
  );
}
