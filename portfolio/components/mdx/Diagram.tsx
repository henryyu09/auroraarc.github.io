"use client";

import { useEffect, useRef, useState } from "react";

interface DiagramProps {
  chart: string;
  caption?: string;
}

export default function Diagram({ chart, caption }: DiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [svg, setSvg] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          theme: "default",
          themeVariables: {
            primaryColor: "#E8F3EE",
            primaryTextColor: "#1A1A1E",
            primaryBorderColor: "#3A7D5C",
            lineColor: "#3A7D5C",
            secondaryColor: "#F0EDE8",
            tertiaryColor: "#F8F6F3",
          },
          fontFamily: "Inter, system-ui, sans-serif",
        });
        const { svg: rendered } = await mermaid.render(
          "mermaid-" + Math.random().toString(36).slice(2),
          chart
        );
        if (!cancelled) setSvg(rendered);
      } catch {
        if (!cancelled) setSvg("<p class='text-text-muted'>Failed to render diagram</p>");
      }
    })();
    return () => { cancelled = true; };
  }, [chart]);

  return (
    <figure className="my-8">
      <div
        ref={ref}
        className="p-4 border border-border-subtle rounded-md bg-surface-elevated overflow-auto
          flex items-center justify-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {caption && (
        <figcaption className="mt-2 text-tiny text-text-muted text-center">
          {caption}
        </figcaption>
      )}

      {expanded && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-8"
          onClick={() => setExpanded(false)}
        >
          <div
            className="max-w-5xl max-h-[90vh] overflow-auto bg-surface-elevated p-8 rounded-lg"
            onClick={(e) => e.stopPropagation()}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </div>
      )}
    </figure>
  );
}
