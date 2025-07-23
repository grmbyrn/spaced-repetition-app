import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-gray-100">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800 border border-red-500">
          Select a Language
        </h1>
        <ul className="w-full space-y-6">
          <li>
            <Link
              href="/rust"
              className="block w-full px-6 py-4 rounded-lg shadow text-lg font-semibold text-center bg-blue-50 text-blue-700 hover:bg-blue-100 hover:scale-105 transition-all duration-200"
            >
              Rust
            </Link>
          </li>
          <li className="border border-gray-200">
            <Link
              href="/svelte"
              className="block w-full px-6 py-4 rounded-lg shadow text-lg font-semibold text-center bg-purple-50 text-purple-700 hover:bg-purple-100 hover:scale-105 transition-all duration-200"
            >
              Svelte
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}