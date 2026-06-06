// Single source of truth — all data sourced from cv.md

export const personal = {
  name: "Aravind Anubothu",
  location: "Tenali, Andhra Pradesh, India",
  email: "aravind.anubothu13@gmail.com",
  phone: "+91 8374005347",
  github: "https://github.com/Anubothu-Aravind",
  linkedin: "https://linkedin.com/in/anubothu-aravind",
  portfolio: "https://anubothu-aravind.vercel.app",
  headline: "Building scalable software systems\nand AI-powered products.",
  descriptor: "Backend Engineer · AI Systems · Cloud Infrastructure",
  profileImage: "/assets/images/personal/aravind.jpg",
  profileImageFallback: "https://res.cloudinary.com/dhsw1nyfx/image/upload/v1749221400/aravind_qtkpsj.png",
  available: true,
};

export const experience = [
  {
    id: "thoughtiv",
    role: "Backend & AI Engineering Intern",
    company: "Thoughtiv",
    project: "HonestAI",
    duration: "Aug 2025 – Nov 2025",
    type: "Internship",
    impact: [
      "Developed REST APIs using Python and backend engineering principles",
      "Applied Test-Driven Development (TDD) across backend modules",
      "Deployed services via Docker and AWS within Agile team workflows",
      "Participated in debugging, testing, and operational support activities",
    ],
    stack: ["Python", "FastAPI", "Docker", "AWS", "TDD", "Agile", "REST APIs"],
    github: "https://github.com/Anubothu-Aravind/honestai",
  },
  {
    id: "freelance",
    role: "Freelance Backend & AI Developer",
    company: "Independent",
    project: null,
    duration: "2024 – Present",
    type: "Freelance",
    impact: [
      "Delivered 5+ production-grade backend and AI applications end-to-end",
      "Designed and implemented 30+ secure REST API endpoints",
      "Built scalable backend services with authentication and validation workflows",
      "Deployed applications using Docker, AWS, CI/CD pipelines, and cloud platforms",
    ],
    stack: ["Python", "Node.js", "FastAPI", "Docker", "AWS", "CI/CD", "LangChain"],
    github: null,
  },
];

export const projects = [
  {
    id: "contexta-ai",
    index: "01",
    name: "Contexta AI",
    tagline: "GenAI Research Paper Assistant",
    category: "AI System",
    problem: "Researchers can't efficiently extract structured insights from dense academic papers at scale.",
    solution: "RAG-powered AI assistant with semantic vector retrieval, contextual Q&A, and real-time PDF processing.",
    description: "Built a full-stack AI assistant for interacting with research papers using semantic retrieval and contextual search. PDF ingestion, vector embeddings, and a conversational interface over any document.",
    highlights: [
      "RAG pipeline with FAISS vector search",
      "PDF ingestion and intelligent document parsing",
      "Context-aware conversational Q&A",
      "AI-based summarization and insight extraction",
      "Persistent vector storage and retrieval",
    ],
    stack: ["FastAPI", "LangChain", "FAISS", "Groq API", "React"],
    github: "https://github.com/Anubothu-Aravind/Contexta-AI",
    live: null,
  },
  {
    id: "pro-talent-connect",
    index: "02",
    name: "Pro Talent Connect",
    tagline: "Football Talent Discovery Platform",
    category: "Backend System",
    problem: "Football talent scouts lack a centralized, structured system for discovering and managing player profiles.",
    solution: "Full backend infrastructure with role-based access, 50+ API endpoints, and secure admin workflows.",
    description: "Developed the entire backend for a football talent discovery and management platform. Role-based access control, authentication, player profile management, and scalable API infrastructure.",
    highlights: [
      "50+ REST API endpoints with full documentation",
      "Role-based access control (RBAC) system",
      "JWT authentication and admin workflows",
      "Scalable API infrastructure on production",
    ],
    stack: ["Node.js", "Express.js", "MongoDB", "JWT", "RBAC"],
    github: "https://github.com/LasyWorks/Pro-Talent-Connect",
    live: "https://protalentconnect.co.in",
  },
  {
    id: "docDistill",
    index: "03",
    name: "DocDistill",
    tagline: "RAG-based Research Intelligence",
    category: "AI System",
    problem: "Academic research consumes enormous time in manual document review with no intelligent retrieval layer.",
    solution: "Semantic document intelligence with AI-powered retrieval, voice-enabled responses, and structured Q&A.",
    description: "Developed a semantic document intelligence system for interacting with research papers using AI-powered contextual retrieval. Secure document ingestion, semantic retrieval, and voice-enabled AI responses.",
    highlights: [
      "Semantic retrieval over uploaded documents",
      "Voice-enabled AI responses",
      "Secure document ingestion workflows",
      "Structured maintainable AI retrieval pipeline",
    ],
    stack: ["FastAPI", "LangChain", "FAISS", "Groq API"],
    github: null,
    live: null,
  },
  {
    id: "pocket-soccer-scout",
    index: "04",
    name: "Pocket Soccer Scout",
    tagline: "Sports Management Backend",
    category: "Backend System",
    problem: "Sports management teams need reliable, secure backend infrastructure for administrative operations.",
    solution: "Secure backend with JWT auth, Super Admin workflows, rate limiting, and data validation systems.",
    description: "Built backend services for sports management workflows. JWT authentication, admin and super-admin privilege layers, rate limiting, and comprehensive data validation.",
    highlights: [
      "JWT authentication with Super Admin workflows",
      "Rate limiting and API security layer",
      "Comprehensive data validation systems",
      "Maintainable modular backend architecture",
    ],
    stack: ["Node.js", "Express.js", "MongoDB", "JWT"],
    github: "https://github.com/LasyWorks/Pocket-Soccer-Scout",
    live: "https://pocket-soccer-scout.vercel.app",
  },
];

