"use client";

import { useEffect, useRef, useState } from "react";

interface AppendixProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export default function Appendix({ id, title, children }: AppendixProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const handledInitial = useRef(false);

  useEffect(() => {
    if (handledInitial.current) return;
    handledInitial.current = true;

    if (typeof window !== "undefined" && window.location.hash === `#${id}`) {
      setOpen(true);
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, [id]);

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === `#${id}`) {
        setOpen(true);
        setTimeout(() => {
          ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [id]);

  return (
    <div
      ref={ref}
      id={id}
      className="my-6 border border-border-subtle rounded-md overflow-hidden scroll-mt-24"
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-5 py-3.5
          text-body text-text-primary hover:text-accent
          bg-surface-secondary hover:bg-surface-secondary/80
          transition-colors cursor-pointer text-left"
      >
        <span className="font-display font-medium">{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-4 h-4 text-text-muted shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="px-5 py-4 border-t border-border-subtle prose-styled">
          {children}
        </div>
      )}
    </div>
  );
}
