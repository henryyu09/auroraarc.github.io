import type { Metadata } from "next";
import Link from "next/link";
import { getAllWriting } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Writing — Henry Yu",
  description: "Thoughts on quantum computing, machine learning, engineering, and building things.",
};

export default function WritingPage() {
  const posts = getAllWriting();

  return (
    <div className="px-6 py-20" style={{ maxWidth: "720px", margin: "0 auto" }}>
      <h1 className="font-display text-heading text-text-primary mb-2">Writing</h1>
      <p className="text-body text-text-secondary mb-10">
        Thoughts on quantum computing, machine learning, and building things.
      </p>

      {posts.length === 0 ? (
        <p className="text-small text-text-muted">Nothing published yet. Check back soon.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="group block"
              >
                <time className="text-tiny text-text-muted">{post.date}</time>
                <h2 className="font-display text-base font-medium text-text-primary mt-1
                  group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="text-small text-text-secondary mt-1 leading-relaxed">
                  {post.description}
                </p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
