"use client";

import { useEffect, useState } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  } | null>(null);

  useEffect(() => {
    const examDate = new Date("2026-03-13T08:00:00-05:00"); // Central Time

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = examDate.getTime() - now.getTime();

      if (difference <= 0) {
        return { hours: 0, minutes: 0, seconds: 0, isExpired: true };
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { hours, minutes, seconds, isExpired: false };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <div className="text-center">
        <div className="text-gray-400 text-sm mb-2">Exam starts in</div>
        <div className="flex justify-center gap-4">
          <TimeBlock value="--" label="Hours" />
          <TimeBlock value="--" label="Minutes" />
          <TimeBlock value="--" label="Seconds" />
        </div>
      </div>
    );
  }

  if (timeLeft.isExpired) {
    return (
      <div className="text-center">
        <div className="text-2xl font-bold text-[#22c55e]">
          Good luck on your exam!
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="text-gray-400 text-sm mb-2">Exam starts in</div>
      <div className="flex justify-center gap-4">
        <TimeBlock value={timeLeft.hours} label="Hours" />
        <TimeBlock value={timeLeft.minutes} label="Minutes" />
        <TimeBlock value={timeLeft.seconds} label="Seconds" />
      </div>
      {timeLeft.hours < 12 && (
        <div className="mt-4 text-[#f59e0b] text-sm font-medium">
          Final stretch! Focus on practice problems and review formulas.
        </div>
      )}
    </div>
  );
}

function TimeBlock({ value, label }: { value: number | string; label: string }) {
  const displayValue = typeof value === "number" ? value.toString().padStart(2, "0") : value;
  return (
    <div className="bg-[#1e293b] rounded-lg p-4 min-w-[80px]">
      <div className="text-3xl md:text-4xl font-bold text-[#3B82F6] font-mono">
        {displayValue}
      </div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </div>
  );
}
