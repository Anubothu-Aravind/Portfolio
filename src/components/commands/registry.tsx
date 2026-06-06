import React from "react";
import { findSuggestion } from "./constants";
import { certifications } from "@/data/portfolio";
import {
  WelcomeDashboard,
  HelpOutput,
  WhoamiOutput,
  SummaryOutput,
  HighlightsOutput,
  HireOutput,
  TimelineOutput,
  CowsayOutput,
  BannerOutput,
  PhotoOutput,
  SocialsOutput,
  ResumeOutput,
} from "./Outputs";
import {
  NeofetchOutput,
  ContactOutput,
  CertsOutput,
  CertDetailOutput,
  EducationOutput,
  ExperienceOutput,
  SkillsOutput,
  ProjectsOutput,
  ProjectDetailOutput,
  ShowcaseOutput,
} from "./ComplexOutputs";

export interface CommandResult {
  output: React.ReactNode;
  action?: "clear" | "theme" | "resume" | "repo" | "open_url";
  themeName?: "amber" | "green" | "matrix";
  url?: string;
  isValid?: boolean;
}

export function executeCommand(
  cmdStr: string,
  onExecuteCmd: (cmd: string) => void,
  history?: string[]
): CommandResult {
  const trimmed = cmdStr.trim();
  if (!trimmed) {
    return { output: null };
  }

  const parts = trimmed.split(" ");
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1).join(" ");

  switch (cmd) {
    case "help":
      return { output: <HelpOutput onExecuteCmd={onExecuteCmd} /> };
    case "whoami":
    case "about":
    case "me":
      return { output: <WhoamiOutput onExecuteCmd={onExecuteCmd} /> };
    case "work":
      return { output: <ProjectsOutput onExecuteCmd={onExecuteCmd} /> };
    case "photo":
    case "avatar":
    case "headshot":
      return { output: <PhotoOutput /> };
    case "socials":
      return { output: <SocialsOutput /> };
    case "summary":
      return { output: <SummaryOutput /> };
    case "highlights":
      return { output: <HighlightsOutput /> };
    case "hire":
      return { output: <HireOutput /> };
    case "timeline":
      return { output: <TimelineOutput /> };
    case "cowsay":
      return { output: <CowsayOutput onExecuteCmd={onExecuteCmd} args={args} /> };
    case "banner":
      return { output: <BannerOutput /> };
    case "neofetch":
      return { output: <NeofetchOutput /> };
    case "contact":
      return { output: <ContactOutput /> };
    case "certs":
      return { output: <CertsOutput onExecuteCmd={onExecuteCmd} /> };
    case "cert":
      return { output: <CertDetailOutput onExecuteCmd={onExecuteCmd} args={args} /> };
    case "open": {
      const subArgs = args.trim().toLowerCase();
      if (subArgs.startsWith("cert ")) {
        const keyword = subArgs.replace("cert ", "").trim();
        const cert = certifications.find(c => {
          const t = c.title.toLowerCase();
          return t.includes(keyword) || c.issuer.toLowerCase().includes(keyword);
        });
        if (cert) {
          return {
            output: <div style={{ color: "var(--t-green)" }}>Opening certification link...</div>,
            action: "open_url",
            url: cert.fallbackUrl,
          };
        }
        return {
          output: <div style={{ color: "var(--t-red)" }}>Error: Certificate matching "{keyword}" not found.</div>
        };
      }
      return {
        output: <div style={{ color: "var(--t-red)" }}>Error: Invalid open command. E.g. `open cert aws`.</div>
      };
    }
    case "education":
      return { output: <EducationOutput /> };
    case "experience":
      return { output: <ExperienceOutput /> };
    case "skills":
      return { output: <SkillsOutput /> };
    case "projects":
      return { output: <ProjectsOutput onExecuteCmd={onExecuteCmd} /> };
    case "project":
      return { output: <ProjectDetailOutput onExecuteCmd={onExecuteCmd} args={args} /> };
    case "showcase":
      return { output: <ShowcaseOutput onExecuteCmd={onExecuteCmd} /> };

    // Action commands
    case "clear":
      return { output: null, action: "clear" };

    case "theme": {
      const themeVal = args.trim().toLowerCase();
      if (themeVal === "amber" || themeVal === "green" || themeVal === "matrix") {
        return {
          output: <div style={{ color: "var(--t-green)" }}>Theme switched to {themeVal}.</div>,
      const availableThemes = ["amber", "green", "matrix"];
      const themeName = args.toLowerCase();
      if (!themeName) {
        return {
          output: (
            <div style={{ color: "var(--t-text)" }}>
              Available themes: <span style={{ color: "var(--t-accent)" }}>amber</span>,{" "}
              <span style={{ color: "var(--t-accent)" }}>green</span>,{" "}
              <span style={{ color: "var(--t-accent)" }}>matrix</span>
            </div>
          ),
        };
      }
      if (!availableThemes.includes(themeName)) {
        return {
          isValid: false,
          output: (
            <div style={{ color: "var(--t-red)" }}>
              Theme "{themeName}" not found. Try one of: amber, green, matrix.
            </div>
          ),
        };
      }
      return {
        output: (
          <div style={{ color: "var(--t-text)" }}>
            Theme changed to <span style={{ color: "var(--t-accent)" }}>{themeName}</span>
          </div>
        ),
        action: "theme",
        themeName: themeName as "amber" | "green" | "matrix",
      };
    }

    case "resume":
    case "cv":
    case "download":
      return {
        output: <ResumeOutput />,
        action: "resume",
      };

    case "repo":
      return {
        output: <div style={{ color: "var(--t-green)" }}>Opening GitHub profile...</div>,
        action: "repo",
      };

    case "history": {
      const allHistory = history ? [...history, cmdStr] : [cmdStr];
      return {
        output: (
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {allHistory.map((h, i) => (
              <div key={i} style={{ display: "flex", gap: "12px" }}>
                <span style={{ color: "var(--t-dim)", width: "32px", textAlign: "right" }}>{i + 1}</span>
                <span style={{ color: "var(--t-text)" }}>{h}</span>
              </div>
            ))}
          </div>
        ),
      };
    }

    default: {
      const suggestion = findSuggestion(cmd);
      return {
        isValid: false,
        output: (
          <div style={{ color: "var(--t-red)", marginTop: "4px" }}>
            Command not found: "{cmd}". Type <span className="cmd-link" onClick={() => onExecuteCmd("help")}>help</span> for commands.
            {suggestion && (
              <div style={{ marginTop: "4px", color: "var(--t-text)" }}>
                Did you mean:{" "}
                <span className="cmd-link" onClick={() => onExecuteCmd(suggestion + (args ? " " + args : ""))}>
                  {suggestion}
                </span>
                ?
              </div>
            )}
          </div>
        ),
      };
    }
  }
}
