"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useHeartrate } from "@/hooks/useHeartrate";

export default function Component() {
  const heartrate = useHeartrate();

  const [animate, setAnimate] = useState(false);

  // Trigger bounce animation whenever count changes
  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 600);
    return () => clearTimeout(timer);
  }, [heartrate]);
  if (!heartrate) return <div>Momentan kein Wert verfügbar.</div>;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="flex  items-center justify-center">
        <motion.div
          variants={{
            initial: { scale: 1 },
            bounce: {
              scale: [1, 1.3, 0.9, 1.1, 1],
              transition: {
                duration: 0.6,
                ease: "easeInOut",
              },
            },
          }}
          initial="initial"
          animate={animate ? "bounce" : "initial"}
          className="relative flex items-center justify-center"
        >
          <Heart className="w-16 h-16 text-red-500 fill-red-500 drop-shadow-lg" />
          {heartrate.value && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute text-white text-sm font-bold select-none"
              style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
            >
              {heartrate.value}
            </motion.div>
          )}
        </motion.div>
      </div>
      <div>Letzer Wert von {new Date(heartrate.ts).toLocaleString()}</div>
    </div>
  );
}
