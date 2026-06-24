const SKILLS = [
  "Python", "Java", "C/C++", "PyTorch", "Quantum Computing",
  "ML/DL", "Docker", "Kubernetes", "AWS", "R",
  "Git", "Statistical Analysis", "Financial Modeling",
  "Qiskit", "scikit-learn",
];

export default function StackInterests() {
  return (
    <section className="px-6 py-20 reveal" style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <h2 className="font-display text-heading text-text-primary mb-6">
        Stack &amp; Interests
      </h2>
      <div className="flex flex-wrap gap-2">
        {SKILLS.map((skill) => (
          <span
            key={skill}
            className="inline-block px-3 py-1 text-small rounded-full
              border border-border-subtle text-text-secondary
              bg-surface-secondary"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
