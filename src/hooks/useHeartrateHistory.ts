"use client";
import { useEffect, useRef, useState } from "react";
import type { HeartRatePoint } from "@/types/heartrate";

export function useHeartrateHistory(
  currentHeartrate: HeartRatePoint | null,
  maxPoints = 60
) {
  const [history, setHistory] = useState<HeartRatePoint[]>([]);
  const lastTsRef = useRef<number | null>(null);

  useEffect(() => {
    if (!currentHeartrate) return;

    // Only add if timestamp changed (new reading)
    if (lastTsRef.current !== currentHeartrate.ts) {
      lastTsRef.current = currentHeartrate.ts;
      // Use setTimeout to avoid synchronous setState in effect
      const timeoutId = setTimeout(() => {
        setHistory((prev) => {
          // Avoid duplicate entries
          if (prev.length > 0 && prev[prev.length - 1].ts === currentHeartrate.ts) {
            return prev;
          }
          const newHistory = [...prev, currentHeartrate];
          // Keep only the last maxPoints
          return newHistory.slice(-maxPoints);
        });
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [currentHeartrate, maxPoints]);

  // Reset history when maxPoints changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHistory((prev) => prev.slice(-maxPoints));
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [maxPoints]);

  return history;
}

