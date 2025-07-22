import Link from "next/link";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Select a Language</h1>
      <ul>
        <li>
          <Link href="/rust/ownership" className="text-blue-600 underline">
            Rust Fundamentals
          </Link>
        </li>
      </ul>
    </main>
  );
}