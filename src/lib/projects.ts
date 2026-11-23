import { projects, type Project, type ProjectStatus } from "@/data/portfolio";

export type ProjectGroup = "work" | "mtech" | "btech" | "side" | "campus";
export type DemoKind = "route" | "sudoku" | "graph" | "tcp";

export const GROUP_LABEL: Record<ProjectGroup, string> = {
  work: "client work",
  mtech: "m.tech",
  btech: "b.tech",
  side: "side projects",
  campus: "campus",
};

/* singular, for a single row's tag */
export const GROUP_TAG: Record<ProjectGroup, string> = {
  work: "client",
  mtech: "m.tech",
  btech: "b.tech",
  side: "side project",
  campus: "campus",
};

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  "in-use": "In use",
  done: "Shipped",
  retired: "Retired",
};

export const groupOf = (project: Project): ProjectGroup => {
  const kind = `${project.category} ${project.role}`;
  if (/Freelance|Internship/i.test(kind)) return "work";
  if (/M\.Tech/i.test(kind)) return "mtech";
  if (/B\.Tech/i.test(kind)) return "btech";
  if (/Club|Department/i.test(kind)) return "campus";
  return "side";
};

export const FLAGSHIPS: { id: string; demo: DemoKind; hook: string }[] = [
  { id: "logistics-optimizer", demo: "route", hook: "100 orders, 10 vans, a real city road network." },
  { id: "pyodide-sudoku", demo: "sudoku", hook: "A Python solver that runs in your browser, offline." },
  { id: "graphshield", demo: "graph", hook: "Spotting fake accounts from a handful of labels." },
  { id: "netscope", demo: "tcp", hook: "Watching TCP struggle across 11 broken networks." },
];

export const CLIENT_IDS = ["football-club-crm", "pro-talent-connect", "vastrams", "next-zen-store", "honestai"];

export const byId = (id: string): Project => {
  const found = projects.find((p) => p.id === id);
  if (!found) throw new Error(`Unknown project id: ${id}`);
  return found;
};

export const demoFor = (id: string): DemoKind | null => FLAGSHIPS.find((f) => f.id === id)?.demo ?? null;

export const groupsInUse = (): ProjectGroup[] => {
  const order: ProjectGroup[] = ["work", "mtech", "btech", "side", "campus"];
  const present = new Set(projects.map(groupOf));
  return order.filter((g) => present.has(g));
};

export { projects };
export type { Project };
