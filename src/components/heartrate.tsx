"use client";

import { useMemo } from "react";
import { useLocale } from "next-intl";
import { useHeartrate } from "@/hooks/useHeartrate";
import { useHeartrateHistory } from "@/hooks/useHeartrateHistory";
import { HeartrateStatsCards } from "@/components/heartrate/heartrate-stats-cards";
import { HeartrateChart } from "@/components/heartrate/heartrate-chart";
import { ConnectionStatusIndicator, ConnectionInfoButton } from "@/components/heartrate/connection-status";
import { ErrorState } from "@/components/heartrate/error-state";
import { calculateStats, formatTimeWithSeconds } from "@/lib/heartrate-utils";

export default function Heartrate() {
  const { value: heartrate, status, error } = useHeartrate();
  const history = useHeartrateHistory(heartrate, 60); // Keep last 60 points

  const locale = useLocale();

  // Transform history data for Recharts
  const chartData = useMemo(() => {
    return history.map((point, index) => ({
      index,
      time: formatTimeWithSeconds(point.ts, locale),
      heartrate: point.value,
      timestamp: point.ts,
    }));
  }, [history, locale]);

  // Calculate statistics
  const stats = useMemo(() => calculateStats(history), [history]);

  // Show error state if there's a critical error
  if (status === "error" && error && history.length === 0) {
    return (
      <div className="flex flex-col items-center min-h-[calc(100vh-4rem)] gap-4">
        <ErrorState error={error} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-4rem)] gap-4">
      {/* Connection Status */}
      <div className="w-full max-w-4xl flex justify-end items-center gap-2">
        <ConnectionStatusIndicator status={status} lastUpdateTimestamp={heartrate?.ts ?? null} />
        <ConnectionInfoButton error={error} />
      </div>

      {/* Statistics Cards */}
      <HeartrateStatsCards
        stats={stats}
        dataPointCount={history.length}
      />

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
