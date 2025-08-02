"use client";
import { useEffect, useState } from "react";
import Card from "./Card";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Format date as YYYY-MM-DD (local time)
function formatDate(date: Date): string {
  return date.toLocaleDateString("sv-SE"); // 'YYYY-MM-DD'
}

function getToday(): string {
  return formatDate(new Date());
}

function getMonthDays(year: number, month: number) {
  const days = [];
  const lastDay = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= lastDay; d++) {
    const date = new Date(year, month, d);
    days.push({
      iso: formatDate(date),
      day: d,
      weekday: date.getDay(),
    });
  }
  return days;
}

function getStreakDays(completedDays: string[]) {
  const today = getToday();

  // If today is completed, start from today; else, start from yesterday
  const current = completedDays.includes(today)
    ? new Date(today)
    : (() => {
        const d = new Date(today);
        d.setDate(d.getDate() - 1);
        return d;
      })();

  const streakDays: string[] = [];
  while (true) {
    const dayStr = formatDate(current);
    if (completedDays.includes(dayStr)) {
      streakDays.push(dayStr);
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }
  return streakDays;
}

function isBeforeToday(dateStr: string): boolean {
  return new Date(dateStr) < new Date(getToday());
}

export default function StreakCalendar() {
  const [completedDays, setCompletedDays] = useState<string[]>([]);
  const [streakDays, setStreakDays] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [open, setOpen] = useState(false);

  const now = new Date();
  const [displayYear, setDisplayYear] = useState(now.getFullYear());
  const [displayMonth, setDisplayMonth] = useState(now.getMonth());

  // Memoize today's date string once per render
  const todayStr = getToday();

  useEffect(() => {
    const stored = localStorage.getItem("completedDays");
    setCompletedDays(stored ? JSON.parse(stored) : []);
  }, []);

  useEffect(() => {
    const streakArr = getStreakDays(completedDays);
    setStreak(streakArr.length);
    setStreakDays(streakArr);
  }, [completedDays]);

  const monthDays = getMonthDays(displayYear, displayMonth);
  const firstWeekday = new Date(displayYear, displayMonth, 1).getDay();
  const paddedDays = [...Array(firstWeekday).fill(null), ...monthDays];
  const monthName = new Date(displayYear, displayMonth).toLocaleString("default", {
    month: "long",
  });

  const handlePrevMonth = () => {
    if (displayYear === 2025 && displayMonth === 0) return;
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else {
      setDisplayMonth(displayMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(displayMonth + 1);
    }
  };

  return (
    <Card>
      <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-800">
        Your Streak
      </h2>
      <div className="mb-2 text-center">
        Current streak: <span className="font-bold">{streak}</span>{" "}
        {streak === 1 ? "day" : "days"}
      </div>
      <div className="flex justify-center mb-2">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "Hide Calendar" : "Show Calendar"}
        </button>
      </div>

      {open && (
        <>
          {/* Month navigation */}
          <div className="mb-2 text-lg text-center flex items-center justify-center gap-2">
            <button
              className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              onClick={handlePrevMonth}
              disabled={displayYear === 2025 && displayMonth === 0}
            >
              &lt;
            </button>
            <span>
              {monthName} {displayYear}
            </span>
            <button
              className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
              onClick={handleNextMonth}
            >
              &gt;
            </button>
          </div>
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {WEEKDAYS.map((day) => (
              <div key={day} className="text-center font-semibold text-gray-600">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {paddedDays.map((item, idx) =>
              item ? (
                <div
                  key={item.iso}
                  className={`p-2 text-center rounded font-semibold ${
                    completedDays.includes(item.iso)
                      ? "bg-green-200 text-green-700" // completed day
                      : item.iso === todayStr
                      ? "bg-yellow-200 text-yellow-700" // today but NOT completed yet
                      : isBeforeToday(item.iso)
                      ? "bg-red-100 text-red-700" // past day NOT completed
                      : "bg-gray-100" // future day
                  }`}
                >
                  {item.day}
                </div>
              ) : (
                <div key={`empty-${idx}`} className="p-2" />
              )
            )}
          </div>
        </>
      )}
    </Card>
  );
}
