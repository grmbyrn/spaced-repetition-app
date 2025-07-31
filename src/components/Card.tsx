"use client";
import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 flex flex-col items-center mb-8">
      {children}
    </div>
  );
}