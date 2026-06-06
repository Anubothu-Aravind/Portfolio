import { useState, useEffect, KeyboardEvent } from "react";
import { COMMAND_LIST } from "@/components/commands/constants";
import { executeCommand } from "@/components/commands/registry";
import { personal } from "@/data/portfolio";

export type HistoryEntry = {
  id: string;
  cmd: string;
  output: React.ReactNode;
};

export function useTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [theme, setTheme] = useState<"amber" | "green" | "matrix">("amber");
  const [autocompleteHint, setAutocompleteHint] = useState("");
  const [inputAnimation, setInputAnimation] = useState<"shake" | "flash" | "">("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Update theme in DOM attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Autocomplete prediction
  useEffect(() => {
    const trimmed = input.trim().toLowerCase();
    if (!trimmed) {
      setAutocompleteHint("");
      return;
    }

    const match = COMMAND_LIST.find((c) => c.startsWith(trimmed));
    if (match && match !== trimmed) {
      // Return the remainder of the suggestion relative to the user's casing
      const matchPart = match.slice(trimmed.length);
      setAutocompleteHint(input + matchPart);
    } else {
      setAutocompleteHint("");
    }
  }, [input]);

  const execute = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;
    if (isProcessing) return;

    setIsProcessing(true);

    // Create a unique loading ID for the spinner entry
    const tempId = Math.random().toString(36).substr(2, 9);
    
    // Staging the temp history entry
    setHistory((prev) => [
      ...prev,
      {
        id: tempId,
        cmd: trimmed,
        output: null,
      },
    ]);

    // Clear input immediately so user sees responsiveness
    setInput("");

    // Simulated short terminal processing delay
    setTimeout(() => {
      const result = executeCommand(trimmed, execute, cmdHistory);
      const isValid = result.isValid !== false;
      setInputAnimation(isValid ? "flash" : "shake");

      // Record entered command in history stack
      setCmdHistory((prev) => [...prev, trimmed]);
      setCmdIndex(-1);

      if (result.action) {
        if (result.action === "clear") {
          setHistory([]);
          setIsProcessing(false);
          return;
        }
        if (result.action === "theme" && result.themeName) {
          setTheme(result.themeName);
        }
        if (result.action === "repo") {
          window.open(personal.github, "_blank");
        }
        if (result.action === "open_url" && result.url) {
          window.open(result.url, "_blank");
        }
      }

      setHistory((prev) =>
        prev.map((entry) =>
          entry.id === tempId
            ? {
                ...entry,
                output: result.output,
              }
            : entry
        )
      );

      setIsProcessing(false);
    }, 350);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isProcessing) {
      e.preventDefault();
      return;
    }

    // 1. Enter key
    if (e.key === "Enter") {
      e.preventDefault();
      execute(input);
      return;
    }

    // 2. Tab key for autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
      if (autocompleteHint) {
        setInput(autocompleteHint);
      }
      return;
    }

    // 3. Arrow Up (previous command)
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = cmdIndex === -1 ? cmdHistory.length - 1 : Math.max(0, cmdIndex - 1);
      setCmdIndex(nextIdx);
      setInput(cmdHistory[nextIdx]);
      return;
    }

    // 4. Arrow Down (next command)
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdIndex === -1) return;
      if (cmdIndex === cmdHistory.length - 1) {
        setCmdIndex(-1);
        setInput("");
      } else {
        const nextIdx = cmdIndex + 1;
        setCmdIndex(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
      return;
    }
  };

  return {
    input,
    setInput,
    history,
    theme,
    setTheme,
    autocompleteHint,
    handleKeyDown,
    execute,
    inputAnimation,
    setInputAnimation,
    isProcessing,
  };
}
