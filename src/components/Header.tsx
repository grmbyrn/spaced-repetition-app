"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white shadow flex items-center px-6 py-4 mb-0">
      <Link
        href="/"
        className="text-xl font-bold text-blue-700 hover:underline"
      >
        Eternal Recall
      </Link>
    </header>
  );
}