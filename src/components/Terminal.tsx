import React, { useRef, useEffect, useState } from "react";
import { useTerminal } from "@/hooks/useTerminal";
import { WelcomeDashboard } from "./commands/Outputs";
import { ASCII_BANNER, ASCII_BANNER_SMALL, DASHBOARD_ITEMS } from "./commands/constants";
import { TerminalWindow } from "./TerminalWindow";

export function Terminal() {
  const {
    input,
    setInput,
    history,
    theme,
    autocompleteHint,
    handleKeyDown,
    execute,
    inputAnimation,
    setInputAnimation,
    isProcessing,
  } = useTerminal();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [sweepActive, setSweepActive] = useState(false);
  const [fabPulse, setFabPulse] = useState(false);
  const [lowBandwidthMode, setLowBandwidthMode] = useState(false);
  const isFirstRender = useRef(true);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Typewriter effect for placeholder on first visit
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisitedTerminal");
    const targetText = 'Type "help" to start...';
    const finalPlaceholder = 'Type command (e.g. "help", "projects")';

    if (hasVisited) {
      setPlaceholder(finalPlaceholder);
      return;
    }

    let currentText = "";
    let i = 0;
    let blinkIntervalId: ReturnType<typeof setInterval> | null = null;

    const typeIntervalId = setInterval(() => {
      if (i < targetText.length) {
        currentText += targetText[i];
        setPlaceholder(currentText + "█");
        i++;
      } else {
        clearInterval(typeIntervalId);
        sessionStorage.setItem("hasVisitedTerminal", "true");
        
        let showCursor = true;
        blinkIntervalId = setInterval(() => {
          showCursor = !showCursor;
          setPlaceholder(targetText + (showCursor ? "█" : " "));
        }, 500);

        // Fade placeholder out and replace after 3 seconds
        setTimeout(() => {
          if (blinkIntervalId) clearInterval(blinkIntervalId);
          setPlaceholder(finalPlaceholder);
        }, 3000);
      }
    }, 80);

    return () => {
      clearInterval(typeIntervalId);
      if (blinkIntervalId) clearInterval(blinkIntervalId);
    };
  }, []);

  // Scroll to bottom on history change
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleBodyClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Focus input on initial mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Network connection speed check (bandwidth-aware rendering)
  useEffect(() => {
    // Safari / iOS fallback: navigator.connection is not supported.
    // If connection is undefined, we assume a normal connection (lowBandwidthMode = false).
    const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (conn) {
      const isSlow = conn.saveData || ["slow-2g", "2g"].includes(conn.effectiveType);
      if (isSlow) {
        setLowBandwidthMode(true);
      }
    }
  }, []);

  // Theme change scanline sweep + FAB spin triggers
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setSweepActive(true);
    setFabPulse(true);

    const sweepTimer = setTimeout(() => setSweepActive(false), 300);
    const fabTimer = setTimeout(() => setFabPulse(false), 400);

    return () => {
      clearTimeout(sweepTimer);
      clearTimeout(fabTimer);
    };
  }, [theme]);

  const handleMobileMenuClick = (cmd: string) => {
    setMobileMenuOpen(false);
    execute(cmd);
  };

  return (
    <TerminalWindow theme={theme} className={`${sweepActive ? "theme-sweep-active" : ""} ${lowBandwidthMode ? "low-bandwidth" : ""}`}>
      <div className="terminal-body" ref={bodyRef}>
        
        {/* Banner */}
        <div className="hidden md:block">
          <pre style={{ color: "var(--t-accent)", lineHeight: "1.2", overflowX: "auto", margin: 0 }}>
            {ASCII_BANNER}
          </pre>
        </div>
        <div className="block md:hidden">
          <pre style={{ color: "var(--t-accent)", lineHeight: "1.2", overflowX: "auto", margin: 0 }}>
            {ASCII_BANNER_SMALL}
          </pre>
        </div>

        {lowBandwidthMode && (
          <div style={{ color: "var(--t-red)", marginBottom: "1rem", fontSize: "13px", fontFamily: "inherit" }}>
            [ SYSTEM ] Low bandwidth mode active. Decorative scanlines, sweeps, and animations disabled.
          </div>
        )}

        {/* Startup Dash */}
        <WelcomeDashboard onExecuteCmd={execute} />

        {/* History Entries */}
        {history.map((entry) => (
          <div key={entry.id} className="output-block" style={{ marginTop: "1rem" }}>
            <div className="cmd-line">
              <span className="terminal-prompt">guest@aravind-portfolio:~$</span>
              <span className="cmd-text">{entry.cmd}</span>
            </div>
            <div style={{ marginTop: "4px" }}>
              {entry.output === null ? (
                renderCommandSkeleton(entry.cmd)
              ) : (
                entry.output
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Command Quick Pills */}
      <div className="mobile-command-pills">
        {["help", "whoami", "projects", "skills", "experience", "certs", "contact", "resume"].map((cmd) => (
          <button
            key={cmd}
            className="mobile-pill-btn"
            disabled={isProcessing}
            onClick={() => execute(cmd)}
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal prompt input bar */}
      <div
        className={`terminal-input-area ${inputAnimation === "shake" ? "shake-input" : ""} ${inputAnimation === "flash" ? "flash-success" : ""}`}
        onAnimationEnd={() => setInputAnimation("")}
        onClick={handleBodyClick}
      >
        <span className="terminal-prompt">guest@aravind-portfolio:~$</span>
        <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center", minWidth: 0 }}>
          
          {/* Autocomplete Predictive Inline Shadow Text */}
          {autocompleteHint && (
            <span className="terminal-autocomplete-hint">
              {autocompleteHint}
            </span>
          )}

          <input
            ref={inputRef}
            type="text"
            className={`terminal-input ${isProcessing ? "processing" : ""}`}
            value={input}
            disabled={isProcessing}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder={placeholder}
          />
        </div>
      </div>

      {/* Mobile Floating Command Menu FAB */}
      <button className={`mobile-fab ${fabPulse ? "pulse-fab" : ""}`} onClick={() => setMobileMenuOpen(true)}>
        &gt;_
      </button>

      {/* Mobile Command Drawer overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-sheet" onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 16px",
              borderBottom: "1px solid var(--t-border)",
              color: "var(--t-accent)",
              fontWeight: "bold",
              fontSize: "13px"
            }}>
              <span>SELECT COMMAND</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: "none", border: "none", color: "var(--t-text)", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>
            {DASHBOARD_ITEMS.map((item) => (
              <button
                key={item.num}
                className="mobile-menu-item"
                onClick={() => handleMobileMenuClick(item.cmd)}
              >
                {item.label} ({item.cmd})
              </button>
            ))}
            <button
              className="mobile-menu-item"
              onClick={() => handleMobileMenuClick("help")}
            >
              All Commands (help)
            </button>
            <button
              className="mobile-menu-item"
              onClick={() => handleMobileMenuClick("showcase")}
            >
              Featured showcase
            </button>
          </div>
        </div>
      )}
    </TerminalWindow>
  );
}

function renderCommandSkeleton(cmd: string) {
  const baseCmd = cmd.trim().split(" ")[0].toLowerCase();
  const listCommands = ["certs", "certifications", "projects", "experience", "work"];
  
  if (!listCommands.includes(baseCmd)) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{ maxWidth: "600px", marginTop: "10px" }}>
      <div style={{ display: "flex", gap: "12px", marginBottom: "8px", borderBottom: "1px dashed var(--t-dimmer)", paddingBottom: "6px" }}>
        <div className="skeleton-shimmer" style={{ width: "80px", height: "14px" }} />
        <div className="skeleton-shimmer" style={{ width: "200px", height: "14px" }} />
        <div className="skeleton-shimmer" style={{ width: "100px", height: "14px" }} />
        <div className="skeleton-shimmer" style={{ width: "120px", height: "14px" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div className="skeleton-shimmer" style={{ width: "80px", height: "12px" }} />
            <div className="skeleton-shimmer" style={{ width: "200px", height: "12px" }} />
            <div className="skeleton-shimmer" style={{ width: "100px", height: "12px" }} />
            <div className="skeleton-shimmer" style={{ width: "120px", height: "12px" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function LoadingSpinner() {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  const [frameIdx, setFrameIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIdx((prev) => (prev + 1) % frames.length);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--t-accent)" }}>
      <span style={{ display: "inline-block", width: "16px", textAlign: "center" }}>{frames[frameIdx]}</span>
      <span style={{ color: "var(--t-text-mid)", fontStyle: "italic", fontSize: "13px" }}>processing...</span>
    </div>
  );
}
