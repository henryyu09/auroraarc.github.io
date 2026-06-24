import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Henry Yu",
  description: "About Henry Yu — CS student at UW-Madison.",
};

const EDUCATION = [
  { school: "University of Wisconsin–Madison", degree: "B.S. Computer Science", period: "2024–2027" },
  { school: "Indiana University Bloomington", degree: "B.S. Computer Science", period: "2023–2024" },
];

export default function About() {
  return (
    <div className="px-6 py-20" style={{ maxWidth: "720px", margin: "0 auto" }}>
      <h1 className="font-display text-heading text-text-primary mb-6">About</h1>

      <div className="space-y-4 text-body text-text-secondary leading-relaxed mb-12">
        <p>
          I&apos;m a CS student at the University of Wisconsin–Madison, building things
          at the intersection of quantum computing, machine learning, and software systems.
        </p>
        <p>
          My research has spanned quantum reservoir computing with QuEra&apos;s neutral-atom
          architecture, QC-ML hybrid models for accelerating DFT calculations, and
          data-driven analysis of recidivism cycles in the Iowa prison system —
          work published in the ARCH 2023 proceedings.
        </p>
        <p>
          I care about readable engineering: code that communicates intent, systems
          that are documented as well as they are built, and visualizations that
          make complex ideas accessible.
        </p>
      </div>

      <h2 className="font-display text-base font-medium text-text-primary mb-4">Education</h2>
      <div className="space-y-4">
        {EDUCATION.map((edu) => (
          <div key={edu.school}>
            <p className="text-body text-text-primary font-medium">{edu.school}</p>
            <p className="text-small text-text-secondary">{edu.degree}</p>
            <p className="text-tiny text-text-muted">{edu.period}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
