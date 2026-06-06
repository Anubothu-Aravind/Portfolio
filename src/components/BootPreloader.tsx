import React, { useEffect, useState } from "react";

export function BootPreloader({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Reduced motion check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const bootSteps = [
      "INITIALIZING BOOT SEQUENCE...",
      "[ OK ] LOADING SYSTEM KERNEL v1.0.4",
      "[ OK ] RESOLVING WORKSPACE DEPENDENCIES",
      "[ OK ] INITIALIZING PORTFOLIO MODULES",
      "LOAD COMPLETE. MOUNTING TERMINAL..."
    ];

    let currentStep = 0;
    let stepTimer: ReturnType<typeof setTimeout>;

    const printNextLine = () => {
      if (currentStep < bootSteps.length) {
        setLines((prev) => [...prev, bootSteps[currentStep]]);
        currentStep++;
        const nextDelay = currentStep === bootSteps.length ? 150 : 250;
        stepTimer = setTimeout(printNextLine, nextDelay);
      }
    };

    // Start printing lines
    printNextLine();

    // 2. Progress Bar & Window onload tracking
    let isLoaded = document.readyState === "complete";
    let progressTimer: ReturnType<typeof setInterval>;
    const startTime = Date.now();

    const handleLoad = () => {
      isLoaded = true;
    };

    if (!isLoaded) {
      window.addEventListener("load", handleLoad);
    }

    progressTimer = setInterval(() => {
      setProgress((prev) => {
        const elapsedTime = Date.now() - startTime;
        
        // Enforce a minimum display time of 1.2s to prevent flash of content
        const meetsMinTime = elapsedTime >= 1200;

        if (isLoaded && meetsMinTime) {
          if (prev >= 100) {
            clearInterval(progressTimer);
            // Brief pause at 100% for satisfying feedback
            setTimeout(onComplete, 150);
            return 100;
          }
          return Math.min(100, prev + 10);
        } else {
          // Cap progress at 85% before window is loaded and minimum time is met
          if (prev < 85) {
            return prev + 5;
          }
          return prev;
        }
      });
    }, 80);

    return () => {
      clearTimeout(stepTimer);
      clearInterval(progressTimer);
      window.removeEventListener("load", handleLoad);
    };
  }, [onComplete]);

  // Calculate block count for progress bar (20 characters total width)
  const blockCount = Math.floor(progress / 5);
  const bar = "█".repeat(blockCount) + "░".repeat(20 - blockCount);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      backgroundColor: "#0d0e11",
      color: "var(--t-accent, #4ade80)",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "14px",
      padding: "20px",
      boxSizing: "border-box"
    }}>
      <div style={{ width: "100%", maxWidth: "480px" }}>
        <div style={{ minHeight: "120px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {lines.map((line, i) => (
            <div key={i} style={{ whiteSpace: "pre-wrap" }}>{line}</div>
          ))}
        </div>

        <div style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span>SYSTEM STATUS</span>
            <span>{progress}%</span>
          </div>
          <div style={{ letterSpacing: "1px", color: "var(--t-accent, #4ade80)" }}>
            [{bar}]
          </div>
        </div>
      </div>
    </div>
  );
}
