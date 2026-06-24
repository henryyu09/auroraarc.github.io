import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Henry Yu",
  description: "Get in touch with Henry Yu.",
};

const LINKS = [
  { label: "henry.yu094@gmail.com", href: "mailto:henry.yu094@gmail.com" },
  { label: "GitHub — @AuroraArc", href: "https://github.com/AuroraArc" },
  { label: "LinkedIn — henry-yu09", href: "https://linkedin.com/in/henry-yu09" },
];

export default function Contact() {
  return (
    <div className="px-6 py-20" style={{ maxWidth: "720px", margin: "0 auto" }}>
      <h1 className="font-display text-heading text-text-primary mb-4">Contact</h1>
      <p className="text-body text-text-secondary mb-8 max-w-lg">
        Open to collaboration on quantum computing, ML, and systems research.
        Feel free to reach out.
      </p>
      <ul className="space-y-3">
        {LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-body text-accent hover:text-accent-muted transition-colors underline underline-offset-2 decoration-accent/30"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
