"use client";

import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  error: Error;
  onRetry?: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  const t = useTranslations("heartrate.error");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl"
    >
      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="flex flex-col items-center gap-4 py-6">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-1">{t("title")}</h3>
            <p className="text-sm text-muted-foreground mb-2">{error.message}</p>
            {onRetry && (
              <Button
                onClick={onRetry}
                variant="outline"
                size="sm"
                className="mt-2"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                {t("retry")}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

