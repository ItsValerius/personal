"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Info } from "lucide-react";
import { useHeartrate } from "@/hooks/useHeartrate";
import { useHeartrateHistory } from "@/hooks/useHeartrateHistory";
import { HeartrateStatsCards } from "@/components/heartrate/heartrate-stats-cards";
import { HeartrateChart } from "@/components/heartrate/heartrate-chart";
import { Card, CardContent } from "@/components/ui/card";

export default function Heartrate() {
  const heartrate = useHeartrate();
  const history = useHeartrateHistory(heartrate, 60); // Keep last 60 points

  const locale = useLocale();
  const t = useTranslations("heartrate.note");

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

    return { min, max, avg };
  }, [history]);

  return (
    <div className="flex flex-col items-center  min-h-[calc(100vh-4rem)] gap-4 ">
      {/* Note */}
      <Card className="w-full max-w-4xl border-muted bg-muted/30">
        <CardContent className="flex items-center gap-2 py-2">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <p className="text-xs text-foreground">
            {t("text")}
          </p>
        </CardContent>
      </Card>

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
