import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Henry Yu",
  description: "Download Henry Yu's resume.",
};

export default function Resume() {
  return (
    <div className="px-6 py-20" style={{ maxWidth: "720px", margin: "0 auto" }}>
      <h1 className="font-display text-heading text-text-primary mb-4">Resume</h1>
      <p className="text-body text-text-secondary mb-8">
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
    </div>
  );
}
