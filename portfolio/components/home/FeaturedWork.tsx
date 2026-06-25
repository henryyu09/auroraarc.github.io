"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import ProjectCard from "@/components/projects/ProjectCard";

const FEATURED_PROJECTS = [
  {
    title: "Quantum Reservoir Computing",
    description:
      "Molecular activity prediction using neutral-atom quantum architecture, developed in collaboration with QuEra Computing.",
    tags: ["Quantum", "ML", "Python"],
    slug: "quantum-reservoir-computing",
    image: "/images/projects/quantum-reservoir-computing.svg",
    result: "Benchmarked QRC against classical models on molecular data",
    thumbnailColor: "#3A7D5C",
    large: true,
  },
  {
    title: "QC-ML Hybrid for DFT",
    description:
      "Novel QC-ML hybrid model accelerating DFT calculations using graph-CNN with QCBM.",
    tags: ["Quantum", "ML", "Python"],
    slug: "qc-ml-dft-proteins",
    image: "/images/projects/qc-ml-dft-proteins.svg",
    result: "Reduced DFT computation overhead",
    thumbnailColor: "#5B9B7A",
    large: false,
  },
  {
    title: "Noise Analysis on Quantum Models",
    description:
      "Analyzing the impact of noise on quantum classifier accuracy using noise models.",
    tags: ["Quantum", "Python"],
    slug: "noise-analysis-quantum",
    image: "/images/projects/noise-analysis-quantum.svg",
    result: "Quantified noise thresholds for reliable quantum classification",
    thumbnailColor: "#4A8B6A",
    large: false,
  },
  {
    title: "Recidivism Reduction Analysis",
    description:
      "Data-driven analysis of recidivism cycles and intervention effectiveness in Iowa prisons.",
    tags: ["Data Science", "R", "Statistics"],
    slug: "recidivism-reduction",
    image: "/images/projects/recidivism-reduction.svg",
    result: "Published in ARCH 2023 proceedings",
    thumbnailColor: "#6A9B5A",
    large: false,
  },
];

export default function FeaturedWork() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="px-6 py-20 reveal" style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <h2 className="font-display text-heading text-text-primary mb-8">
        Featured Work
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {FEATURED_PROJECTS.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </section>
  );
}
