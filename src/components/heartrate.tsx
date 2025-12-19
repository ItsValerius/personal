"use client";

import { useMemo } from "react";
import { useLocale } from "next-intl";
import { useHeartrate } from "@/hooks/useHeartrate";
import { useHeartrateHistory } from "@/hooks/useHeartrateHistory";
import { HeartrateStatsCards } from "@/components/heartrate/heartrate-stats-cards";
import { HeartrateChart } from "@/components/heartrate/heartrate-chart";

export default function Component() {
  const heartrate = useHeartrate();
  const history = useHeartrateHistory(heartrate, 60); // Keep last 60 points

  const locale = useLocale();

  // Transform history data for Recharts
  const chartData = useMemo(() => {
    return history.map((point, index) => ({
      index,
      time: new Date(point.ts).toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      heartrate: point.value,
      timestamp: point.ts,
    }));
  }, [history, locale]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (history.length === 0) return null;

    const values = history.map((h) => h.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = Math.round(sum / values.length);

    // Calculate trend (comparing last 10 values to previous 10)
    let trend: "up" | "down" | "stable" = "stable";
    if (values.length >= 20) {
      const recent = values.slice(-10);
      const previous = values.slice(-20, -10);
      const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
      const previousAvg = previous.reduce((a, b) => a + b, 0) / previous.length;
      const diff = recentAvg - previousAvg;
      if (diff > 2) trend = "up";
      else if (diff < -2) trend = "down";
    }

    return { min, max, avg, trend };
  }, [history]);

  return (
    <div className="flex flex-col items-center  min-h-[calc(100vh-4rem)] gap-8 ">
      {/* Statistics Cards */}
      <HeartrateStatsCards stats={stats} dataPointCount={history.length} />

      {/* Real-time Graph */}
      <HeartrateChart
        chartData={chartData}
        history={history}
        currentValue={heartrate?.value ?? null}
        lastUpdateTimestamp={heartrate?.ts ?? null}
      />
    </div>
  );
}
