"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { StatCard } from "./stat-card";

type HeartrateStats = {
    min: number;
    max: number;
    avg: number;
    trend: "up" | "down" | "stable";
};

interface HeartrateStatsCardsProps {
    stats: HeartrateStats | null;
    dataPointCount: number;
}

export function HeartrateStatsCards({
    stats,
    dataPointCount,
}: HeartrateStatsCardsProps) {
    const t = useTranslations("heartrate.stats");

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-4xl"
        >
            <StatCard
                icon={Activity}
                label={t("average")}
                value={stats ? `${stats.avg} bpm` : null}
            />
            <StatCard
                icon={TrendingUp}
                label={t("maximum")}
                value={stats ? `${stats.max} bpm` : null}
            />
            <StatCard
                icon={TrendingDown}
                label={t("minimum")}
                value={stats ? `${stats.min} bpm` : null}
            />
            <StatCard
                icon={Clock}
                label={t("dataPoints")}
                value={dataPointCount}
            />
        </motion.div>
    );
}

