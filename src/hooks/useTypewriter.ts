import { useEffect, useRef, useState } from "react";

export function useTypewriter(text: string, trigger: boolean, speed = 40) {
  const [displayed, setDisplayed] = useState("");
  const done = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!trigger || done.current) return;
    let i = 0;
    setDisplayed("");
    intervalRef.current = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(intervalRef.current!);
        done.current = true;
      }
    }, speed);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [trigger, text, speed]);

  return { displayed, isDone: displayed === text && text.length > 0 };
}

export function useSequentialReveal(totalItems: number, trigger: boolean, intervalMs = 100) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleCount(count);
      if (count >= totalItems) {
        clearInterval(interval);
      }
    }, intervalMs);
    return () => clearInterval(interval);
  }, [trigger, totalItems, intervalMs]);

  return visibleCount;
}
