import React, { useState, useEffect, useRef } from "react";
import { personal, education, experience, projects, capabilities, certifications } from "@/data/portfolio";
import type { Project, ProjectStatus } from "@/data/portfolio";
import { ProfileImage, getStaggerStyle } from "./Outputs";

interface OutputProps {
  onExecuteCmd: (cmd: string) => void;
  args?: string;
}

export const NeofetchOutput = () => {
  return (
    <div className="output-block" style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "flex-start", marginTop: "0.5rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
        <pre style={{ color: "var(--t-accent)", lineHeight: 1.2, fontWeight: 700, margin: 0 }}>{`
       /\\
      /  \\
     /\\  /\\
    /  \\/  \\
   /   /\\   \\
  /   /  \\   \\
 /___/    \\___\\
`}</pre>
        <ProfileImage size={110} />
      </div>
      <div>
        <div style={{ color: "var(--t-accent)", fontWeight: 700 }}>visitor@aravind-portfolio</div>
        <div style={{ color: "var(--t-dim)", marginBottom: "4px" }}>-------------------------</div>
        <div><span style={{ color: "var(--t-dim)" }}>OS:</span> AravindOS v4.0.0 (x86_64)</div>
        <div><span style={{ color: "var(--t-dim)" }}>Host:</span> Portfolio Web Terminal</div>
        <div><span style={{ color: "var(--t-dim)" }}>Kernel:</span> React 18.3.1 + Vite</div>
        <div><span style={{ color: "var(--t-dim)" }}>Uptime:</span> Just initialized</div>
        <div><span style={{ color: "var(--t-dim)" }}>Shell:</span> interactive-web-sh</div>
        <div><span style={{ color: "var(--t-dim)" }}>Education:</span> B.Tech AI & Data Science</div>
        <div><span style={{ color: "var(--t-dim)" }}>CGPA:</span> {education.cgpa} / 10</div>
        <div><span style={{ color: "var(--t-dim)" }}>Role:</span> Backend & AI Engineer</div>
        <div><span style={{ color: "var(--t-dim)" }}>Tech Stack:</span> Python, NodeJS, FastAPI, AWS, Docker</div>
      </div>
    </div>
  );
};

