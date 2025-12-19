"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { TrendingUp, TrendingDown, Activity, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { StatCard } from "./stat-card";
import type { HeartrateStats } from "@/types/heartrate";

interface HeartrateStatsCardsProps {
    stats: HeartrateStats | null;
    dataPointCount: number;
}

export function HeartrateStatsCards({
    stats,
    dataPointCount,
}: HeartrateStatsCardsProps) {
    const t = useTranslations("heartrate.stats");
    const [previousStats, setPreviousStats] = useState<HeartrateStats | null>(null);
    const statsRef = useRef<HeartrateStats | null>(null);

    // Track previous stats for trend comparison
    useEffect(() => {
        if (stats) {
            // Save the current ref value as previous before updating
            setPreviousStats(statsRef.current);
            statsRef.current = stats;
        }
    }, [stats]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl"
        >
            <StatCard
                icon={Activity}
                label={t("average")}
                value={stats ? `${stats.avg} bpm` : null}
                previousValue={previousStats ? `${previousStats.avg} bpm` : null}
                showTrend={true}
            />
            <StatCard
                icon={TrendingUp}
                label={t("maximum")}
                value={stats ? `${stats.max} bpm` : null}
                previousValue={previousStats ? `${previousStats.max} bpm` : null}
                showTrend={true}
            />
            <StatCard
                icon={TrendingDown}
                label={t("minimum")}
                value={stats ? `${stats.min} bpm` : null}
                previousValue={previousStats ? `${previousStats.min} bpm` : null}
                showTrend={true}
            />
            <StatCard
                icon={Clock}
                label={t("dataPoints")}
                value={dataPointCount}
                showTrend={false}
            />
        </motion.div>
    );
}

