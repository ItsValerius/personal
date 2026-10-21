"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Wifi, WifiOff, AlertCircle, Loader2, Info } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ConnectionStatus } from "@/types/heartrate";
import { cn } from "@/lib/utils";
import { INACTIVE_THRESHOLD_MS } from "@/lib/heartrate-chart-config";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ConnectionStatusIndicatorProps {
  status: ConnectionStatus;
  lastUpdateTimestamp?: number | null;
  className?: string;
}

export function ConnectionStatusIndicator({
  status,
  lastUpdateTimestamp,
  className,
}: ConnectionStatusIndicatorProps) {
  const t = useTranslations("heartrate.connection");

  const [isInactive, setIsInactive] = useState(() => {
    if (!lastUpdateTimestamp) return false;
    return Date.now() - lastUpdateTimestamp > INACTIVE_THRESHOLD_MS;
  });
  const timestampRef = useRef(lastUpdateTimestamp);

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

  // Override status to inactive if detected
  const displayStatus = isInactive && status === "connected" ? "inactive" : status;

  const statusConfig = {
    connecting: {
      icon: Loader2,
      label: t("connecting"),
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      animate: true,
    },
    connected: {
      icon: Wifi,
      label: t("connected"),
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      animate: false,
    },
    error: {
      icon: AlertCircle,
      label: t("error"),
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      animate: false,
    },
    inactive: {
      icon: WifiOff,
      label: t("inactive"),
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      animate: false,
    },
  };

  const config = statusConfig[displayStatus];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium",
        config.bgColor,
        config.color,
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={`Connection status: ${config.label}`}
    >
      <Icon
        className={cn("h-3.5 w-3.5", config.animate && "animate-spin")}
        aria-hidden="true"
      />
      <span>{config.label}</span>
    </motion.div>
  );
}

export function ConnectionInfoButton({
  error,
}: {
  error?: Error | null;
}) {
  const tNote = useTranslations("heartrate.note");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Show connection information"
        >
          <Info className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-semibold mb-1.5">Connection Information</h4>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {tNote("text")}
            </p>
          </div>
          {error && (
            <div className="pt-3 border-t">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-destructive mb-1">Error</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {error.message}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

