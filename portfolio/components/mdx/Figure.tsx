"use client";

import { useState } from "react";

interface FigureProps {
  src?: string;
  alt?: string;
  caption?: string;
  expandable?: boolean;
  children?: React.ReactNode;
}

export default function Figure({ src, alt = "", caption, expandable = false, children }: FigureProps) {
  const [expanded, setExpanded] = useState(false);

  const content = src ? (
    <img
      src={src}
      alt={alt}
      className="w-full h-auto rounded-md border border-border-subtle"
      onClick={expandable ? () => setExpanded(true) : undefined}
      style={expandable ? { cursor: "pointer" } : undefined}
    />
  ) : (
    children
  );

  return (
    <figure className="my-8">
      <div className="rounded-md overflow-hidden">{content}</div>
      {caption && (
        <figcaption className="mt-2 text-tiny text-text-muted text-center">
          {caption}
        </figcaption>
      )}

      {/* Expand overlay */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-8"
          onClick={() => setExpanded(false)}
        >
          <div className="max-w-5xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            {src ? (
              <img src={src} alt={alt} className="w-full h-auto rounded-lg" />
            ) : (
              children
            )}
          </div>
        </div>
      )}
    </figure>
  );
}
