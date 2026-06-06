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
  } = useTerminal();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom when history or autocomplete prediction updates
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  // Focus terminal input when clicking anywhere inside the terminal body
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

  const handleMobileMenuClick = (cmd: string) => {
    setMobileMenuOpen(false);
    execute(cmd);
  };

  return (
    <TerminalWindow theme={theme}>
      {/* Terminal scroll body */}
      <div className="terminal-body" ref={bodyRef} onClick={handleBodyClick}>
        
        {/* Responsive Banner */}
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
              {entry.output}
            </div>
          </div>
        ))}
      </div>

      {/* Terminal prompt input bar */}
      <div className="terminal-input-area" onClick={handleBodyClick}>
        <span className="terminal-prompt">guest@aravind-portfolio:~$</span>
        <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center" }}>
          
          {/* Autocomplete Predictive Inline Shadow Text */}
          {autocompleteHint && (
            <span className="terminal-autocomplete-hint">
              {autocompleteHint}
            </span>
          )}

          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder='Type command (e.g. "help", "projects")'
          />
        </div>
      </div>

      {/* Mobile Floating Command Menu FAB */}
      <button className="mobile-fab" onClick={() => setMobileMenuOpen(true)}>
        Menu ▼
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
