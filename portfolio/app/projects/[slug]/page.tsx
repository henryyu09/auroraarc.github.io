import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { mdxComponents } from "@/components/mdx";
import Description from "@/components/mdx/Description";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not Found" };

  return {
    title: `${project.frontmatter.title} — Henry Yu`,
    description: project.frontmatter.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { content } = await compileMDX({
    source: project.content,
    options: {
      blockJS: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    },
    components: mdxComponents,
  });

  const { title, date, tags, description, links } = project.frontmatter;

  return (
    <article className="px-6 py-20" style={{ maxWidth: "720px", margin: "0 auto" }}>
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link
          href="/projects"
          className="text-small text-text-muted hover:text-accent transition-colors"
        >
          ← Back to projects
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <time className="text-tiny text-text-muted">{date}</time>
          <span className="text-tiny text-text-muted">·</span>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-0.5 text-tiny rounded-full
                  bg-accent-subtle text-accent border border-accent/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <h1 className="font-display text-hero text-text-primary mb-4 leading-tight">
          {title}
        </h1>

        <p className="text-body text-text-secondary leading-relaxed">
          <Description text={description} />
        </p>

        {/* Links */}
        {links && (
          <div className="flex flex-wrap gap-4 mt-4">
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-small text-accent hover:text-accent/80 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            )}
            {links.paper && (
              <a
                href={links.paper}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-small text-accent hover:text-accent/80 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Paper
              </a>
            )}
          </div>
        )}
      </header>

      {/* MDX Content */}
      <div className="prose-styled">
        {content}
      </div>

      {/* Footer nav */}
      <footer className="mt-16 pt-8 border-t border-border-subtle">
        <Link
          href="/projects"
          className="text-small text-text-muted hover:text-accent transition-colors"
        >
          ← Back to all projects
        </Link>
      </footer>
    </article>
  );
}
