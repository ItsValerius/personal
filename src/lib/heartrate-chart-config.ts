// Chart configuration constants for heartrate components

import type { ChartConfig } from "@/components/ui/chart";

export const CHART_CONFIG = {
  heartrate: {
    label: "Heartrate",
    theme: {
      light: "oklch(0.65 0.15 25)",
      dark: "oklch(0.6 0.15 25)",
    },
  },
} satisfies ChartConfig;

export const INACTIVE_THRESHOLD_MS = 30_000;
export const CHART_MARGINS = { top: 5, right: 0, left: 0, bottom: 5 };
export const Y_AXIS_PADDING = 10;
export const GRADIENT_STOPS = {
  start: { offset: "5%", opacity: 0.3 },
  end: { offset: "95%", opacity: 0 },
};

