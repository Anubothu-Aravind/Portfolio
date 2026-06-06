import { ReactNode } from "react";

export function TerminalWindow({ children, theme = "amber", className = "" }: { children: ReactNode; theme?: string; className?: string }) {
  return (
    <div className={`terminal-window ${className}`} data-theme={theme}>
      {/* CRT scanline overlay */}
      <div className="crt-overlay" />

      {/* Title bar */}
      <div className="terminal-titlebar">
        <div className="terminal-dots">
          <span />
          <span />
          <span />
        </div>
        <div className="terminal-title">aravind@portfolio:~</div>
        <div style={{ width: 52 }} />
      </div>

      {/* Body */}
      {children}
    </div>
  );
}