export const ContactOutput = () => {
  const contacts = [
    { perm: "drwxr-xr-x", label: "email", value: personal.email, href: `mailto:${personal.email}` },
    { perm: "drwxr-xr-x", label: "linkedin", value: "/in/anubothu-aravind", href: personal.linkedin },
    { perm: "drwxr-xr-x", label: "github", value: "/Anubothu-Aravind", href: personal.github },
    { perm: "lrwxrwxrwx", label: "resume", value: "./resume.pdf → [download]", href: "./resume.pdf", download: true },
  ];

  return (
    <div className="output-block">
      <div style={{ color: "var(--t-dim)", marginBottom: "4px" }}>$ ls -la ~/contact</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {contacts.map((c) => (
          <div key={c.label}>
            <a
              href={c.href}
              target={c.download ? "_self" : "_blank"}
              rel="noopener noreferrer"
              download={c.download}
              style={{ textDecoration: "none", display: "flex", gap: "1.5rem", whiteSpace: "pre" }}
            >
              <span style={{ color: "var(--t-dimmer)" }}>{c.perm}</span>
              <span style={{ color: "var(--t-dim)", width: "8ch" }}>{c.label}</span>
              <span className="cmd-link" style={{ color: "var(--t-text)" }}>{c.value}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CertsOutput = ({ onExecuteCmd }: OutputProps) => {
  const dotPad = (label: string, total = 52) => {
    const dots = total - label.length;
    return ".".repeat(Math.max(dots, 3));
  };

  const getCertId = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("aws")) return "aws";
    if (t.includes("salesforce")) return "salesforce";
    if (t.includes("python")) return "python";
    if (t.includes("problem solving") || t.includes("problem-solving")) return "problem-solving";
    if (t.includes("aviatrix")) return "aviatrix";
    if (t.includes("automation")) return "automation";
    if (t.includes("ibm")) return "ibm";
    return t.replace(/\s+/g, "-");
  };

  return (
    <div className="output-block">
      <div style={{ color: "var(--t-dim)", marginBottom: "8px" }}>$ cat certificates.log</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {certifications.map((cert, certIdx) => {
          const date = cert.date || "2024-01";
          const label = cert.title;
          const certId = getCertId(label);
          return (
            <div
              key={cert.title}
              className="term-row staggered-row"
              onClick={() => onExecuteCmd(`cert ${certId}`)}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                maxWidth: "720px",
                flexWrap: "nowrap",
                ...getStaggerStyle(certIdx)
              }}
            >
              <span style={{ color: "var(--t-dim)", marginRight: "8px" }}>[{date}]</span>
              <span className="cmd-link" style={{ color: "var(--t-text-mid)", marginRight: "4px" }}>{label}</span>
              <span style={{ color: "var(--t-dimmer)", flex: 1, overflow: "hidden", textOverflow: "clip", whiteSpace: "nowrap" }}>
                {dotPad(label)}
              </span>
              <span style={{ color: "var(--t-green)", fontWeight: 700, marginLeft: "8px" }}>VALID</span>
            </div>
          );
        })}
      </div>
      <div style={{ color: "var(--t-dim)", fontSize: "12px", marginTop: "10px" }}>
        Tip: Click on any certification name or type <span className="text-t-accent">cert &lt;keyword&gt;</span> (e.g., <span className="cmd-link" onClick={() => onExecuteCmd("cert aws")}>cert aws</span>) to inspect its details.
      </div>
    </div>
  );
};

interface CertImageLoaderProps {
  src: string;
  alt: string;
  onError: () => void;
}

const CertImageLoader = ({ src, alt, onError }: CertImageLoaderProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [meetsMinTime, setMeetsMinTime] = useState(false);

  // ASCII block characters cycling
  const blocks = ["░", "▒", "█", "▒"];
  const [blockIdx, setBlockIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlockIdx((prev) => (prev + 1) % blocks.length);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setImageLoaded(false);
    setMeetsMinTime(false);
    const timer = setTimeout(() => {
      setMeetsMinTime(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [src]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const showRealImage = imageLoaded && meetsMinTime;
  const blockChar = blocks[blockIdx];
  const loaderText = `LOADING CERTIFICATE [ ${blockChar} ]`;

  return (
    <div className="cert-image-wrapper">
      <div className={`cert-image-skeleton ${showRealImage ? "fade-out" : ""}`}>
        <div style={{ fontFamily: "monospace", fontSize: "13px" }}>
          {loaderText}
        </div>
      </div>
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        onError={onError}
        className={`cert-image-content ${showRealImage ? "fade-in" : ""}`}
      />
    </div>
  );
};

export const CertDetailOutput = ({ args, onExecuteCmd }: OutputProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const keyword = (args || "").trim().toLowerCase();
  const cert = certifications.find(c => {
    const title = c.title.toLowerCase();
    return title.includes(keyword) || c.issuer.toLowerCase().includes(keyword) || c.type.toLowerCase().includes(keyword);
  });
  const [previewSrc, setPreviewSrc] = useState(cert ? cert.localUrl : "");

  React.useEffect(() => {
    if (cert) {
      setPreviewSrc(cert.localUrl);
      setShowPreview(false);
    }
  }, [cert]);

  if (!args) {
    return (
      <div className="output-block" style={{ color: "var(--t-red)" }}>
        Error: Please specify a certification keyword. E.g., `cert aws`.
      </div>
    );
  }

  if (!cert) {
    return (
      <div className="output-block" style={{ color: "var(--t-red)" }}>
        Error: Certification matching "{args}" not found. Type `certs` to list all.
      </div>
    );
  }

  const getCertId = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("aws")) return "aws";
    if (t.includes("salesforce")) return "salesforce";
    if (t.includes("python")) return "python";
    if (t.includes("problem solving") || t.includes("problem-solving")) return "problem-solving";
    if (t.includes("aviatrix")) return "aviatrix";
    if (t.includes("automation")) return "automation";
    if (t.includes("ibm")) return "ibm";
    return t.replace(/\s+/g, "-");
  };

  const certId = getCertId(cert.title);

  // Derive a nice Credential ID from the fallbackUrl or date
  let credentialId = "N/A";
  if (cert.fallbackUrl) {
    const parts = cert.fallbackUrl.split("/");
    const filename = parts[parts.length - 1];
    const rawId = filename.split("_")[1] || filename.split(".")[0];
    if (rawId.length > 25) {
      credentialId = rawId.substring(0, 15).toUpperCase();
    } else {
      credentialId = rawId.toUpperCase();
    }
  }

  return (
    <div className="output-block" style={{ maxWidth: "600px" }}>
      <div style={{ color: "var(--t-dim)", marginBottom: "4px" }}>$ query certification --name {certId}</div>
      <div style={{ border: "1px solid var(--t-border)", padding: "12px", background: "var(--t-surface)" }}>
        <div style={{ color: "var(--t-accent)", fontWeight: "bold", fontSize: "1.1rem" }}>
          {cert.title}
        </div>
        <div style={{ color: "var(--t-text)", margin: "6px 0 4px 0" }}>
          Issuer: <span style={{ color: "var(--t-text-mid)" }}>{cert.issuer}</span>
        </div>
        <div style={{ color: "var(--t-text)", margin: "4px 0" }}>
          Issued: <span style={{ color: "var(--t-dim)" }}>{cert.date}</span>
        </div>
        <div style={{ color: "var(--t-text)", margin: "4px 0" }}>
          Credential ID: <span style={{ color: "var(--t-text-mid)" }}>{credentialId}</span>
        </div>
        <p style={{ color: "var(--t-text-mid)", fontSize: "13px", marginTop: "8px", marginBottom: "8px", lineHeight: "1.5" }}>
          {cert.description}
        </p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "8px" }}>
          <span className="cmd-link" onClick={() => onExecuteCmd(`open cert ${certId}`)}>
            [Open Link]
          </span>
          <span style={{ color: "var(--t-dimmer)" }}>
            (or type: <span style={{ color: "var(--t-text)" }}>open cert {certId}</span>)
          </span>
        </div>

        {/* Inline Certificate Preview Toggle */}
        <div style={{ marginTop: "12px", borderTop: "1px dashed var(--t-border)", paddingTop: "12px" }}>
          {showPreview ? (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ color: "var(--t-accent)", fontWeight: "bold" }}>PREVIEW:</span>
                <span className="cmd-link" onClick={() => setShowPreview(false)}>
                  [Hide Preview]
                </span>
              </div>
              <CertImageLoader
                src={previewSrc}
                alt={cert.title}
                onError={() => {
                  if (previewSrc !== cert.fallbackUrl) {
                    setPreviewSrc(cert.fallbackUrl);
                  }
                }}
              />
            </div>
          ) : (
            <span className="cmd-link" onClick={() => setShowPreview(true)}>
              [Show Certificate Preview]
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const EducationOutput = () => {
  return (
    <div className="output-block" style={{ maxWidth: "600px" }}>
      <div style={{ color: "var(--t-dim)", marginBottom: "4px" }}>$ query education</div>
      <div style={{ borderLeft: "2px solid var(--t-dim)", paddingLeft: "12px" }}>
        <div style={{ color: "var(--t-accent)", fontWeight: "bold" }}>{education.institution}</div>
        <div style={{ color: "var(--t-text)" }}>
          {education.degree} in {education.field}
        </div>
        <div style={{ color: "var(--t-dim)", fontSize: "13px" }}>
          {education.duration} · Cumulative GPA: <strong style={{ color: "var(--t-green)" }}>{education.cgpa}</strong>
        </div>
        <div style={{ marginTop: "8px", color: "var(--t-text-mid)" }}>
          <strong>Relevant Coursework:</strong> Data Structures & Algorithms, Object-Oriented Programming,
          DBMS, Artificial Intelligence, Machine Learning, Software Engineering, Cloud Computing.
        </div>
      </div>
    </div>
  );
};

export const ExperienceOutput = () => {
  return (
    <div className="output-block">
      <div style={{ color: "var(--t-dim)", marginBottom: "8px" }}>$ git log --oneline --graph</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "800px" }}>
        {experience.map((exp, index) => (
          <div
            key={exp.id}
            className="staggered-row"
            style={{ display: "flex", gap: "10px", ...getStaggerStyle(index) }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ color: "var(--t-accent)", fontWeight: "bold" }}>*</span>
              {index < experience.length - 1 && (
                <div style={{ width: "1px", flex: 1, borderLeft: "1px dashed var(--t-dim)" }} />
              )}
            </div>
            <div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "baseline" }}>
                <span style={{ color: "var(--t-green)", fontWeight: "bold" }}>{exp.role}</span>
                <span style={{ color: "var(--t-text)" }}>@ {exp.company}</span>
                <span style={{ color: "var(--t-dim)", fontSize: "12px" }}>({exp.duration})</span>
              </div>
              {exp.project && (
                <div style={{ color: "var(--t-blue)", fontSize: "13px", fontWeight: "bold" }}>
                  Project: {exp.project}
                </div>
              )}
              <ul style={{ paddingLeft: "20px", marginTop: "4px", marginBottom: "4px", color: "var(--t-text-mid)", fontSize: "13px" }}>
                {exp.impact.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "6px" }}>
                {exp.stack.map((s) => (
                  <span key={s} style={{ color: "var(--t-dim)", border: "1px solid var(--t-dimmer)", padding: "0 4px", fontSize: "11px" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SkillsOutput = () => {
  const tree = [
    {
      label: "backend",
      children: [
        { label: "FastAPI", checked: true },
        { label: "Node.js (v18.x)", checked: true },
        { label: "Express.js (v4.x)", checked: true },
        { label: "Django", checked: true },
        { label: "Flask" },
        { label: "REST APIs · JWT Auth · RBAC" },
      ],
    },
    {
      label: "ai-and-llm",
      children: [
        { label: "LangChain", checked: true },
        { label: "FAISS", checked: true },
        { label: "Groq API", checked: true },
        { label: "RAG Pipelines", checked: true },
        { label: "Semantic Search" },
        { label: "NLP · Prompt Engineering" },
      ],
    },
    {
      label: "cloud",
      children: [
        { label: "AWS (Cloud Practitioner)", checked: true },
        { label: "Docker", checked: true },
        { label: "GitHub Actions", checked: true },
        { label: "CI/CD Pipelines" },
        { label: "Linux · Render" },
      ],
    },
    {
      label: "databases",
      children: [
        { label: "PostgreSQL", checked: true },
        { label: "MongoDB", checked: true },
        { label: "MySQL" },
      ],
    },
    {
      label: "languages",
      children: [
        { label: "Python", checked: true },
        { label: "JavaScript", checked: true },
        { label: "Java" },
        { label: "SQL", checked: true },
      ],
    },
  ];

  return (
    <div className="output-block">
      <div style={{ color: "var(--t-dim)", marginBottom: "4px" }}>$ npm list --depth=2</div>
      <div>
        <div style={{ color: "var(--t-text)", fontWeight: "bold" }}>engineering-stack@2.1.0</div>
        {tree.map((cat, catIdx) => {
          const isLastCat = catIdx === tree.length - 1;
          return (
            <div
              key={cat.label}
              className="staggered-row"
              style={{ marginTop: "4px", ...getStaggerStyle(catIdx) }}
            >
              <div style={{ whiteSpace: "pre" }}>
                <span style={{ color: "var(--t-dimmer)" }}>{isLastCat ? "└── " : "├── "}</span>
                <span style={{ color: "var(--t-accent)", fontWeight: "bold" }}>{cat.label}</span>
              </div>
              {cat.children.map((child, childIdx) => {
                const isLastChild = childIdx === cat.children.length - 1;
                return (
                  <div key={child.label} style={{ whiteSpace: "pre", paddingLeft: "1.5rem" }}>
                    <span style={{ color: "var(--t-dimmer)" }}>{isLastCat ? "    " : "│   "}</span>
                    <span style={{ color: "var(--t-dimmer)" }}>{isLastChild ? "└── " : "├── "}</span>
                    <span style={{ color: "var(--t-text-mid)" }}>{child.label}</span>
                    {child.checked && <span style={{ color: "var(--t-green)" }}>  ✓</span>}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const STATUS_LABEL: Record<ProjectStatus, string> = {
  "in-use": "IN USE",
  done: "DONE",
  retired: "RETIRED",
};

const STATUS_COLOR: Record<ProjectStatus, string> = {
  "in-use": "var(--t-green)",
  done: "var(--t-text-mid)",
  retired: "var(--t-red)",
};

const findProject = (query: string) => {
  const q = query.trim().toLowerCase();
  const squash = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  return projects.find(
    (p) => p.id === q || p.name.toLowerCase() === q || squash(p.id) === squash(q) || squash(p.name) === squash(q)
  );
};

export const ProjectsOutput = ({ onExecuteCmd }: OutputProps) => {
  const exampleId = projects[0]?.id ?? "";

  return (
    <div className="output-block">
      <div style={{ color: "var(--t-dim)", marginBottom: "8px" }}>$ ps aux | grep projects</div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", maxWidth: "900px", minWidth: "560px" }}>
          <thead>
            <tr style={{ color: "var(--t-dim)", borderBottom: "1px solid var(--t-dimmer)", textAlign: "left" }}>
              <th style={{ padding: "4px 8px", fontWeight: "bold", width: "48px" }}>#</th>
              <th style={{ padding: "4px 8px", fontWeight: "bold", width: "240px" }}>NAME</th>
              <th style={{ padding: "4px 8px", fontWeight: "bold", width: "90px" }}>STATUS</th>
              <th style={{ padding: "4px 8px", fontWeight: "bold" }}>TYPE</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, pIdx) => (
              <tr
                key={p.id}
                className="term-row staggered-row"
                style={getStaggerStyle(pIdx)}
                onClick={() => onExecuteCmd(`project ${p.id}`)}
              >
                <td style={{ padding: "6px 8px", color: "var(--t-dim)" }}>{p.index}</td>
                <td style={{ padding: "6px 8px" }}>
                  <span className="cmd-link">{p.name}</span>
                </td>
                <td style={{ padding: "6px 8px", color: STATUS_COLOR[p.status], fontWeight: "bold" }}>
                  {STATUS_LABEL[p.status]}
                </td>
                <td style={{ padding: "6px 8px", color: "var(--t-text-mid)" }}>{p.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ color: "var(--t-dim)", fontSize: "12px", marginTop: "10px" }}>
        Tip: click a project name or type <span className="text-t-accent">project &lt;name&gt;</span> (e.g.{" "}
        <span className="cmd-link" onClick={() => onExecuteCmd(`project ${exampleId}`)}>project {exampleId}</span>) to see its details.
      </div>
    </div>
  );
};

export const ProjectDetailOutput = ({ args, onExecuteCmd }: OutputProps) => {
  const exampleId = projects[0]?.id ?? "";

  if (!args) {
    return (
      <div className="output-block" style={{ color: "var(--t-red)" }}>
        Error: please specify a project, e.g. `project {exampleId}`. Type `projects` to see the list.
      </div>
    );
  }

  const proj = findProject(args);

  if (!proj) {
    return (
      <div className="output-block" style={{ color: "var(--t-red)" }}>
        Error: project "{args}" not found. Type <span className="cmd-link" onClick={() => onExecuteCmd("projects")}>projects</span> to see all valid names.
      </div>
    );
  }

  return (
    <div className="output-block" style={{ maxWidth: "720px" }}>
      <div style={{ color: "var(--t-accent)", fontWeight: "bold", fontSize: "1.2rem", marginBottom: "0.25rem" }}>
        {proj.fullTitle}
      </div>
      <div style={{ color: "var(--t-blue)", marginBottom: "0.5rem" }}>
        {proj.role}, {proj.category}
      </div>

      <div style={{ border: "1px solid var(--t-dimmer)", padding: "12px", background: "var(--t-surface)", marginBottom: "12px" }}>
        <div><strong>Problem:</strong> <span style={{ color: "var(--t-text-mid)" }}>{proj.problem}</span></div>
        <div style={{ marginTop: "6px" }}><strong>Result:</strong> <span style={{ color: "var(--t-text-mid)" }}>{proj.impact}</span></div>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <strong>What I built:</strong>
        <ul style={{ paddingLeft: "20px", marginTop: "4px", fontSize: "13px" }}>
          {proj.highlights.map((h) => (
            <li key={h} style={{ color: "var(--t-text-mid)" }}>{h}</li>
          ))}
        </ul>
      </div>

      {proj.stack.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <strong>Stack:</strong>{" "}
          {proj.stack.map((s) => (
            <span key={s} style={{ display: "inline-block", marginRight: "6px", marginBottom: "4px", color: "var(--t-dim)", border: "1px solid var(--t-border)", padding: "0 6px", fontSize: "12px" }}>
              {s}
            </span>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: "16px", marginTop: "12px", flexWrap: "wrap" }}>
        {proj.github && (
          <a href={proj.github} target="_blank" rel="noopener noreferrer" className="ext-link">
            View source
          </a>
        )}
        {proj.npm && (
          <a href={proj.npm} target="_blank" rel="noopener noreferrer" className="ext-link">
            View on npm
          </a>
        )}
        {proj.live && (
          <a href={proj.live} target="_blank" rel="noopener noreferrer" className="ext-link">
            Open live site
          </a>
        )}
      </div>
    </div>
  );
};

const SHOWCASE_IDS = ["logistics-optimizer", "football-club-crm", "pyodide-sudoku"];

export const ShowcaseOutput = ({ onExecuteCmd }: OutputProps) => {
  const showcaseProjects = SHOWCASE_IDS.map((id) => projects.find((p) => p.id === id)).filter(
    (p): p is Project => Boolean(p)
  );

  return (
    <div className="output-block">
      <div style={{ color: "var(--t-dim)", marginBottom: "12px" }}>$ query showcase --visual</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "720px" }}>
        {showcaseProjects.map((p) => (
          <div key={p.id} className="showcase-card">
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", alignItems: "baseline", marginBottom: "4px" }}>
              <span className="cmd-link" style={{ fontWeight: "bold", fontSize: "1.1rem" }} onClick={() => onExecuteCmd(`project ${p.id}`)}>
                {p.name}
              </span>
              <span style={{ color: "var(--t-blue)", fontSize: "12px" }}>{p.category}</span>
            </div>
            <div style={{ color: "var(--t-text-mid)", fontSize: "13px", marginBottom: "4px" }}>{p.tagline}</div>
            <div style={{ color: "var(--t-text)", fontSize: "13px", marginBottom: "8px" }}>{p.impact}</div>
            <div style={{ color: "var(--t-dim)", fontSize: "12px", marginBottom: "8px" }}>{p.stack.join(", ")}</div>
            <div style={{ display: "flex", gap: "16px" }}>
              <span className="cmd-link" style={{ fontSize: "12px" }} onClick={() => onExecuteCmd(`project ${p.id}`)}>
                View details
              </span>
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="ext-link" style={{ fontSize: "12px" }}>
                  View source
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SnakeGame = () => {
  const WIDTH = 20;
  const HEIGHT = 10;
  const [snake, setSnake] = useState<[number, number][]>([[10, 5], [9, 5], [8, 5]]);
  const [food, setFood] = useState<[number, number]>([5, 5]);
  const [dir, setDir] = useState<"R" | "L" | "U" | "D">("R");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);

  // Focus utility to capture keyboard arrow keys
  useEffect(() => {
    if (isPlaying && !gameOver && gameRef.current) {
      gameRef.current.focus();
    }
  }, [isPlaying, gameOver]);

  // Handle arrow key presses
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isPlaying || gameOver) return;
    if (e.key === "ArrowUp" && dir !== "D") setDir("U");
    if (e.key === "ArrowDown" && dir !== "U") setDir("D");
    if (e.key === "ArrowLeft" && dir !== "R") setDir("L");
    if (e.key === "ArrowRight" && dir !== "L") setDir("R");
    e.preventDefault();
  };

  // Game Loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const spawnFood = (currentSnake: [number, number][]): [number, number] => {
      while (true) {
        const fx = Math.floor(Math.random() * WIDTH);
        const fy = Math.floor(Math.random() * HEIGHT);
        if (!currentSnake.some(([sx, sy]) => sx === fx && sy === fy)) {
          return [fx, fy];
        }
      }
    };

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        let newHead: [number, number];
        if (dir === "R") newHead = [head[0] + 1, head[1]];
        else if (dir === "L") newHead = [head[0] - 1, head[1]];
        else if (dir === "U") newHead = [head[0], head[1] - 1];
        else newHead = [head[0], head[1] + 1];

        // Wall collision
        if (newHead[0] < 0 || newHead[0] >= WIDTH || newHead[1] < 0 || newHead[1] >= HEIGHT) {
          console.log("Snake Wall Collision:", newHead, "Width:", WIDTH, "Height:", HEIGHT);
          setGameOver(true);
          clearInterval(interval);
          return prevSnake;
        }

        // Self collision
        if (prevSnake.some(([x, y]) => x === newHead[0] && y === newHead[1])) {
          console.log("Snake Self Collision:", newHead, "Snake:", prevSnake);
          setGameOver(true);
          clearInterval(interval);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Food collision
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setScore((s) => s + 10);
          setFood(spawnFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [isPlaying, gameOver, dir, food]);

  const resetGame = () => {
    setSnake([[10, 5], [9, 5], [8, 5]]);
    setFood([5, 5]);
    setDir("R");
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
    setTimeout(() => {
      gameRef.current?.focus();
    }, 10);
  };

  // Render Grid
  const renderGrid = () => {
    const lines: string[] = [];
    for (let y = 0; y < HEIGHT; y++) {
      let line = "";
      for (let x = 0; x < WIDTH; x++) {
        if (snake[0][0] === x && snake[0][1] === y) {
          line += "▣"; // Snake Head
        } else if (snake.some(([sx, sy]) => sx === x && sy === y)) {
          line += "■"; // Snake Body
        } else if (food[0] === x && food[1] === y) {
          line += "★"; // Food
        } else {
          line += "·"; // Empty space indicator
        }
      }
      lines.push(line);
    }
    return lines.join("\n");
  };

  const btnStyle: React.CSSProperties = {
    background: "var(--t-surface)",
    border: "1px solid var(--t-dim)",
    color: "var(--t-text)",
    width: "44px",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justify: "center",
    justifyContent: "center",
    fontSize: "18px",
    borderRadius: "4px",
    cursor: "pointer",
    touchAction: "manipulation",
    userSelect: "none"
  };

  return (
    <div
      ref={gameRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{
        outline: "none",
        border: "1px solid var(--t-border)",
        background: "var(--t-surface)",
        padding: "12px",
        maxWidth: "360px",
        margin: "10px 0"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontWeight: "bold" }}>
        <span style={{ color: "var(--t-accent)" }}>RETRO SNAKE GAME</span>
        <span>SCORE: {score}</span>
      </div>

      {!isPlaying && !gameOver ? (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <button
            className="cmd-link"
            onClick={() => setIsPlaying(true)}
            style={{ fontSize: "14px", background: "none", border: "none" }}
          >
            [ START GAME ]
          </button>
          <div style={{ color: "var(--t-dim)", fontSize: "11px", marginTop: "8px" }}>
            Use Arrow Keys or Mobile controls below to steer.
          </div>
        </div>
      ) : gameOver ? (
        <div style={{ textAlign: "center", padding: "20px 0", color: "var(--t-red)" }}>
          <div>GAME OVER</div>
          <button
            className="cmd-link"
            onClick={resetGame}
            style={{ fontSize: "14px", background: "none", border: "none", marginTop: "10px" }}
          >
            [ PLAY AGAIN ]
          </button>
        </div>
      ) : (
        <pre style={{
          lineHeight: "1.2",
          letterSpacing: "4px",
          textAlign: "center",
          margin: "10px 0",
          color: "var(--t-text)"
        }}>
          {renderGrid()}
        </pre>
      )}

      {/* Mobile controls */}
      {isPlaying && !gameOver && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", marginTop: "12px" }}>
          <button
            style={btnStyle}
            onClick={() => dir !== "D" && setDir("U")}
          >
            ▲
          </button>
          <div style={{ display: "flex", gap: "16px" }}>
            <button
              style={btnStyle}
              onClick={() => dir !== "R" && setDir("L")}
            >
              ◀
            </button>
            <button
              style={btnStyle}
              onClick={() => dir !== "L" && setDir("R")}
            >
              ▶
            </button>
          </div>
          <button
            style={btnStyle}
            onClick={() => dir !== "U" && setDir("D")}
          >
            ▼
          </button>
        </div>
      )}
    </div>
  );
};
