import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Henry Yu",
  description: "Get in touch with Henry Yu.",
};

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const LINKS = [
  {
    label: "henry.yu094@gmail.com",
    sublabel: "Email",
    href: "mailto:henry.yu094@gmail.com",
    icon: MailIcon,
    external: false,
  },
  {
    label: "@henryyu09",
    sublabel: "GitHub",
    href: "https://github.com/henryyu09",
    icon: GitHubIcon,
    external: true,
  },
  {
    label: "henry-yu09",
    sublabel: "LinkedIn",
    href: "https://linkedin.com/in/henry-yu09",
    icon: LinkedInIcon,
    external: true,
  },
];

export default function Contact() {
  return (
    <div className="px-6 py-20" style={{ maxWidth: "720px", margin: "0 auto" }}>
      <h1 className="font-display text-heading text-text-primary mb-4">Contact</h1>
      <p className="text-body text-text-secondary mb-10 max-w-lg">
        Open to collaboration on quantum computing, ML, and systems research.
        Feel free to reach out.
      </p>
      <ul className="flex flex-col gap-3">
        {LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.href}>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 px-5 py-4 rounded-lg border border-border-subtle bg-surface-primary hover:bg-surface-secondary hover:border-border-default transition-colors duration-200"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-md bg-surface-secondary group-hover:bg-surface-tertiary text-accent transition-colors duration-200 shrink-0">
                  <Icon />
                </span>
                <span className="flex flex-col min-w-0">
                  <span className="text-small font-medium text-text-tertiary leading-none mb-1">{link.sublabel}</span>
                  <span className="text-body text-text-primary font-medium truncate">{link.label}</span>
                </span>
                <span className="ml-auto text-text-tertiary group-hover:text-accent transition-colors duration-200 shrink-0">
                  <ArrowIcon />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
