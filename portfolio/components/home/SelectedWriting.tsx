"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import Link from "next/link";

const WRITING_SAMPLES = [
  {
    title: "What I Learned Building a Quantum Reservoir Computer",
    date: "Jan 2025",
    excerpt:
      "Design decisions, simulation challenges, and what running on real neutral-atom hardware taught me about quantum ML.",
    slug: "what-i-learned-building-reservoir",
  },
  {
    title: "Choosing Quantum Frameworks: Qiskit vs. Cirq vs. Braket",
    date: "Mar 2025",
    excerpt:
      "A practical comparison of quantum computing SDKs for ML workloads — API design, simulator performance, and hardware access.",
    slug: "choosing-quantum-frameworks",
  },
];

export default function SelectedWriting() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="px-6 py-20 reveal" style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <h2 className="font-display text-heading text-text-primary mb-8">
        Selected Writing
      </h2>
      <div className="space-y-4">
        {WRITING_SAMPLES.map((post) => (
          <Link
            key={post.slug}
            href={`/writing/${post.slug}`}
            className="group block pl-4 border-l-2 border-accent py-3
              hover:border-accent-muted transition-colors"
          >
            <h3 className="font-display text-base font-medium text-text-primary
              group-hover:text-accent transition-colors mb-1">
              {post.title}
            </h3>
            <p className="text-small text-text-muted mb-1.5">{post.date}</p>
            <p className="text-small text-text-secondary line-clamp-2">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
      <Link
        href="/writing"
        className="inline-block mt-6 text-small text-text-muted hover:text-accent transition-colors"
      >
        View all writing &rarr;
      </Link>
    </section>
  );
}
