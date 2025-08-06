import Link from "next/link";
import Card from "./Card";

export default function LanguagesList() {
  return (
    <Card>
      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
        Select a Language
      </h1>
      <ul className="w-full space-y-6 max-h-[400px] overflow-y-auto pr-2">
        <li className="rounded-lg overflow-hidden">
          <Link
            href="/rust"
            className="block w-full px-6 py-4 shadow text-lg font-semibold text-center bg-blue-50 text-blue-700 hover:bg-blue-100 hover:scale-105 transition-all duration-200"
          >
            Rust
          </Link>
        </li>
        <li className="rounded-lg overflow-hidden">
          <Link
            href="/svelte"
            className="block w-full px-6 py-4 shadow text-lg font-semibold text-center bg-purple-50 text-purple-700 hover:bg-purple-100 hover:scale-105 transition-all duration-200"
          >
            Svelte
          </Link>
        </li>
        <li className="rounded-lg overflow-hidden">
          <Link
            href="/sveltekit"
            className="block w-full px-6 py-4 shadow text-lg font-semibold text-center bg-blue-50 text-blue-700 hover:bg-blue-100 hover:scale-105 transition-all duration-200"
          >
            SvelteKit
          </Link>
        </li>
        <li className="rounded-lg overflow-hidden">
          <Link
            href="/next"
            className="block w-full px-6 py-4 shadow text-lg font-semibold text-center bg-purple-50 text-purple-700 hover:bg-purple-100 hover:scale-105 transition-all duration-200"
          >
            Next.js 15
          </Link>
        </li>
        {/* Add more languages here */}
      </ul>
    </Card>
  );
}