export const capabilities = [
  {
    area: "Backend Engineering",
    tools: ["FastAPI", "Node.js", "Express.js", "Django", "Flask", "REST APIs", "JWT Auth", "RBAC", "API Security"],
  },
  {
    area: "AI & LLM Systems",
    tools: ["LangChain", "FAISS", "RAG Pipelines", "LLM Integration", "Groq API", "Semantic Search", "Prompt Engineering", "Vector Databases", "NLP"],
  },
  {
    area: "Cloud & Infrastructure",
    tools: ["Docker", "AWS", "GitHub Actions", "CI/CD", "Linux", "Render"],
  },
  {
    area: "Databases",
    tools: ["PostgreSQL", "MongoDB", "MySQL"],
  },
  {
    area: "Languages",
    tools: ["Python", "JavaScript", "Java", "SQL"],
  },
  {
    area: "Engineering Practices",
    tools: ["TDD", "System Design", "Agile", "OOP", "Design Patterns", "SDLC"],
  },
];

export const certifications = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    type: "Cloud",
    date: "2024-03",
    description: "Validated AWS Cloud fundamentals including billing, security, and core services like EC2, S3, and RDS.",
    localUrl: "/assets/images/certificates/aws_cloud_practitioner.png",
    fallbackUrl: "https://res.cloudinary.com/dhsw1nyfx/image/upload/v1749226448/2200080137_AWS_Certified_Cloud_Practitioner_certificate_1_-1_gnipbb.png",
  },
  {
    title: "Salesforce AI Associate",
    issuer: "Salesforce",
    type: "AI",
    date: "2024-06",
    description: "Certified Salesforce AI Associate with understanding of ethical AI use, Einstein tools, and practical CRM applications.",
    localUrl: "/assets/images/certificates/2200080137_Salesforces_AIAssociate_20241026-1.png",
    fallbackUrl: "https://res.cloudinary.com/dhsw1nyfx/image/upload/v1749226452/2200080137_Salesforces_AIAssociate_20241026-1_fqujly.png",
  },
  {
    title: "Python (Basic)",
    issuer: "HackerRank",
    type: "Programming",
    date: "2023-11",
    description: "Demonstrated core Python programming and logical problem-solving skills through HackerRank certification.",
    localUrl: "/assets/images/certificates/hackerrank_python_basic.png",
    fallbackUrl: "https://res.cloudinary.com/dhsw1nyfx/image/upload/v1749226457/python_basic_certificate-1_s4t4tf.png",
  },
  {
    title: "Problem Solving (Basic)",
    issuer: "HackerRank",
    type: "Engineering",
    date: "2023-08",
    description: "Certified for fundamental algorithmic thinking and logical problem solving on HackerRank platform.",
    localUrl: "/assets/images/certificates/hackerrank_problem_solving_basic.png",
    fallbackUrl: "https://res.cloudinary.com/dhsw1nyfx/image/upload/v1749226457/problem_solving_basic_certificate-1_qa56d8.png",
  },
  {
    title: "Aviatrix Certified Engineer",
    issuer: "Aviatrix",
    type: "Network",
    date: "2025-01",
    description: "Earned certification in multicloud network architecture, secure routing, and cloud-native networking using Aviatrix.",
    localUrl: "/assets/images/certificates/aviatrix_certified_engineer.png",
    fallbackUrl: "https://res.cloudinary.com/dhsw1nyfx/image/upload/v1749226143/2200080137_MultiCloudNetwork-1_fnusnn.png",
  },
  {
    title: "Essentials Automation Professional",
    issuer: "Automation Anywhere",
    type: "Automation",
    date: "2025-02",
    description: "Completed foundational certification on RPA concepts, bots, and automation workflows using Automation Anywhere platform.",
    localUrl: "/assets/images/certificates/automation_anywhere_essentials.png",
    fallbackUrl: "https://res.cloudinary.com/dhsw1nyfx/image/upload/v1749226450/2200080137_Essentials_Automation_Certification_2024-1_vfijsh.png",
  },
  {
    title: "IBM Python for Data Science",
    issuer: "IBM Skills Network",
    type: "Data Science",
    date: "2023-09",
    description: "Hands-on course on Python for Data Science, covering libraries like Pandas, NumPy, and visualization tools.",
    localUrl: "/assets/images/certificates/ibm_python_cepytiin.png",
    fallbackUrl: "https://res.cloudinary.com/dhsw1nyfx/image/upload/v1749226450/2200080137_IBMCE_CEPYT1IN_Certificate___IBM-1_vjkpbm.png",
  },
];

export const education = {
  institution: "KL University, Vijayawada",
  degree: "Bachelor of Technology (B.Tech)",
  field: "Artificial Intelligence and Data Science",
  duration: "2022 – Present",
  cgpa: "9.6 / 10",
};

export const leadership = {
  role: "Technical Lead",
  org: "Intelligentsia Club",
  highlights: [
    "Led AI and software engineering initiatives",
    "Organized workshops and technical events with 100+ participants",
    "Mentored students during hackathons and project development",
    "Conducted sessions on backend systems and AI applications",
  ],
};
