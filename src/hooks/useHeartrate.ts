"use client";
import { useEffect, useState } from "react";
type HeartRate = { value: number; ts: number };
export function useHeartrate(url = "/api/heartrate/stream") {
  const [value, setValue] = useState<HeartRate | null>(null);

  useEffect(() => {
    const es = new EventSource(url);
    fetch("/api/heartrate")
      .then((res) => res.json())
      .then((data) => {
        if (data) setValue(data as HeartRate);
      })
      .catch(() => {}); // optional error handling
    const handler = (e: MessageEvent) => {
      setValue(JSON.parse(e.data) as HeartRate); // overwrite, no history
    };

    es.onmessage = handler; // or es.addEventListener("value", handler)
    return () => es.close();
  }, [url]);

  return value;
}
