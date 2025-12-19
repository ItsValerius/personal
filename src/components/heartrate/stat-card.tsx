"use client";

import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
    icon: LucideIcon;
    label: string;
    value: string | number | null;
}

export function StatCard({ icon: Icon, label, value }: StatCardProps) {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{label}</span>
                </div>
                {value === null ? (
                    <div className="h-8 w-20 bg-muted animate-pulse rounded" />
                ) : (
                    <div className="text-2xl font-bold">{value}</div>
                )}
            </CardContent>
        </Card>
    );
}

