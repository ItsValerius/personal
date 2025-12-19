"use client";
import { useEffect, useRef, useState } from "react";
import type { HeartRatePoint, ConnectionStatus } from "@/types/heartrate";

export function useHeartrate(
  url = "/api/heartrate/stream",
  renewEveryMs = 140_000 // < 150s timeout
) {
  const [value, setValue] = useState<HeartRatePoint | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>("connecting");
  const [error, setError] = useState<Error | null>(null);
  const esRef = useRef<EventSource | null>(null);
  const timerRef = useRef<number>(0);

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      // initial snapshot
      try {
        setStatus("connecting");
        setError(null);
        const response = await fetch("/api/heartrate");
        if (!response.ok) {
          throw new Error(`Failed to fetch initial heartrate: ${response.statusText}`);
        }
        const data = await response.json();
        if (!cancelled && data) {
          setValue(data as HeartRatePoint);
          setStatus("connected");
        }
      } catch (err) {
        if (!cancelled) {
          const error = err instanceof Error ? err : new Error("Failed to fetch initial heartrate");
          setError(error);
          setStatus("error");
        }
      }
    };

    const connect = () => {
      // close old connection
      esRef.current?.close();

      if (cancelled) return;

      // bust caches so the browser doesn't reuse the same connection
      const src = new EventSource(`${url}?t=${Date.now()}`);
      esRef.current = src;

      src.onopen = () => {
        if (!cancelled) {
          setStatus("connected");
          setError(null);
        }
      };

      // schedule manual renew
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        if (!cancelled) {
          connect(); // reopen before server kills it
        }
      }, renewEveryMs);

      src.onmessage = (e) => {
        if (!cancelled) {
          try {
            const data = JSON.parse(e.data) as HeartRatePoint;
            setValue(data);
            setStatus("connected");
            setError(null);
          } catch (err) {
            const error = err instanceof Error ? err : new Error("Failed to parse heartrate data");
            setError(error);
            setStatus("error");
          }
        }
      };

      src.onerror = () => {
        if (!cancelled) {
          setStatus("error");
          setError(new Error("EventSource connection error"));
          // fall back to quick reconnect on error
          window.clearTimeout(timerRef.current);
          setTimeout(() => {
            if (!cancelled) {
              connect();
            }
          }, 1000);
        }
      };
    };

    bootstrap();
    connect();

    return () => {
      cancelled = true;
      window.clearTimeout(timerRef.current);
      esRef.current?.close();
    };
  }, [url, renewEveryMs]);

  return { value, status, error };
}
