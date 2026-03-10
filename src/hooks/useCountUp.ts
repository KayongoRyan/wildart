"use client";
import { useState, useEffect, useRef } from "react";

export function useCountUp(
  target: number,
  duration = 2000,
  options: { start?: boolean; decimals?: number } = {}
) {
  const { start = true, decimals = 0 } = options;
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease     = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((target * ease).toFixed(decimals)));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration, start, decimals]);

  return count;
}
