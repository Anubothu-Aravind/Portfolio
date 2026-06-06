import React, { useState } from "react";
import { personal, education, experience, projects, capabilities, certifications, leadership } from "@/data/portfolio";
import { DASHBOARD_ITEMS } from "./constants";

interface ProfileImageProps {
  size?: number;
}

export const ProfileImage = ({ size = 140 }: ProfileImageProps) => {
  const [src, setSrc] = useState(personal.profileImage);

  return (
    <div style={{
      border: "1px solid var(--t-dim)",
      padding: "4px",
      background: "var(--t-surface)",
      width: `${size + 10}px`,
      height: `${size + 10}px`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      position: "relative"
    }}>
      <img
        src={src}
        alt={personal.name}
        onError={() => {
          if (src !== personal.profileImageFallback) {
            setSrc(personal.profileImageFallback);
          }
        }}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          objectFit: "cover",
          filter: "grayscale(100%) sepia(30%) contrast(110%)",
        }}
      />
    </div>
  );
};

interface OutputProps {
  onExecuteCmd: (cmd: string) => void;
  args?: string;
}

export const WelcomeDashboard = ({ onExecuteCmd }: OutputProps) => {
  return (
    <div className="output-block" style={{ marginTop: "1rem" }}>
      <div className="term-box" style={{ border: "1px solid var(--t-dim)", padding: "1rem", maxWidth: "600px", marginBottom: "1.5rem" }}>
        <div style={{ color: "var(--t-accent)", fontWeight: "bold", fontSize: "1.2rem", marginBottom: "0.5rem" }}>
          {personal.name.toUpperCase()}
        </div>
        <div style={{ color: "var(--t-text-mid)", marginBottom: "0.25rem" }}>
          {personal.descriptor}
        </div>
        <div style={{ color: "var(--t-dim)" }}>
          KL University · CGPA {education.cgpa}
        </div>
      </div>

      <div style={{ fontWeight: "bold", marginBottom: "0.5rem", color: "var(--t-accent)" }}>Quick Start (Click an option or type the command):</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "8px", maxWidth: "600px", marginBottom: "1rem" }}>
        {DASHBOARD_ITEMS.map((item) => (
          <div
            key={item.num}
            className="dashboard-option"
            onClick={() => onExecuteCmd(item.cmd)}
            style={{ border: "1px solid var(--t-border)" }}
          >
            <span className="opt-num">[{item.num}]</span>
            <span style={{ color: "var(--t-text)" }}>{item.label}</span>
            <span className="opt-cmd">→ {item.cmd}</span>
          </div>
        ))}
      </div>
      <div className="pulse-accent" style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "6px", marginTop: "12px" }}>
        <span>▸</span>
        <span>Type <span className="cmd-link" style={{ fontWeight: "bold", textDecoration: "underline" }} onClick={() => onExecuteCmd("help")}>help</span> to explore all commands.</span>
      </div>
    </div>
  );
};

