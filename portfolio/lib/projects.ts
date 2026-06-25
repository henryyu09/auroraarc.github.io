import fs from "fs";
import path from "path";

export interface ProjectFrontmatter {
  title: string;
  date: string;
  tags: string[];
  description: string;
  slug: string;
  image?: string;
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
  let currentKey: string | null = null;
  let blockScalarKey: string | null = null;
  let blockScalarLines: string[] = [];

  for (const line of lines) {
    // If we're collecting a block scalar value
    if (blockScalarKey !== null) {
      if (line.startsWith(" ") || line.startsWith("\t")) {
        blockScalarLines.push(line);
        continue;
      }
      // Line is not indented → block scalar ended, finalize it
      const rawValue = blockScalarLines
        .map((l) => l.replace(/^\s+/, ""))
        .join("\n");
      fm[blockScalarKey] = rawValue;
      blockScalarKey = null;
      blockScalarLines = [];
      // Fall through to process current line as a new key
    }

    // Skip empty lines (outside block scalars)
    if (!line.trim()) continue;

    // Indented line → child of currentKey (nested object)
    if ((line.startsWith(" ") || line.startsWith("\t")) && currentKey) {
      const colonIndex = line.indexOf(":");
      if (colonIndex === -1) continue;

      const subKey = line.slice(0, colonIndex).trim();
      let value: unknown = line.slice(colonIndex + 1).trim();

      if (typeof value === "string" && value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }

      // Ensure currentKey maps to an object
      if (!fm[currentKey] || typeof fm[currentKey] !== "object") {
        fm[currentKey] = {};
      }
      (fm[currentKey] as Record<string, unknown>)[subKey] = value;
      continue;
    }

    // Top-level line
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    currentKey = line.slice(0, colonIndex).trim();
    let value: unknown = line.slice(colonIndex + 1).trim();

    if (typeof value === "string" && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    // Check for YAML block scalar indicators (| or >)
    if (typeof value === "string" && (value === "|" || value === ">")) {
      blockScalarKey = currentKey;
      blockScalarLines = [];
      continue;
    }

    // Handle arrays: [item1, item2]
    if (typeof value === "string" && value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^"(.*)"$/, "$1"));
    }

    // Only set if value is non-empty (nested object will be set by indented lines)
    if (value !== "") {
      fm[currentKey] = value;
    } else {
      // Initialize as empty object for nested parsing
      fm[currentKey] = {};
    }
  }

  // Handle block scalar at end of frontmatter
  if (blockScalarKey !== null && blockScalarLines.length > 0) {
    fm[blockScalarKey] = blockScalarLines
      .map((l) => l.replace(/^\s+/, ""))
      .join("\n");
  }

  return fm;
}
