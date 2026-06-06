import React, { useState } from "react";
import { personal, education, experience, projects, capabilities, certifications } from "@/data/portfolio";
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

export const ProjectsOutput = ({ onExecuteCmd }: OutputProps) => {
  const tableProjects = [
    { pid: "1042", id: "contexta-ai", name: "Contexta AI", status: "RUNNING", stack: "FastAPI · LangChain · VectorDB" },
    { pid: "1089", id: "pro-talent-connect", name: "Pro Talent Connect", status: "RUNNING", stack: "NodeJS · Express · MongoDB" },
    { pid: "1023", id: "docDistill", name: "DocDistill", status: "RUNNING", stack: "FastAPI · LangChain · FAISS" },
    { pid: "0756", id: "auto-committer", name: "GitHub Auto Committer", status: "RUNNING", stack: "Python · GitHub API" },
    { pid: "0891", id: "pocket-soccer-scout", name: "Pocket Soccer Scout", status: "EXITED", stack: "NodeJS · Express · MongoDB" },
  ];

  return (
    <div className="output-block">
      <div style={{ color: "var(--t-dim)", marginBottom: "8px" }}>$ ps aux | grep projects</div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", maxWidth: "780px", minWidth: "500px" }}>
          <thead>
            <tr style={{ color: "var(--t-dim)", borderBottom: "1px solid var(--t-dimmer)", textAlign: "left" }}>
              <th style={{ padding: "4px 8px", fontWeight: "bold", width: "80px" }}>PID</th>
              <th style={{ padding: "4px 8px", fontWeight: "bold", width: "200px" }}>NAME</th>
              <th style={{ padding: "4px 8px", fontWeight: "bold", width: "100px" }}>STATUS</th>
              <th style={{ padding: "4px 8px", fontWeight: "bold" }}>STACK</th>
            </tr>
          </thead>
          <tbody>
            {tableProjects.map((p, pIdx) => (
              <tr
                key={p.pid}
                className="term-row staggered-row"
                style={getStaggerStyle(pIdx)}
                onClick={() => onExecuteCmd(`project ${p.id}`)}
              >
                <td style={{ padding: "6px 8px", color: "var(--t-dim)" }}>{p.pid}</td>
                <td style={{ padding: "6px 8px" }}>
                  <span className="cmd-link">{p.name}</span>
                </td>
                <td style={{ padding: "6px 8px", color: p.status === "RUNNING" ? "var(--t-green)" : "var(--t-red)", fontWeight: "bold" }}>
                  {p.status}
                </td>
                <td style={{ padding: "6px 8px", color: "var(--t-text-mid)" }}>{p.stack}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ color: "var(--t-dim)", fontSize: "12px", marginTop: "10px" }}>
        Tip: Click on any project name or type <span className="text-t-accent">project &lt;name&gt;</span> (e.g., <span className="cmd-link" onClick={() => onExecuteCmd("project contexta-ai")}>project contexta-ai</span>) to view its rich detail page.
      </div>
    </div>
  );
};

export const ProjectDetailOutput = ({ args, onExecuteCmd }: OutputProps) => {
  if (!args) {
    return (
      <div className="output-block" style={{ color: "var(--t-red)" }}>
        Error: Please specify a project ID. E.g., `project contexta-ai`. Type `projects` to see list.
      </div>
    );
  }

  const projId = args.trim().toLowerCase();
  const proj = projects.find((p) => p.id.toLowerCase() === projId || p.name.toLowerCase() === projId || p.id.toLowerCase().replace(/-/g, "") === projId.replace(/-/g, ""));

  if (!proj) {
    // Check if it's the auto-committer
    if (projId === "auto-committer" || projId === "github-auto-committer" || projId === "commit") {
      return (
        <div className="output-block" style={{ maxWidth: "700px" }}>
          <div style={{ color: "var(--t-accent)", fontWeight: "bold", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
            GitHub Auto Committer
          </div>
          <div style={{ color: "var(--t-blue)", marginBottom: "8px" }}>Automation & Integration Platform</div>
          <div style={{ marginBottom: "12px" }}>
            <strong>Problem:</strong> Managing structured schedule testing workflows manually is labor-intensive and prone to developer drift.
            <br />
            <strong>Solution:</strong> Developed a scheduler platform using the GitHub REST API and secure execution.
          </div>
          <ul style={{ paddingLeft: "20px", color: "var(--t-text-mid)", fontSize: "13px" }}>
            <li>Automated commit scheduling workflows.</li>
            <li>Randomized execution logic to mimic natural activity.</li>
            <li>Fully integrated with the GitHub REST API securely.</li>
            <li>Deployed containerized instance to Render.</li>
          </ul>
          <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
            <a href="https://github.com/Anubothu-Aravind/Commit" target="_blank" rel="noopener noreferrer" className="ext-link">
              GitHub Repo →
            </a>
            <a href="https://refactored-waffle-2ja9.onrender.com" target="_blank" rel="noopener noreferrer" className="ext-link">
              Deployment Link →
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className="output-block" style={{ color: "var(--t-red)" }}>
        Error: Project "{args}" not found. Type <span className="cmd-link" onClick={() => onExecuteCmd("projects")}>projects</span> to see all valid IDs.
      </div>
    );
  }

  return (
    <div className="output-block" style={{ maxWidth: "700px" }}>
      <div style={{ color: "var(--t-accent)", fontWeight: "bold", fontSize: "1.2rem", marginBottom: "0.25rem" }}>
        {proj.name}
      </div>
      <div style={{ color: "var(--t-blue)", fontWeight: "bold", marginBottom: "0.5rem" }}>
        {proj.category} — {proj.tagline}
      </div>

      <div style={{ border: "1px solid var(--t-dimmer)", padding: "12px", background: "var(--t-surface)", marginBottom: "12px" }}>
        <div><strong>Problem:</strong> <span style={{ color: "var(--t-text-mid)" }}>{proj.problem}</span></div>
        <div style={{ marginTop: "4px" }}><strong>Solution:</strong> <span style={{ color: "var(--t-text-mid)" }}>{proj.solution}</span></div>
      </div>

      <div style={{ color: "var(--t-text-mid)", lineHeight: "1.6", marginBottom: "12px" }}>
        {proj.description}
      </div>

      <div style={{ marginBottom: "12px" }}>
        <strong>Key Architectural Highlights:</strong>
        <ul style={{ paddingLeft: "20px", marginTop: "4px", fontSize: "13px" }}>
          {proj.highlights.map((h, idx) => (
            <li key={idx} style={{ color: "var(--t-text-mid)" }}>{h}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <strong>Stack:</strong>{" "}
        {proj.stack.map((s) => (
          <span key={s} style={{ display: "inline-block", marginRight: "6px", color: "var(--t-dim)", border: "1px solid var(--t-border)", padding: "0 6px", fontSize: "12px" }}>
            {s}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
        {proj.github && (
          <a href={proj.github} target="_blank" rel="noopener noreferrer" className="ext-link">
            GitHub Repo →
          </a>
        )}
        {proj.live && (
          <a href={proj.live} target="_blank" rel="noopener noreferrer" className="ext-link">
            Live Demo →
          </a>
        )}
      </div>
    </div>
  );
};

export const ShowcaseOutput = ({ onExecuteCmd }: OutputProps) => {
  const showcaseProjects = projects.slice(0, 3);

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
            <div style={{ color: "var(--t-text-mid)", fontSize: "13px", marginBottom: "8px" }}>
              {p.tagline}
            </div>
            <div style={{ color: "var(--t-dim)", fontSize: "12px", marginBottom: "8px" }}>
              {p.stack.join(" · ")}
            </div>
            <div style={{ display: "flex", gap: "16px" }}>
              <span className="cmd-link" style={{ fontSize: "12px" }} onClick={() => onExecuteCmd(`project ${p.id}`)}>
                View Details [cmd] →
              </span>
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="ext-link" style={{ fontSize: "12px" }}>
                  code →
                </a>
              )}
              {p.live && (
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="ext-link" style={{ fontSize: "12px" }}>
                  live →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
