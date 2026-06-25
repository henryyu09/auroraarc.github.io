import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Henry Yu",
  description: "About Henry Yu — CS student at UW-Madison.",
};

const EDUCATION = [
  { school: "University of Wisconsin–Madison", degree: "B.S. Computer Science, Minor in Statistics", period: "Graduating 2027" },
  // { school: "Indiana University Bloomington", degree: "B.S. Computer Science", period: "2023–2024" },
];

export default function About() {
  return (
    <div className="px-6 py-20" style={{ maxWidth: "720px", margin: "0 auto" }}>
      <h1 className="font-display text-heading text-text-primary mb-6">About</h1>

      <div className="space-y-4 text-body text-text-secondary leading-relaxed mb-12">
        <p>
          I&apos;m a CS + Statistics student at the University of Wisconsin–Madison,
          with an interest in quantum computing, financial engineering, and software systems.
        </p>
        <p>
          My research has spanned across quantum reservoir computing with QuEra&apos;s neutral-atom hardware,
          market microstructure by analyzing order queue position, QC-ML hybrid models for accelerating DFT calculations,
          and everything in between.
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

      <hr className="my-10 border-border-subtle" />

      <section>
        <h2 className="font-display text-base font-medium text-text-primary mb-4">Resume</h2>
        <p className="text-body text-text-secondary mb-6">
          Download my full resume as a PDF.
        </p>
        <a
          href="/cv.pdf"
          download
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-small font-medium
            bg-accent text-white hover:opacity-90 transition-all duration-200
            shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Resume (PDF)
        </a>
      </section>
    </div>
  );
}
