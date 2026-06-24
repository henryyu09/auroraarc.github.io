import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  slug: string;
  result?: string;
  thumbnailColor?: string;
  large?: boolean;
}

export default function ProjectCard({
  title,
  description,
  tags,
  slug,
  result,
  thumbnailColor = "#3A7D5C",
  large = false,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      className={`group block rounded-lg border border-border-subtle bg-surface-elevated
        transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 overflow-hidden ${
        large ? "md:col-span-2" : ""
      }`}
    >
      {/* Thumbnail placeholder */}
      <div
        className="w-full flex items-center justify-center"
        style={{
          height: large ? "240px" : "160px",
          backgroundColor: thumbnailColor,
          opacity: 0.15,
        }}
      >
        <span
          className="font-display text-heading"
          style={{ color: thumbnailColor, opacity: 0.6 }}
        >
          {title.charAt(0)}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-medium text-text-primary mb-1.5">
          {title}
        </h3>
        <p className="text-small text-text-secondary mb-3 line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-2 py-0.5 text-tiny rounded-full
                bg-accent-subtle text-accent border border-accent/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {result && (
          <p className="text-tiny text-text-muted">{result}</p>
        )}
      </div>
    </Link>
  );
}
