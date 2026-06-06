export const ASCII_BANNER = `
 █████╗ ██████╗  █████╗ ██╗   ██╗██╗███╗   ██╗██████╗ 
██╔══██╗██╔══██╗██╔══██╗██║   ██║██║████╗  ██║██╔══██╗
███████║██████╔╝███████║██║   ██║██║██╔██╗ ██║██║  ██║
██╔══██║██╔══██╗██╔══██║╚██╗ ██╔╝██║██║╚██╗██║██║  ██║
██║  ██║██║  ██║██║  ██║ ╚████╔╝ ██║██║ ╚████║██████╔╝
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚═╝╚═╝  ╚═══╝╚═════╝`;

export const ASCII_BANNER_SMALL = `
┌─────────────────────────────┐
│   ARAVIND ANUBOTHU          │
│   Backend & AI Engineer     │
└─────────────────────────────┘`;

export const COMMAND_LIST = [
  "help", "whoami", "about", "me", "projects", "work", "project", "skills",
  "experience", "education", "certs", "contact", "socials", "neofetch",
  "summary", "highlights", "hire", "timeline", "showcase", "theme",
  "resume", "cv", "download", "photo", "avatar", "headshot", "repo",
  "banner", "cowsay", "clear", "history",
] as const;

export const DASHBOARD_ITEMS = [
  { num: "1", label: "About Me", cmd: "whoami" },
  { num: "2", label: "Projects", cmd: "projects" },
  { num: "3", label: "Skills", cmd: "skills" },
  { num: "4", label: "Experience", cmd: "experience" },
  { num: "5", label: "Resume", cmd: "resume" },
  { num: "6", label: "Contact", cmd: "contact" },
];

/** Simple Levenshtein distance for typo suggestions */
export function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1]
        ? dp[i-1][j-1]
        : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

export function findSuggestion(input: string): string | null {
  let best = "";
  let bestDist = Infinity;
  for (const cmd of COMMAND_LIST) {
    const d = levenshtein(input.toLowerCase(), cmd);
    if (d < bestDist && d <= 2) { bestDist = d; best = cmd; }
  }
  return best && best !== input.toLowerCase() ? best : null;
}
