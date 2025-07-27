"use client";
import { useEffect, useRef, useState } from "react";

type HeartRate = { value: number; ts: number };

export function useHeartrate(
  url = "/api/heartrate/stream",
  renewEveryMs = 140_000 // < 150s timeout
) {
  const [value, setValue] = useState<HeartRate | null>(null);
  const esRef = useRef<EventSource | null>(null);
  const timerRef = useRef<number>(0);

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      // initial snapshot
      try {
        const data = await fetch("/api/heartrate").then((r) => r.json());
        if (!cancelled && data) setValue(data as HeartRate);
      } catch {}
    };

    const connect = () => {
      // close old connection
      esRef.current?.close();

      // bust caches so the browser doesn't reuse the same connection
      const src = new EventSource(`${url}?t=${Date.now()}`);
      esRef.current = src;

      // schedule manual renew
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        connect(); // reopen before server kills it
      }, renewEveryMs);

      src.onmessage = (e) => {
        if (!cancelled) setValue(JSON.parse(e.data) as HeartRate);
      };

      src.onerror = () => {
        // fall back to quick reconnect on error
        window.clearTimeout(timerRef.current);
        connect();
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

  return value;
}
