import fs from "fs";
import path from "path";

export interface ProjectFrontmatter {
  title: string;
  date: string;
  tags: string[];
  description: string;
  slug: string;
  links?: {
    github?: string;
    paper?: string;
  };
}

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export function getAllProjects(): ProjectFrontmatter[] {
  const files = fs.readdirSync(PROJECTS_DIR);
  const projects: ProjectFrontmatter[] = [];

  for (const file of files) {
    if (!file.endsWith(".mdx") || file.startsWith("_")) continue;

    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8");
    const frontmatter = parseFrontmatter(raw);

    if (frontmatter) {
      projects.push({ ...frontmatter, slug } as ProjectFrontmatter);
    }
  }

  return projects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getProjectBySlug(slug: string): {
  content: string;
  frontmatter: ProjectFrontmatter;
} | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const frontmatter = parseFrontmatter(raw);
  if (!frontmatter) return null;

  const content = raw.replace(/^---[\s\S]*?---\s*/, "").trim();

  return {
    content,
    frontmatter: { ...frontmatter, slug } as ProjectFrontmatter,
  };
}

function parseFrontmatter(raw: string): Record<string, unknown> | null {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const fm: Record<string, unknown> = {};
  const lines = match[1].split("\n");

  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value: unknown = line.slice(colonIndex + 1).trim();

    // Remove quotes
    if (typeof value === "string" && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    // Handle arrays: [item1, item2]
    if (typeof value === "string" && value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^"(.*)"$/, "$1"));
    }

    fm[key] = value;
  }

  return fm;
}
