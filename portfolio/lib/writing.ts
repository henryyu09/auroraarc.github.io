import fs from "fs";
import path from "path";

export interface WritingFrontmatter {
  title: string;
  date: string;
  description: string;
  slug: string;
}

const WRITING_DIR = path.join(process.cwd(), "content/writing");

export function getAllWriting(): WritingFrontmatter[] {
  if (!fs.existsSync(WRITING_DIR)) return [];
  const files = fs.readdirSync(WRITING_DIR);
  const posts: WritingFrontmatter[] = [];

  for (const file of files) {
    if (!file.endsWith(".mdx") || file.startsWith("_")) continue;

    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(WRITING_DIR, file), "utf-8");
    const frontmatter = parseFrontmatter(raw);

    if (frontmatter) {
      posts.push({ ...frontmatter, slug } as WritingFrontmatter);
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getWritingBySlug(slug: string): {
  content: string;
  frontmatter: WritingFrontmatter;
} | null {
  const filePath = path.join(WRITING_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const frontmatter = parseFrontmatter(raw);
  if (!frontmatter) return null;

  const content = raw.replace(/^---[\s\S]*?---\s*/, "").trim();

  return {
    content,
    frontmatter: { ...frontmatter, slug } as WritingFrontmatter,
  };
}

function parseFrontmatter(raw: string): Record<string, unknown> | null {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const fm: Record<string, unknown> = {};
  const lines = match[1].split("\n");
  let blockScalarKey: string | null = null;
  let blockScalarLines: string[] = [];

  for (const line of lines) {
    if (blockScalarKey !== null) {
      if (line.startsWith(" ") || line.startsWith("\t")) {
        blockScalarLines.push(line);
        continue;
      }
      const rawValue = blockScalarLines
        .map((l) => l.replace(/^\s+/, ""))
        .join("\n");
      fm[blockScalarKey] = rawValue;
      blockScalarKey = null;
      blockScalarLines = [];
    }

    if (!line.trim()) continue;

    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value: unknown = line.slice(colonIndex + 1).trim();

    if (typeof value === "string" && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    if (typeof value === "string" && (value === "|" || value === ">")) {
      blockScalarKey = key;
      blockScalarLines = [];
      continue;
    }

    if (typeof value === "string" && value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^"(.*)"$/, "$1"));
    }

    fm[key] = value;
  }

  if (blockScalarKey !== null && blockScalarLines.length > 0) {
    fm[blockScalarKey] = blockScalarLines
      .map((l) => l.replace(/^\s+/, ""))
      .join("\n");
  }

  return fm;
}