export const HelpOutput = ({ onExecuteCmd }: OutputProps) => {
  const categories = [
    {
      title: "Core Profile",
      cmds: [
        { name: "whoami", desc: "Show biographical details and overview" },
        { name: "skills", desc: "View the hierarchical engineering skill tree" },
        { name: "experience", desc: "Print work and internship records (git log style)" },
        { name: "education", desc: "Show academic path and achievements" },
        { name: "certs", desc: "List valid professional certifications" },
      ],
    },
    {
      title: "Projects & Showcase",
      cmds: [
        { name: "projects", desc: "List all software projects in a ps aux table" },
        { name: "showcase", desc: "Display visual layout of top projects" },
        { name: "project <id>", desc: "Inspect detailed architecture & metrics of a project" },
      ],
    },
    {
      title: "Recruiter Fast-Track",
      cmds: [
        { name: "summary", desc: "30-second elevator pitch" },
        { name: "highlights", desc: "Best career achievements" },
        { name: "hire", desc: "Why you should hire me" },
        { name: "timeline", desc: "Career timeline mapping" },
        { name: "resume", desc: "Download the resume/CV PDF" },
        { name: "contact", desc: "How to reach me (email, socials, phone)" },
      ],
    },
    {
      title: "System Utilities",
      cmds: [
        { name: "neofetch", desc: "Show system info overlay" },
        { name: "theme <name>", desc: "Toggle color themes (amber, green, matrix)" },
        { name: "clear", desc: "Reset terminal output window" },
        { name: "history", desc: "List command input logs" },
        { name: "banner", desc: "Display terminal startup ASCII art" },
        { name: "cowsay <msg>", desc: "Get wise words from a terminal cow" },
      ],
    },
  ];

  return (
    <div className="output-block">
      <div style={{ color: "var(--t-text-mid)", marginBottom: "0.5rem" }}>
        Available commands. Click any command highlighted in brackets to run it.
      </div>
      {categories.map((cat, idx) => (
        <div key={idx} style={{ marginBottom: "1rem" }}>
          <div style={{ color: "var(--t-accent)", fontWeight: "bold", borderBottom: "1px solid var(--t-dimmer)", paddingBottom: "2px", marginBottom: "6px", maxWidth: "600px" }}>
            {cat.title}
          </div>
          <table style={{ borderCollapse: "collapse", width: "100%", maxWidth: "600px" }}>
            <tbody>
              {cat.cmds.map((cmd) => {
                const clickableCmd = cmd.name.split(" ")[0];
                return (
                  <tr key={cmd.name}>
                    <td style={{ padding: "3px 0", width: "160px", verticalAlign: "top" }}>
                      <span className="cmd-link" onClick={() => onExecuteCmd(clickableCmd)}>
                        {cmd.name}
                      </span>
                    </td>
                    <td style={{ padding: "3px 0", color: "var(--t-text-mid)", verticalAlign: "top" }}>
                      - {cmd.desc}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export const WhoamiOutput = ({ onExecuteCmd }: OutputProps) => {
  return (
    <div className="output-block">
      <div style={{ color: "var(--t-accent)", fontWeight: "bold", marginBottom: "0.5rem" }}>$ cat whoami.md</div>
      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "flex-start", maxWidth: "800px" }}>
        <div style={{ flexShrink: 0, marginBottom: "1rem" }}>
          <ProfileImage size={130} />
          <div style={{ color: "var(--t-dim)", fontSize: "11px", textAlign: "center", marginTop: "4px" }}>
            Aravind Anubothu
          </div>
        </div>
        <div style={{ flex: 1, minWidth: "280px", color: "var(--t-text-mid)", lineHeight: "1.6" }}>
          <p style={{ marginBottom: "0.75rem" }}>
            Hi, I am <strong style={{ color: "var(--t-text)" }}>{personal.name}</strong>, a Backend & AI-focused Software Engineer based in Tenali, Andhra Pradesh, India.
          </p>
          <p style={{ marginBottom: "0.75rem" }}>
            I specialize in architecting production-ready APIs, robust AI systems (using RAG pipelines and semantic search), and cloud-deployed services.
            I have designed and implemented 30+ secure REST API endpoints, built scalable AI assistants like Contexta AI and DocDistill, and worked within Agile team environments.
          </p>
          <p style={{ marginBottom: "0.75rem" }}>
            Currently, I am pursuing my Bachelor of Technology (B.Tech) in <strong style={{ color: "var(--t-text)" }}>Artificial Intelligence and Data Science</strong> at KL University, maintaining a CGPA of 9.6/10. I also serve as the Technical Lead at the Intelligentsia Club, coordinating workshops and mentoring peers.
          </p>
          <p style={{ marginBottom: "1rem" }}>
            My development philosophy focuses on performance optimization, secure authorization workflows, clean database architecture, and developer-first design patterns.
          </p>
          <div style={{ borderLeft: "3px solid var(--t-dim)", paddingLeft: "10px", marginTop: "1rem" }}>
            Type <span className="cmd-link" onClick={() => onExecuteCmd("skills")}>skills</span> to see what I build with, or type <span className="cmd-link" onClick={() => onExecuteCmd("showcase")}>showcase</span> to see my featured works.
          </div>
        </div>
      </div>
    </div>
  );
};

export const SummaryOutput = () => {
  return (
    <div className="output-block" style={{ maxWidth: "600px" }}>
      <div style={{ color: "var(--t-accent)", fontWeight: "bold", marginBottom: "0.5rem" }}>30-Second Overview:</div>
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        <li style={{ marginBottom: "6px" }}>📍 <strong>Focus:</strong> Backend systems (FastAPI/NodeJS), generative AI (LangChain/RAG), databases (PostgreSQL/MongoDB), and DevOps (Docker/AWS).</li>
        <li style={{ marginBottom: "6px" }}>📈 <strong>Academic Excellence:</strong> Pursuing B.Tech AI & Data Science (CGPA: 9.6/10).</li>
        <li style={{ marginBottom: "6px" }}>💼 <strong>Experience:</strong> Thoughtiv Internship (HonestAI project) + freelance execution delivering 5+ production products and 30+ secure endpoints.</li>
        <li style={{ marginBottom: "6px" }}>🧠 <strong>Key Projects:</strong> Contexta AI (GenAI paper assistant), Pro Talent Connect (sports platform backend), DocDistill (voice-enabled RAG tool).</li>
      </ul>
    </div>
  );
};

export const HighlightsOutput = () => {
  return (
    <div className="output-block" style={{ maxWidth: "600px" }}>
      <div style={{ color: "var(--t-accent)", fontWeight: "bold", marginBottom: "0.5rem" }}>Core Achievements:</div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={{ color: "var(--t-green)", padding: "4px 0", width: "100px", fontWeight: "bold" }}>[ACADEMIC]</td>
            <td style={{ padding: "4px 0" }}>9.6 CGPA in Artificial Intelligence and Data Science at KL University.</td>
          </tr>
          <tr>
            <td style={{ color: "var(--t-green)", padding: "4px 0", fontWeight: "bold" }}>[DELIVERY]</td>
            <td style={{ padding: "4px 0" }}>Delivered 5+ full-stack AI and backend applications under tight freelance deadlines.</td>
          </tr>
          <tr>
            <td style={{ color: "var(--t-green)", padding: "4px 0", fontWeight: "bold" }}>[SECURITY]</td>
            <td style={{ padding: "4px 0" }}>Designed and deployed 30+ secure REST API endpoints with JWT, RBAC, and rate limiting.</td>
          </tr>
          <tr>
            <td style={{ color: "var(--t-green)", padding: "4px 0", fontWeight: "bold" }}>[LEADERSHIP]</td>
            <td style={{ padding: "4px 0" }}>Led AI workshops for 100+ students as Technical Lead at Intelligentsia Club.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const HireOutput = () => {
  return (
    <div className="output-block" style={{ maxWidth: "600px" }}>
      <div style={{ color: "var(--t-accent)", fontWeight: "bold", marginBottom: "0.5rem" }}>Why Hire Aravind?</div>
      <p style={{ marginBottom: "0.5rem", color: "var(--t-text-mid)" }}>
        Here is what I bring to your engineering team:
      </p>
      <ol style={{ paddingLeft: "20px" }}>
        <li style={{ marginBottom: "6px" }}>
          <strong>Production Ready Backend Skills:</strong> Proficient in constructing performant APIs in FastAPI and Node, optimized database layouts (Postgres, MongoDB), secure routing, and containerization.
        </li>
        <li style={{ marginBottom: "6px" }}>
          <strong>Practical AI Engineering:</strong> I don't just prompt models. I build robust retrieval-augmented pipelines (FAISS, semantic search, parsed context windows, system prompting) that handle dense data.
        </li>
        <li style={{ marginBottom: "6px" }}>
          <strong>Autonomy & Leadership:</strong> Proven track record of taking products from client specifications to live deployment. Highly active in technical community leadership.
        </li>
        <li style={{ marginBottom: "6px" }}>
          <strong>Rigorous Standards:</strong> Experience practicing Test-Driven Development (TDD) and clean code architecture.
        </li>
      </ol>
    </div>
  );
};

export const TimelineOutput = () => {
  const events = [
    { year: "2022", title: "Entered KL University", desc: "B.Tech in AI & Data Science. Started building programming foundations." },
    { year: "2023", title: "Problem Solving & Python Certifications", desc: "Ranked basic badges on HackerRank. Began developing backend scripts." },
    { year: "2024", title: "Freelancing Launch & Cloud Certification", desc: "Certified as AWS Cloud Practitioner. Shipped first client projects. Implemented core JWT auth routines." },
    { year: "2025", title: "Thoughtiv Internship & HonestAI Project", desc: "Collaborated on production-grade Python APIs, writing automated tests (TDD) and containerizing services." },
    { year: "Present", title: "Refining Scale & AI Systems", desc: "Focusing on custom RAG agent logic, prompt evaluation, and cloud infrastructure optimization." },
  ];

  return (
    <div className="output-block" style={{ maxWidth: "650px" }}>
      <div style={{ color: "var(--t-accent)", fontWeight: "bold", marginBottom: "1rem" }}>Redirection Map / Career Timeline:</div>
      <div style={{ position: "relative", borderLeft: "2px solid var(--t-dimmer)", marginLeft: "10px", paddingLeft: "20px" }}>
        {events.map((evt, idx) => (
          <div key={idx} style={{ marginBottom: "1.25rem", position: "relative" }}>
            <span style={{
              position: "absolute",
              left: "-26px",
              top: "2px",
              width: "10px",
              height: "10px",
              background: "var(--t-accent)",
              border: "1px solid var(--t-bg)"
            }} />
            <div style={{ color: "var(--t-accent)", fontWeight: "bold", display: "inline-block", marginRight: "10px" }}>
              [{evt.year}]
            </div>
            <div style={{ display: "inline-block", fontWeight: "bold" }}>{evt.title}</div>
            <div style={{ color: "var(--t-text-mid)", fontSize: "13px", marginTop: "2px" }}>{evt.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CowsayOutput = ({ args }: OutputProps) => {
  const text = args ? args.trim() : "Moo! Coding is fun.";
  const dashes = "-".repeat(text.length + 2);
  return (
    <div className="output-block">
      <pre style={{ color: "var(--t-text)", lineHeight: "1.2" }}>
{`  ${dashes}
< ${text} >
  ${dashes}
         \\   ^__^
          \\  (oo)\\_______
             (__)\\       )\\/\\
                 ||----w |
                 ||     ||`}
      </pre>
    </div>
  );
};

export const BannerOutput = () => {
  const banner = `
 █████╗ ██████╗  █████╗ ██╗   ██╗██╗███╗   ██╗██████╗ 
██╔══██╗██╔══██╗██╔══██╗██║   ██║██║████╗  ██║██╔══██╗
███████║██████╔╝███████║██║   ██║██║██╔██╗ ██║██║  ██║
██╔══██║██╔══██╗██╔══██║╚██╗ ██╔╝██║██║╚██╗██║██║  ██║
██║  ██║██║  ██║██║  ██║ ╚████╔╝ ██║██║ ╚████║██████╔╝
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚═╝╚═╝  ╚═══╝╚═════╝`;
  return (
    <div className="output-block">
      <pre style={{ color: "var(--t-accent)", lineHeight: "1.2", overflowX: "auto" }}>
        {banner}
      </pre>
    </div>
  );
};

export const PhotoOutput = () => {
  return (
    <div className="output-block" style={{ marginTop: "0.5rem" }}>
      <div style={{ color: "var(--t-dim)", marginBottom: "8px" }}>$ cat headshot.jpg</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <ProfileImage size={150} />
        <div style={{ fontSize: "12px", color: "var(--t-dim)", width: "160px", textAlign: "center" }}>
          aravind_headshot.jpg (150x150)
        </div>
      </div>
    </div>
  );
};

export const SocialsOutput = () => {
  const links = [
    { label: "LinkedIn", value: "linkedin.com/in/anubothu-aravind", href: personal.linkedin },
    { label: "GitHub", value: "github.com/Anubothu-Aravind", href: personal.github },
    { label: "Email", value: personal.email, href: `mailto:${personal.email}` },
    { label: "Source Code", value: "github.com/Anubothu-Aravind/Portfolio", href: "https://github.com/Anubothu-Aravind/Portfolio" },
  ];

  return (
    <div className="output-block" style={{ maxWidth: "500px" }}>
      <div style={{ color: "var(--t-dim)", marginBottom: "6px" }}>$ query socials</div>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <tbody>
          {links.map((link) => (
            <tr key={link.label}>
              <td style={{ padding: "4px 0", color: "var(--t-accent)", fontWeight: "bold", width: "120px" }}>
                {link.label}:
              </td>
              <td style={{ padding: "4px 0" }}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="cmd-link" style={{ textDecoration: "none" }}>
                  {link.value}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const ResumeOutput = () => {
  return (
    <div className="output-block" style={{ maxWidth: "500px" }}>
      <div style={{ color: "var(--t-dim)", marginBottom: "6px" }}>$ get resume.pdf</div>
      <div style={{ border: "1px solid var(--t-border)", padding: "12px", background: "var(--t-surface)", borderRadius: "4px" }}>
        <div style={{ color: "var(--t-accent)", fontWeight: "bold", marginBottom: "8px" }}>
          📄 aravind_resume.pdf
        </div>
        <div style={{ fontSize: "13px", color: "var(--t-text-mid)", lineHeight: "1.5" }}>
          <div><span style={{ color: "var(--t-dim)" }}>Size:</span> ~115 KB</div>
          <div><span style={{ color: "var(--t-dim)" }}>Format:</span> PDF Document</div>
          <div><span style={{ color: "var(--t-dim)" }}>Last Updated:</span> June 2026</div>
        </div>
        <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
          <a href="/resume.pdf" download="resume.pdf" className="cmd-link" style={{ fontWeight: "bold" }}>
            [Download Resume]
          </a>
          <span style={{ color: "var(--t-dimmer)" }}>|</span>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="cmd-link">
            [Open in New Tab]
          </a>
        </div>
      </div>
      <div style={{ color: "var(--t-dim)", fontSize: "12px", marginTop: "8px" }}>
        Note: If the PDF did not open automatically, please click one of the links above.
      </div>
    </div>
  );
};
