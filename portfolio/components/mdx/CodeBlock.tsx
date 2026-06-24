"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  highlightedLines?: number[];
  collapse?: boolean;
  tabs?: { label: string; code: string; language: string }[];
}

export default function CodeBlock({
  code,
  language = "text",
  filename,
  highlightedLines,
  collapse = false,
  tabs,
}: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(!collapse);

  const displayCode = tabs ? tabs[activeTab]?.code ?? code : code;
  const displayLang = tabs ? tabs[activeTab]?.language ?? language : language;
  const displayFilename = tabs ? tabs[activeTab]?.label ?? filename : filename;

  const lines = displayCode.split("\n");
  const isLong = lines.length > 15;
  const showLines = expanded ? lines : lines.slice(0, 15);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(displayCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-lg border border-border-subtle overflow-hidden
      shadow-sm bg-surface-secondary">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2
        border-b border-border-subtle bg-surface-primary/50">
        <div className="flex items-center gap-2">
          {tabs ? (
            <div className="flex gap-1">
              {tabs.map((tab, i) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  className={`px-2 py-0.5 text-tiny rounded ${
                    i === activeTab
                      ? "bg-accent-subtle text-accent"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          ) : displayFilename ? (
            <span className="text-tiny text-text-muted font-code">
              {displayFilename}
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-tiny text-text-muted uppercase">{displayLang}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-0.5 text-tiny rounded
              text-text-muted hover:text-text-primary hover:bg-surface-secondary
              transition-colors cursor-pointer"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied!
              </>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Code */}
      <pre className="p-4 overflow-x-auto text-small leading-relaxed font-code m-0 border-0 bg-transparent">
        <code>
          {showLines.map((line, i) => {
            const lineNum = i + 1;
            const isHighlighted = highlightedLines?.includes(lineNum);
            return (
              <span
                key={i}
                className={`block ${
                  isHighlighted
                    ? "bg-accent-subtle/50 -mx-4 px-4 border-l-2 border-accent"
                    : ""
                }`}
              >
                {line || " "}
              </span>
            );
          })}
        </code>
      </pre>

      {/* Collapse toggle */}
      {collapse && isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-4 py-2 text-tiny text-text-muted hover:text-accent
            border-t border-border-subtle bg-surface-primary/50
            transition-colors cursor-pointer"
        >
          {expanded ? "Show less" : `Show full snippet (${lines.length} lines)`}
        </button>
      )}
    </div>
  );
}
