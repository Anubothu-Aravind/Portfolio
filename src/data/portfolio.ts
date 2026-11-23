// Single source of truth — all data sourced from cv.md

export const personal = {
  name: "Aravind Anubothu",
  location: "Vijayawada, Andhra Pradesh, India",
  hometown: "Tenali",
  email: "aravind.anubothu13@gmail.com",
  phone: "+91 8374005347",
  github: "https://github.com/Anubothu-Aravind",
  linkedin: "https://linkedin.com/in/anubothu-aravind",
  portfolio: "https://anubothu-aravind.vercel.app",
  headline: "Building scalable software systems\nand AI-powered products.",
  descriptor: "Full-stack and AI developer",
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
    role: "Freelance Full Stack & AI Developer",
    company: "Independent",
    project: null,
    duration: "Nov 2025 – Mar 2026",
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

export type ProjectStatus = "in-use" | "done" | "retired";

export type Project = {
  id: string;
  index: string;
  name: string;
  tagline: string;
  fullTitle: string;
  role: string;
  category: string;
  status: ProjectStatus;
  problem: string;
  highlights: string[];
  impact: string;
  stack: string[];
  github: string | null;
  npm: string | null;
  live: string | null;
  image?: string;
  imageAlt?: string;
};

export const projects: Project[] = [
  {
    "id": "logistics-optimizer",
    "index": "01",
    "name": "Intelligent Logistics",
    "tagline": "Dynamic route optimization on a real road network",
    "fullTitle": "Intelligent Logistics and Dynamic Route Optimization System",
    "role": "Full-Stack & Algorithm Developer",
    "category": "M.Tech Project",
    "status": "done",
    "problem": "Static logistics planning cannot efficiently handle changing traffic conditions, new delivery orders, road closures and vehicle availability.",
    "highlights": [
      "Built a full-stack logistics platform using the real Vijayawada road network.",
      "Implemented Dijkstra, A*, Bidirectional Dijkstra, Floyd-Warshall and Yen's K-shortest path algorithms.",
      "Implemented CVRP optimization using Clarke-Wright Savings, Nearest Neighbour, Regret-2 Insertion and Genetic Algorithms.",
      "Developed dynamic route re-optimization, fleet simulation and real-time event monitoring.",
      "Implemented benchmarking and analytics for comparing optimization strategies."
    ],
    "impact": "Demonstrated fleet optimization using 100 orders and 10 vans, with zero late deliveries in the documented scenario.",
    "stack": [
      "Python",
      "FastAPI",
      "React",
      "Vite",
      "Tailwind CSS",
      "SQLAlchemy",
      "SQLite",
      "WebSockets",
      "Leaflet",
      "OpenStreetMap"
    ],
    "github": "https://github.com/Anubothu-Aravind/Intelligent-Logistics-and-Dynamic-Route-Optimization-System",
    "npm": null,
    "live": null,
    "image": "/assets/images/projects/logistics-optimizer.webp",
    "imageAlt": "Intelligent Logistics Route and Dispatch screen: 100 of 100 orders assigned, colour-coded van routes on a map of Vijayawada"
  },
  {
    "id": "football-club-crm",
    "index": "02",
    "name": "Football Club CRM",
    "tagline": "Pocket Soccer Scout: player and tournament management",
    "fullTitle": "Football Club CRM (Pocket Soccer Scout)",
    "role": "Freelance Full-Stack Developer",
    "category": "Freelance / Production Project",
    "status": "in-use",
    "problem": "Football clubs need a centralized platform to manage enrolled students, player records, coaches, administrators and club tournaments.",
    "highlights": [
      "Developed full-stack player and tournament management modules.",
      "Implemented JWT authentication and role-based administrative access.",
      "Built player directory, filtering and CRUD workflows.",
      "Developed tournament management and coach portal interfaces.",
      "Implemented responsive frontend and REST API integration."
    ],
    "impact": "Currently used by the client to manage club-enrolled students and club-hosted tournaments.",
    "stack": [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "Mongoose",
      "JWT",
      "Bcrypt"
    ],
    "github": "https://github.com/Anubothu-Aravind/FootBall_Club_CRM",
    "npm": null,
    "live": null,
    "image": "/assets/images/projects/football-club-crm.webp",
    "imageAlt": "Anantapur Football Club home page with a pitch hero and Play Now and Join Academy buttons"
  },
  {
    "id": "pro-talent-connect",
    "index": "03",
    "name": "Pro Talent Connect",
    "tagline": "Football talent discovery and scouting platform",
    "fullTitle": "Pro Talent Connect",
    "role": "Freelance Full-Stack Developer",
    "category": "Freelance Project",
    "status": "done",
    "problem": "Football talent discovery and scouting operations require a centralized platform for player profiles, scouting information and talent-related opportunities.",
    "highlights": [
      "Developed public-facing player discovery and profile management interfaces.",
      "Implemented administrative dashboards for players, leagues, blogs and services.",
      "Built secure authentication, role-based authorization and OTP-assisted operations.",
      "Implemented API validation, rate limiting, caching and audit logging.",
      "Developed enquiry and player profile request workflows.",
      "Built a Jenkins-based CI/CD pipeline to automate build, testing and deployment."
    ],
    "impact": "Developed a production-oriented football talent platform with public discovery and secure administrative workflows.",
    "stack": [
      "React 19",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Joi",
      "Axios",
      "Jenkins"
    ],
    "github": "https://github.com/Anubothu-Aravind/Pro-Talent-Connect",
    "npm": null,
    "live": "https://protalentconnect.co.in",
    "image": "/assets/images/projects/pro-talent-connect.webp",
    "imageAlt": "Pro Talent Connect home page: a stadium hero reading Discover, Analyze, with featured players below"
  },
  {
    "id": "next-zen-store",
    "index": "04",
    "name": "Next Zen Store",
    "tagline": "Bilingual online grocery store with admin back office",
    "fullTitle": "Next Zen Store",
    "role": "Freelance Full-Stack Developer",
    "category": "Freelance Project",
    "status": "retired",
    "problem": "Retail businesses require an online grocery platform for product discovery, customer ordering, inventory operations and administrative management.",
    "highlights": [
      "Developed a Next.js storefront and Express backend API.",
      "Implemented product catalog, category browsing, search and cart workflows.",
      "Developed customer authentication using Google OAuth and email OTP.",
      "Implemented bilingual English and Telugu product catalog support.",
      "Built administrative modules for products, inventory, orders, promotions, invoices and reports."
    ],
    "impact": "Developed a full-stack grocery commerce platform with customer and administrative workflows. Client subsequently decided not to continue hosting the website.",
    "stack": [
      "Next.js",
      "React",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "MySQL",
      "Tailwind CSS",
      "Google OAuth"
    ],
    "github": "https://github.com/Anubothu-Aravind/Next_Zen_Store",
    "npm": null,
    "live": null,
    "image": "/assets/images/projects/next-zen-store.webp",
    "imageAlt": "Next Zen Store product listing with category filters and grocery items"
  },
  {
    "id": "emotion-recognition",
    "index": "05",
    "name": "Emotion Recognition Chatbot",
    "tagline": "Facial emotion recognition for personalized chatbots",
    "fullTitle": "AI-Driven Emotion Recognition for Personalized Chatbot Conversations",
    "role": "Machine Learning Developer",
    "category": "B.Tech Mini Project – Third Year",
    "status": "done",
    "problem": "Traditional chatbot systems lack visual emotional context, limiting their ability to personalize interactions based on a user's facial expressions.",
    "highlights": [
      "Implemented CNN-based facial emotion and gender recognition.",
      "Integrated face detection and preprocessing for image and video inputs.",
      "Used pre-trained Mini-XCEPTION and CNN models for inference.",
      "Developed webcam-based real-time emotion recognition.",
      "Created a Flask-based web interface for remote webcam visualization."
    ],
    "impact": "Implemented image-based and real-time webcam emotion recognition with multiple emotion classification capabilities.",
    "stack": [
      "Python",
      "TensorFlow",
      "Keras",
      "CNN",
      "OpenCV",
      "NumPy",
      "Pandas",
      "Flask"
    ],
    "github": "https://github.com/Anubothu-Aravind/AI-Driven-Emotion-Recognition-Model-For-Personalized-Chatbot-Conversations",
    "npm": null,
    "live": null
  },
  {
    "id": "netscope",
    "index": "06",
    "name": "NetScope",
    "tagline": "TCP reliability and performance under network impairments",
    "fullTitle": "NetScope – TCP Reliability and Performance under Network Impairments",
    "role": "M.Tech Project Contributor",
    "category": "M.Tech Course Project – Year 1, Semester 1",
    "status": "done",
    "problem": "Understanding TCP performance degradation under packet loss, latency and bandwidth restrictions requires controlled experiments and packet-level analysis.",
    "highlights": [
      "Developed an interactive TCP diagnostic and file transfer platform.",
      "Implemented network impairment injection using tc netem and userspace simulation.",
      "Integrated live throughput, RTT, congestion window and retransmission monitoring.",
      "Implemented packet capture and analysis using Wireshark and tshark.",
      "Developed interactive TCP ladder visualization and packet replay."
    ],
    "impact": "Enabled experimentation across 11 network impairment scenarios with packet-level diagnostics and SHA-256 file integrity verification.",
    "stack": [
      "Python",
      "FastAPI",
      "React",
      "Vite",
      "WebSockets",
      "TCP Sockets",
      "Linux tc netem",
      "Wireshark",
      "tshark",
      "Network Namespaces"
    ],
    "github": "https://github.com/Anubothu-Aravind/NetScope",
    "npm": null,
    "live": null,
    "image": "/assets/images/projects/netscope.webp",
    "imageAlt": "NetScope network impairments screen with delay, loss and bandwidth controls"
  },
  {
    "id": "graphshield",
    "index": "07",
    "name": "GraphShield",
    "tagline": "Graph-based Sybil detection",
    "fullTitle": "GraphShield – Graph-Based Sybil Detection System",
    "role": "Machine Learning Developer",
    "category": "M.Tech Course Project – Year 1, Semester 1",
    "status": "done",
    "problem": "Detecting fake and malicious identities in social networks is difficult when only a limited number of accounts have verified labels.",
    "highlights": [
      "Implemented semi-supervised graph-based Sybil detection using custom sparse label propagation.",
      "Developed graph construction and sparse matrix processing pipelines.",
      "Implemented random-walk and symmetric normalized transition operators.",
      "Integrated synthetic, Cora and PubMed datasets.",
      "Developed interactive graph exploration and classification benchmarking.",
      "Implemented leakage-free evaluation using accuracy, precision, recall, F1-score and ROC-AUC."
    ],
    "impact": "Reported 81.1% accuracy on the PubMed benchmark with approximately 0.888-second execution time.",
    "stack": [
      "Python",
      "Streamlit",
      "NetworkX",
      "NumPy",
      "SciPy",
      "PyTorch",
      "PyTorch Geometric",
      "Scikit-learn",
      "PyVis",
      "Plotly"
    ],
    "github": "https://github.com/Anubothu-Aravind/graph-sybil-detection",
    "npm": null,
    "live": null,
    "image": "/assets/images/projects/graphshield.webp",
    "imageAlt": "GraphShield graph showing honest communities and a Sybil cluster joined by a few attack edges"
  },
  {
    "id": "pyodide-sudoku",
    "index": "08",
    "name": "Sudoku Engine",
    "tagline": "Python Sudoku solver running in the browser via WebAssembly",
    "fullTitle": "Sudoku Engine and Interactive Web Application",
    "role": "Full-Stack & Algorithm Developer",
    "category": "M.Tech Course Project – Year 1, Semester 1",
    "status": "done",
    "problem": "Build a browser-based Sudoku application that provides interactive gameplay and algorithm visualization without depending on a traditional backend server.",
    "highlights": [
      "Developed a Python-based Sudoku engine running inside the browser through Pyodide and WebAssembly.",
      "Implemented backtracking with Minimum Remaining Values and constraint propagation.",
      "Implemented Knuth's Dancing Links algorithm as an alternative solver.",
      "Developed deterministic puzzle generation and difficulty grading.",
      "Built endless campaign, free-play and step-by-step solver visualization modes.",
      "Implemented Web Workers, IndexedDB persistence and offline PWA support."
    ],
    "impact": "Delivered a zero-backend, offline-capable Sudoku application with 95 Python tests, 16 frontend tests and 5 end-to-end tests documented in the repository.",
    "stack": [
      "Python",
      "Pyodide",
      "WebAssembly",
      "React 19",
      "TypeScript",
      "Vite",
      "Web Workers",
      "IndexedDB",
      "PWA",
      "Playwright"
    ],
    "github": "https://github.com/Anubothu-Aravind/pyodide-sudoku",
    "npm": null,
    "live": null,
    "image": "/assets/images/projects/pyodide-sudoku.webp",
    "imageAlt": "Sudoku engine solver view with candidate numbers and the step-by-step solver controls"
  },
  {
    "id": "mappath",
    "index": "09",
    "name": "MapPath",
    "tagline": "Pathfinding algorithm visualizer on real maps",
    "fullTitle": "MapPath – Pathfinding Algorithm Visualizer on Real Maps",
    "role": "Algorithm Developer",
    "category": "Side Project",
    "status": "done",
    "problem": "Understanding differences between pathfinding algorithms requires visualizing their search behavior and comparing their performance on realistic road networks.",
    "highlights": [
      "Developed an interactive pathfinding visualizer using real OpenStreetMap road networks.",
      "Implemented Dijkstra, A*, BFS, DFS and Greedy Best-First Search.",
      "Developed concurrent algorithm execution using asyncio and FastAPI.",
      "Implemented step-by-step exploration streaming using Server-Sent Events.",
      "Built synchronized map visualizations using HTML5 Canvas.",
      "Implemented quantitative comparison of execution time, explored nodes, path distance and algorithm complexity."
    ],
    "impact": "Enabled simultaneous comparison of five pathfinding algorithms on real geographical road networks.",
    "stack": [
      "Python",
      "FastAPI",
      "OSMnx",
      "OpenStreetMap",
      "JavaScript",
      "HTML5 Canvas",
      "Server-Sent Events",
      "Pytest"
    ],
    "github": "https://github.com/Anubothu-Aravind/CTP_project",
    "npm": null,
    "live": null
  },
  {
    "id": "vastrams",
    "index": "10",
    "name": "Vastrams",
    "tagline": "Vendor finance management dashboard",
    "fullTitle": "Vastrams – Vendor Finance Management System",
    "role": "Freelance Full-Stack Developer",
    "category": "Freelance / Internal Dashboard",
    "status": "done",
    "problem": "Businesses require a centralized internal system to manage vendor records, payments, cheques, financiers and reconciliation workflows.",
    "highlights": [
      "Developed a full-stack vendor and finance management application.",
      "Implemented backend APIs using Express.js and MongoDB.",
      "Developed vendor, payment, cheque and financier management workflows.",
      "Implemented JWT access and refresh token authentication.",
      "Built internal dashboard interfaces for financial operations."
    ],
    "impact": "Delivered an internal client dashboard for vendor and financial management operations.",
    "stack": [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT"
    ],
    "github": "https://github.com/Anubothu-Aravind/Vendor-Finance",
    "npm": null,
    "live": null
  },
  {
    "id": "erp-autofill",
    "index": "11",
    "name": "KL ERP Autofill Helper",
    "tagline": "Browser extension for university ERP login",
    "fullTitle": "KL ERP Autofill Helper",
    "role": "Extension Developer",
    "category": "Side Project",
    "status": "done",
    "problem": "Repeated manual entry of university ERP login credentials and CAPTCHA verification creates friction during login.",
    "highlights": [
      "Developed a cross-browser extension for Chrome, Brave and Firefox.",
      "Implemented automatic ERP username and password field population.",
      "Integrated OCR.space API for CAPTCHA image recognition.",
      "Implemented local credential storage using browser.storage.local.",
      "Added manual CAPTCHA fallback when OCR recognition fails."
    ],
    "impact": "Automated ERP login form population and CAPTCHA recognition while retaining manual submission by the user.",
    "stack": [
      "JavaScript",
      "Chrome Extension Manifest V3",
      "Browser Storage API",
      "OCR.space API",
      "HTML",
      "CSS"
    ],
    "github": "https://github.com/Anubothu-Aravind/newerp_extention",
    "npm": null,
    "live": null,
    "image": "/assets/images/projects/erp-autofill.webp",
    "imageAlt": "KL ERP Helper browser extension popup with username and password fields"
  },
  {
    "id": "datepicker",
    "index": "12",
    "name": "Aravind Datepicker",
    "tagline": "React date picker component library on npm",
    "fullTitle": "Aravind Datepicker – React Component Library",
    "role": "Package Author and Publisher",
    "category": "Open-Source / Side Project",
    "status": "done",
    "problem": "React applications frequently require reusable date selection components with consistent styling, customization and date-range functionality.",
    "highlights": [
      "Developed a reusable React date picker component package.",
      "Implemented DatePicker, DateRangePicker and MonthPicker components.",
      "Developed date parsing, formatting and range utility functions.",
      "Implemented CSS variable-based theming and dark mode support.",
      "Prepared package builds for npm and CDN distribution."
    ],
    "impact": "Published @aravind13/datepicker to the npm registry as a reusable React component package.",
    "stack": [
      "React",
      "JavaScript",
      "CSS",
      "CSS Custom Properties",
      "npm"
    ],
    "github": "https://github.com/Anubothu-Aravind/components",
    "npm": "https://www.npmjs.com/package/@aravind13/datepicker",
    "live": null,
    "image": "/assets/images/projects/datepicker.webp",
    "imageAlt": "Aravind Datepicker preview showing the date, date-range and month pickers"
  },
  {
    "id": "ai-interview",
    "index": "13",
    "name": "AI Interview System",
    "tagline": "Voice-based mock interviews with AI feedback",
    "fullTitle": "AI Interview System",
    "role": "AI Full-Stack Developer",
    "category": "B.Tech Mini Project – Third Year, Semester 2",
    "status": "done",
    "problem": "Candidates need an accessible platform to practice technical and HR interviews with personalized questions and structured performance feedback.",
    "highlights": [
      "Developed an AI-powered interview application using resume and job description analysis.",
      "Implemented adaptive interview question generation using OpenAI GPT-4.",
      "Integrated voice-based question delivery and answer recording.",
      "Implemented speech-to-text transcription using Whisper.",
      "Developed AI-based answer scoring and feedback generation.",
      "Integrated Supabase for interview history and result storage."
    ],
    "impact": "Delivered an automated interview workflow with voice interaction, question-wise scoring, feedback and interview history.",
    "stack": [
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "Supabase",
      "PostgreSQL",
      "OpenAI GPT-4",
      "Whisper",
      "OpenAI TTS"
    ],
    "github": "https://github.com/Anubothu-Aravind/ai-interview",
    "npm": null,
    "live": null,
    "image": "/assets/images/projects/ai-interview.webp",
    "imageAlt": "AI Interview System setup form for candidate details, interview type, resume and job description"
  },
  {
    "id": "nss-permission-mail",
    "index": "14",
    "name": "NSS Permission Mailer",
    "tagline": "Class permission emails for NSS special camp",
    "fullTitle": "NSS Special Camp Class Permission Email System",
    "role": "Project Developer",
    "category": "Department / Club Project",
    "status": "in-use",
    "problem": "Managing class permission requests and communication for students participating in NSS special camp activities.",
    "highlights": [
      "Developed an automated class permission and email communication workflow.",
      "Created a departmental tool to support NSS camp-related coordination."
    ],
    "impact": "Used by the AI & DS department and its clubs, including NSS Unit 8, and received department recognition.",
    "stack": [],
    "github": "https://github.com/Anubothu-Aravind/NSS-SpecialCamp_Class-Permission-Email-System",
    "npm": null,
    "live": null,
    "image": "/assets/images/projects/nss-permission-mail.webp",
    "imageAlt": "NSS Special Camp class permission email system, built in Streamlit"
  },
  {
    "id": "report-generator",
    "index": "15",
    "name": "Attendance Report Generator",
    "tagline": "Bulk attendance and academic reports for parents",
    "fullTitle": "Student Attendance and Academic Report Generator",
    "role": "Developer",
    "category": "Department Automation Project",
    "status": "retired",
    "problem": "Manual preparation of student attendance reports and parent communication creates repetitive administrative work.",
    "highlights": [
      "Developed a web-based reporting application for CSV and Excel uploads.",
      "Implemented automated student record matching and consolidated profiles.",
      "Generated individual PDF and DOCX academic reports.",
      "Implemented bulk report generation and ZIP downloads."
    ],
    "impact": "Developed at the request of the AI & DS HOD to automate attendance reporting to parents. Used briefly by the department before being discontinued following a change in HOD.",
    "stack": [
      "Python",
      "FastAPI",
      "Jinja2",
      "Pandas",
      "OpenPyXL",
      "WeasyPrint",
      "python-docx"
    ],
    "github": "https://github.com/Anubothu-Aravind/report_app",
    "npm": null,
    "live": null,
    "image": "/assets/images/projects/report-generator.webp",
    "imageAlt": "KL University Student Academic Performance Analysis System upload page"
  },
  {
    "id": "docdistill",
    "index": "16",
    "name": "DocDistill",
    "tagline": "RAG-based question answering over PDFs",
    "fullTitle": "DocDistill – RAG-Based Document Question Answering System",
    "role": "AI Application Developer",
    "category": "B.Tech Minor Project – Year 4, Semester 1",
    "status": "done",
    "problem": "Finding relevant information in lengthy PDF documents requires manually searching and reading large amounts of content.",
    "highlights": [
      "Developed a full-stack PDF processing application.",
      "Implemented Retrieval-Augmented Generation for document question answering.",
      "Integrated Sentence Transformers for semantic embeddings.",
      "Connected Groq LLM for context-aware answer generation.",
      "Implemented text-to-speech output using Google Text-to-Speech."
    ],
    "impact": "Enabled users to upload PDFs, ask questions about document content and listen to generated answers.",
    "stack": [
      "Python",
      "FastAPI",
      "React",
      "Vite",
      "Groq LLM",
      "Sentence Transformers",
      "RAG",
      "gTTS"
    ],
    "github": "https://github.com/Anubothu-Aravind/Summarizer",
    "npm": null,
    "live": null,
    "image": "/assets/images/projects/docdistill.webp",
    "imageAlt": "DocDistill landing page: Transform PDFs into Intelligent Conversations"
  },
  {
    "id": "honestai",
    "index": "17",
    "name": "HonestAI",
    "tagline": "All-in-one screen, camera and voice recorder",
    "fullTitle": "HonestAI – All-in-One Media Recorder",
    "role": "Full-Stack Intern",
    "category": "Internship Project",
    "status": "done",
    "problem": "Users need a unified media recording platform to capture screen, camera and voice recordings and manage their resulting media.",
    "highlights": [
      "Developed screen, webcam and microphone recording features.",
      "Implemented simultaneous multi-source recording.",
      "Integrated real-time speech-to-text transcription.",
      "Implemented Cloudinary media uploads and Google Drive integration.",
      "Developed Google OAuth authentication and recording management workflows."
    ],
    "impact": "Delivered a unified media recorder with synchronized recording, transcription and cloud storage capabilities.",
    "stack": [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Cloudinary",
      "Google OAuth",
      "Google Drive API",
      "Web Speech API"
    ],
    "github": "https://github.com/Anubothu-Aravind/honestai",
    "npm": null,
    "live": null,
    "image": "/assets/images/projects/honestai.webp",
    "imageAlt": "HonestAI sign-in screen, Welcome to TrueScope, with Sign in with Google"
  },
  {
    "id": "kl-finds",
    "index": "18",
    "name": "KL Finds",
    "tagline": "Faculty cabin lookup and lost-and-found",
    "fullTitle": "KL Finds",
    "role": "Club Project Developer",
    "category": "Club Project",
    "status": "done",
    "problem": "Students and university members need an easier way to locate faculty cabins and identify lost-and-found inventory.",
    "highlights": [
      "Developed a university-oriented discovery application.",
      "Implemented faculty cabin lookup functionality.",
      "Implemented lost-and-found inventory discovery and management workflows."
    ],
    "impact": "Created a club project for finding faculty cabins and locating lost-and-found items.",
    "stack": [],
    "github": "https://github.com/Anubothu-Aravind/KL_Finds",
    "npm": null,
    "live": null
  },
  {
    "id": "club-timetable",
    "index": "19",
    "name": "Club Timetable",
    "tagline": "Event scheduling and volunteer availability",
    "fullTitle": "Intelligentsia Club Timetable and Event Coordination System",
    "role": "Club Project Developer",
    "category": "Club Project",
    "status": "in-use",
    "problem": "Organizing club events requires coordinating schedules, selecting suitable time slots and identifying volunteers available to conduct activities.",
    "highlights": [
      "Developed a centralized club event scheduling application.",
      "Implemented timetable and event coordination workflows.",
      "Implemented volunteer availability checking for selected time slots.",
      "Integrated data management for scheduling and coordination."
    ],
    "impact": "Used by the Intelligentsia Club core team to manage event schedules and identify available volunteers.",
    "stack": [
      "Python",
      "Streamlit",
      "Pandas",
      "Supabase",
      "SMTP"
    ],
    "github": "https://github.com/Anubothu-Aravind/Timetable",
    "npm": null,
    "live": null
  }
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
  duration: "2022 – 2026",
  cgpa: "9.45 / 10",
};

export const currentStudy = {
  institution: "KL University, Vijayawada",
  degree: "M.Tech",
  field: "Computer Science and Engineering",
  duration: "2026 – Present",
  year: "1st year",
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
