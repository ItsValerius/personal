"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { calculateHeartRateZones, getHeartRateZone } from "@/types/heartrate";
import { cn } from "@/lib/utils";

interface HeartrateValueWithZoneProps {
  value: number | null;
  maxHeartRate?: number;
  className?: string;
}

const ZONE_COLORS: Record<string, { bg: string; text: string; border: string; valueText: string }> = {
  resting: {
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/20",
    valueText: "text-blue-700 dark:text-blue-300",
  },
  "fat-burn": {
    bg: "bg-green-500/10",
    text: "text-green-600 dark:text-green-400",
    border: "border-green-500/20",
    valueText: "text-green-700 dark:text-green-300",
  },
  cardio: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-600 dark:text-yellow-400",
    border: "border-yellow-500/20",
    valueText: "text-yellow-700 dark:text-yellow-300",
  },
  peak: {
    bg: "bg-red-500/10",
    text: "text-red-600 dark:text-red-400",
    border: "border-red-500/20",
    valueText: "text-red-700 dark:text-red-300",
  },
};

export function HeartrateValueWithZone({
  value,
  maxHeartRate = 220,
  className,
}: HeartrateValueWithZoneProps) {
  const zones = useMemo(() => calculateHeartRateZones(maxHeartRate), [maxHeartRate]);
  const currentZone = useMemo(() => {
    if (!value) return null;
    return getHeartRateZone(value, zones);
  }, [value, zones]);

  if (value === null || !currentZone) {
    return null;
  }

  const colors = ZONE_COLORS[currentZone.zone] || ZONE_COLORS.resting;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "inline-flex items-center gap-3 px-4 py-2.5 rounded-lg border",
        colors.bg,
        colors.border,
        className
      )}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Current heart rate: ${value} beats per minute, ${currentZone.label} zone`}
    >
      <div className="flex flex-col">
        <div className={cn("text-2xl font-bold leading-none", colors.valueText)}>
          {value}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">bpm</div>
      </div>
      <div className="h-10 w-px bg-border" aria-hidden="true" />
      <div className="flex flex-col">
        <div className={cn("text-sm font-semibold", colors.text)}>
          {currentZone.label}
        </div>
        <div className="text-[10px] text-muted-foreground">
          {currentZone.min}-{currentZone.max} bpm
        </div>
      </div>
    </motion.div>
  );
}

