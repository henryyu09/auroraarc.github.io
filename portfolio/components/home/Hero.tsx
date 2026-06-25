import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="flex flex-col justify-center px-6"
      style={{ minHeight: "calc(100vh - 4rem)", maxWidth: "1200px", margin: "0 auto" }}
    >
      <h1 className="text-hero text-text-primary mb-4">
        Henry Yu
      </h1>
      <p className="font-display text-heading text-text-secondary mb-6 max-w-2xl">
        CS student building ML, systems, and visualization projects with an
        emphasis on readable engineering.
      </p>
      <p className="text-body text-text-secondary max-w-xl mb-10 leading-relaxed">
        I build things at the intersection of quantum computing, machine learning,
        and software systems — writing code that&apos;s as clear as the ideas behind it.
        Currently at the University of Wisconsin&ndash;Madison.
      </p>
      <div className="flex gap-4">
        <Link
          href="/projects"
          className="inline-flex items-center px-5 py-2.5 rounded-md text-small font-medium
            bg-accent text-white! hover:opacity-90 transition-all duration-200"
        >
          View projects
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 ml-2"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
        <Link
          href="/about"
          className="inline-flex items-center px-5 py-2.5 rounded-md text-small font-medium
            border border-border-subtle text-text-secondary hover:text-text-primary
            hover:bg-surface-secondary transition-all duration-200"
        >
          About me
        </Link>
      </div>
    </section>
  );
}
