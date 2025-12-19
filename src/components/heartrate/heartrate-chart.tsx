"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts";
import { useTranslations, useLocale } from "next-intl";
import { AlertCircle } from "lucide-react";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HeartrateValueWithZone } from "./heartrate-value-with-zone";
import {
    CHART_CONFIG,
    INACTIVE_THRESHOLD_MS,
    CHART_MARGINS,
    Y_AXIS_PADDING,
    GRADIENT_STOPS,
} from "@/lib/heartrate-chart-config";
import {
    calculateYDomain,
    getTimeRange,
} from "@/lib/heartrate-utils";

// Types
import type { ChartDataPoint, HeartRatePoint } from "@/types/heartrate";

interface HeartrateChartProps {
    chartData: ChartDataPoint[];
    history: HeartRatePoint[];
    currentValue: number | null;
    lastUpdateTimestamp: number | null;
}



// Sub-components
function InactiveOverlay({ title, description }: { title: string; description: string }) {
    return (
        <div className="absolute inset-0 z-10 flex items-start justify-center pt-4 pointer-events-none">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-2 p-4 bg-card/95 backdrop-blur-sm border rounded-lg shadow-lg max-w-md mx-4 pointer-events-auto"
            >
                <AlertCircle className="h-5 w-5 text-muted-foreground" />
                <div className="text-center">
                    <h4 className="text-sm font-semibold mb-0.5">{title}</h4>
                    <p className="text-xs text-muted-foreground">{description}</p>
                </div>
            </motion.div>
        </div>
    );
}

function ChartHeader({
    title,
    timeRange,
    currentValue,
}: {
    title: string;
    timeRange: string | null;
    currentValue: number | null;
}) {
    return (
        <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                    <CardTitle>{title}</CardTitle>
                    {timeRange && (
                        <CardDescription className="mt-1" aria-label={`Time range: ${timeRange}`}>
                            {timeRange}
                        </CardDescription>
                    )}
                </div>
                {currentValue !== null && (
                    <HeartrateValueWithZone value={currentValue} />
                )}
            </div>
        </CardHeader>
    );
}

export function HeartrateChart({
    chartData,
    history,
    currentValue,
    lastUpdateTimestamp,
}: HeartrateChartProps) {
    const t = useTranslations("heartrate.chart");
    const locale = useLocale();
    const timestampRef = useRef(lastUpdateTimestamp);
    const [isInactive, setIsInactive] = useState(() => {
        if (!lastUpdateTimestamp) return false;
        return Date.now() - lastUpdateTimestamp > INACTIVE_THRESHOLD_MS;
    });

    // Detect mobile screen size for responsive chart adjustments
    const [isMobile, setIsMobile] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        queueMicrotask(() => setIsMounted(true));
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Update ref when timestamp changes and re-check inactive state
    useEffect(() => {
        timestampRef.current = lastUpdateTimestamp;
        // Use setTimeout to avoid synchronous setState in effect
        const timeoutId = setTimeout(() => {
            if (!lastUpdateTimestamp) {
                setIsInactive(false);
            } else {
                setIsInactive(Date.now() - lastUpdateTimestamp > INACTIVE_THRESHOLD_MS);
            }
        }, 0);
        return () => clearTimeout(timeoutId);
    }, [lastUpdateTimestamp]);

    // Monitor app inactivity
    useEffect(() => {
        const checkInactive = () => {
            const currentTimestamp = timestampRef.current;
            if (!currentTimestamp) {
                setIsInactive(false);
                return;
            }
            setIsInactive(Date.now() - currentTimestamp > INACTIVE_THRESHOLD_MS);
        };

        checkInactive();
        const interval = setInterval(checkInactive, 1000);
        return () => clearInterval(interval);
    }, []);

    // Memoized values
    const timeRange = useMemo(() => getTimeRange(history, locale), [history, locale]);

    const yDomain = useMemo(() => {
        if (chartData.length === 0) {
            // Default domain when no data
            return [0, 100];
        }
        const values = chartData.map((d) => d.heartrate);
        return calculateYDomain(Math.min(...values), Math.max(...values), Y_AXIS_PADDING);
    }, [chartData]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-4xl"
            role="region"
            aria-label={t("title")}
        >
            <Card>
                <ChartHeader
                    title={t("title")}
                    timeRange={timeRange}
                    currentValue={currentValue}
                />
                <CardContent className="relative px-2 md:px-6">
                    {isInactive && (
                        <InactiveOverlay
                            title={t("inactive.title")}
                            description={t("inactive.description")}
                        />
                    )}
                    <ChartContainer
                        config={CHART_CONFIG}
                        className="min-h-[300px] w-full -ml-2 md:ml-0"
                        aria-label={`${t("title")} chart showing heart rate over time`}
                    >
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            margin={CHART_MARGINS}
                        >
                            <defs>
                                <linearGradient id="fillHeartrate" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset={GRADIENT_STOPS.start.offset}
                                        stopColor="var(--color-heartrate)"
                                        stopOpacity={GRADIENT_STOPS.start.opacity}
                                    />
                                    <stop
                                        offset={GRADIENT_STOPS.end.offset}
                                        stopColor="var(--color-heartrate)"
                                        stopOpacity={GRADIENT_STOPS.end.opacity}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="time"
                                tickLine={false}
                                axisLine={false}
                                interval={"preserveStartEnd"}
                                tickMargin={8}
                                {...(isMounted && isMobile ? {
                                    angle: -45,
                                    textAnchor: "end",
                                    height: 60
                                } : {
                                    angle: 0,
                                    textAnchor: "middle"
                                })}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                domain={yDomain}
                                className="md:[&_text]:text-sm! [&_text]:text-xs!"
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        indicator="line"
                                        labelFormatter={(value) => `${t("time")}: ${value}`}
                                    />
                                }
                            />
                            <Area
                                type="monotone"
                                dataKey="heartrate"
                                stroke="var(--color-heartrate)"
                                strokeWidth={3}
                                fill="url(#fillHeartrate)"
                                dot={false}
                                activeDot={{ r: 6, fill: "var(--color-heartrate)" }}
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </motion.div>
    );
}

