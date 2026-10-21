// Shared types for heartrate components

export type HeartRatePoint = {
  value: number;
  ts: number;
};

export type HeartrateStats = {
  min: number;
  max: number;
  avg: number;
};

export type ChartDataPoint = {
  index: number;
  time: string;
  heartrate: number;
  timestamp: number;
};

export type ConnectionStatus = "connecting" | "connected" | "error" | "inactive";

export type HeartRateZone = "resting" | "fat-burn" | "cardio" | "peak";

export interface HeartRateZoneInfo {
  zone: HeartRateZone;
  min: number;
  max: number;
  label: string;
}

// Calculate heart rate zones based on age (default: 220 - age)
export function calculateHeartRateZones(maxHeartRate: number = 220): HeartRateZoneInfo[] {
  return [
    {
      zone: "resting",
      min: 0,
      max: Math.round(maxHeartRate * 0.5),
      label: "Resting",
    },
    {
      zone: "fat-burn",
      min: Math.round(maxHeartRate * 0.5),
      max: Math.round(maxHeartRate * 0.6),
      label: "Fat Burn",
    },
    {
      zone: "cardio",
      min: Math.round(maxHeartRate * 0.6),
      max: Math.round(maxHeartRate * 0.85),
      label: "Cardio",
    },
    {
      zone: "peak",
      min: Math.round(maxHeartRate * 0.85),
      max: maxHeartRate,
      label: "Peak",
    },
  ];
}

// Get the zone for a given heart rate value
export function getHeartRateZone(
  value: number,
  zones: HeartRateZoneInfo[]
): HeartRateZoneInfo | null {
  return zones.find((zone) => value >= zone.min && value < zone.max) || null;
}

