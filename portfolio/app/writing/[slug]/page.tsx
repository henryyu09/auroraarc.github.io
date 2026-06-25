import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { getWritingBySlug, getAllWriting } from "@/lib/writing";
import { mdxComponents } from "@/components/mdx";
import Description from "@/components/mdx/Description";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllWriting();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getWritingBySlug(slug);
  if (!post) return { title: "Not Found" };

  return {
    title: `${post.frontmatter.title} — Henry Yu`,
    description: post.frontmatter.description,
  };
}

export default async function WritingPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getWritingBySlug(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    options: {
      blockJS: false,
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    },
    components: mdxComponents,
  });

  const { title, date, description } = post.frontmatter;

  return (
    <article className="px-6 py-20" style={{ maxWidth: "720px", margin: "0 auto" }}>
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link
          href="/writing"
          className="text-small text-text-muted hover:text-accent transition-colors"
        >
          ← Back to writing
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <time className="text-tiny text-text-muted">{date}</time>
        <h1 className="font-display text-hero text-text-primary mt-2 mb-4 leading-tight">
          {title}
        </h1>
        <p className="text-body text-text-secondary leading-relaxed">
          <Description text={description} />
        </p>
      </header>

      {/* MDX Content */}
      <div className="prose-styled">
        {content}
      </div>

      {/* Footer nav */}
      <footer className="mt-16 pt-8 border-t border-border-subtle">
        <Link
          href="/writing"
          className="text-small text-text-muted hover:text-accent transition-colors"
        >
          ← Back to all writing
        </Link>
      </footer>
    </article>
  );
}
