// Utility functions for heartrate components

import type { HeartRatePoint, HeartrateStats } from "@/types/heartrate";

/**
 * Format time for display
 */
export function formatTime(ts: number, locale: string): string {
  return new Date(ts).toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Format time with seconds for display
 */
export function formatTimeWithSeconds(ts: number, locale: string): string {
  return new Date(ts).toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/**
 * Calculate statistics from heartrate history
 */
export function calculateStats(history: HeartRatePoint[]): HeartrateStats | null {
  if (history.length === 0) return null;

  const values = history.map((h) => h.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const sum = values.reduce((a, b) => a + b, 0);
  const avg = Math.round(sum / values.length);

  return { min, max, avg };
}

/**
 * Calculate Y-axis domain with padding
 */
export function calculateYDomain(
  dataMin: number,
  dataMax: number,
  padding: number = 10
): [number, number] {
  return [
    Math.max(0, Math.floor(dataMin - padding)),
    Math.ceil(dataMax + padding),
  ];
}

/**
 * Get time range string from history
 */
export function getTimeRange(
  history: HeartRatePoint[],
  locale: string
): string | null {
  if (history.length === 0) return null;
  return `${formatTime(history[0].ts, locale)} - ${formatTime(
    history[history.length - 1].ts,
    locale
  )}`;
}

