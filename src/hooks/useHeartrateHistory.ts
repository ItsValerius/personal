"use client";
import { useEffect, useRef, useState } from "react";

type HeartRatePoint = { value: number; ts: number };

export function useHeartrateHistory(
  currentHeartrate: HeartRatePoint | null,
  maxPoints = 60
) {
  const [history, setHistory] = useState<HeartRatePoint[]>([]);
  const heartrateRef = useRef<HeartRatePoint | null>(null);

  useEffect(() => {
    // Store the latest heartrate in a ref so we can access it in the effect
    if (currentHeartrate) {
      heartrateRef.current = currentHeartrate;
    }

    const heartrate = heartrateRef.current;
    if (!heartrate) return;

    // Add the new reading to history
    setHistory((prev) => {
      const lastTs = prev.length > 0 ? prev[prev.length - 1].ts : null;
      // Only add if timestamp changed (new reading)
      if (lastTs !== heartrate.ts) {
        const newHistory = [...prev, heartrate];
        // Keep only the last maxPoints
        return newHistory.slice(-maxPoints);
      }
      return prev;
    });
  }, [currentHeartrate, maxPoints]);

  return history;
}

