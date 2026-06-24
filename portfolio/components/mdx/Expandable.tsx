"use client";

import { useState } from "react";

interface ExpandableProps {
  summary: string;
  children: React.ReactNode;
}

export default function Expandable({ summary, children }: ExpandableProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-4 border border-border-subtle rounded-md overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3
          text-small text-text-secondary hover:text-text-primary
          bg-surface-secondary hover:bg-surface-secondary/80
          transition-colors cursor-pointer"
      >
        <span>{summary}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-4 h-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="px-4 py-3 border-t border-border-subtle text-small text-text-secondary">
          {children}
        </div>
      )}
    </div>
  );
}
