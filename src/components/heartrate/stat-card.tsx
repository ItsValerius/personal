"use client";

import { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    icon: LucideIcon;
    label: string;
    value: string | number | null;
    previousValue?: string | number | null;
    showTrend?: boolean;
}

function getTrend(current: number | null, previous: number | null): "up" | "down" | "same" | null {
    if (current === null || previous === null) return null;
    if (current > previous) return "up";
    if (current < previous) return "down";
    return "same";
}

function extractNumber(value: string | number | null): number | null {
    if (value === null) return null;
    if (typeof value === "number") return value;
    const match = value.toString().match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
}

export function StatCard({
    icon: Icon,
    label,
    value,
    previousValue,
    showTrend = false,
}: StatCardProps) {
    const currentNum = extractNumber(value);
    const previousNum = extractNumber(previousValue ?? null);
    const trend = showTrend ? getTrend(currentNum, previousNum) : null;

    const TrendIcon = trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : Minus;
    const trendColor =
        trend === "up"
            ? "text-green-600 dark:text-green-400"
            : trend === "down"
            ? "text-red-600 dark:text-red-400"
            : "text-muted-foreground";

    const trendLabel =
        trend === "up"
            ? "increasing"
            : trend === "down"
            ? "decreasing"
            : trend === "same"
            ? "unchanged"
            : "";

    return (
        <Card role="region" aria-label={label}>
            <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                    <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <span className="text-sm text-muted-foreground">{label}</span>
                    {showTrend && trend && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={cn("ml-auto", trendColor)}
                            aria-label={`Trend: ${trendLabel}`}
                        >
                            <TrendIcon className="h-3 w-3" aria-hidden="true" />
                        </motion.div>
                    )}
                </div>
                {value === null ? (
                    <div
                        className="h-8 w-20 bg-muted animate-pulse rounded"
                        aria-label="Loading"
                        role="status"
                    />
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={value}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.2 }}
                            className="text-2xl font-bold"
                            role="status"
                            aria-live="polite"
                            aria-atomic="true"
                            aria-label={`${label}: ${value}${trend ? `, ${trendLabel}` : ""}`}
                        >
                            {value}
                        </motion.div>
                    </AnimatePresence>
                )}
            </CardContent>
        </Card>
    );
}

