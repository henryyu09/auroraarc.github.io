import { Fragment } from "react";

interface DescriptionProps {
  text: string;
}

type InlineNode =
  | { type: "text"; content: string }
  | { type: "code"; content: string }
  | { type: "bold"; content: string }
  | { type: "italic"; content: string }
  | { type: "boldItalic"; content: string }
  | { type: "link"; content: string; url: string };

function tokenize(text: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    const boldItalicMatch = remaining.match(/^\*\*\*([^*]+)\*\*\*/);
    if (boldItalicMatch) {
      nodes.push({ type: "boldItalic", content: boldItalicMatch[1] });
      remaining = remaining.slice(boldItalicMatch[0].length);
      continue;
    }

    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      nodes.push({ type: "code", content: codeMatch[1] });
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      nodes.push({
        type: "link",
        content: linkMatch[1],
        url: linkMatch[2],
      });
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      nodes.push({ type: "bold", content: boldMatch[1] });
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    const italicMatch = remaining.match(/^\*([^*]+)\*/);
    if (italicMatch) {
      nodes.push({ type: "italic", content: italicMatch[1] });
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    const nextSpecial = remaining.search(/[`*\[\]]/);
    if (nextSpecial === 0) {
      nodes.push({ type: "text", content: remaining[0] });
      remaining = remaining.slice(1);
    } else if (nextSpecial > 0) {
      nodes.push({ type: "text", content: remaining.slice(0, nextSpecial) });
      remaining = remaining.slice(nextSpecial);
    } else {
      nodes.push({ type: "text", content: remaining });
      remaining = "";
    }
  }

  return nodes;
}

function renderNodes(nodes: InlineNode[], startKey: number = 0): React.ReactNode[] {
  return nodes.map((node, i) => {
    const key = startKey + i;
    switch (node.type) {
      case "text":
        return node.content;
      case "code":
        return <code key={key}>{node.content}</code>;
      case "bold":
        return <strong key={key}>{node.content}</strong>;
      case "italic":
        return <em key={key}>{node.content}</em>;
      case "boldItalic":
        return (
          <strong key={key}>
            <em>{node.content}</em>
          </strong>
        );
      case "link":
        return (
          <a
            key={key}
            href={node.url}
            rel="noopener noreferrer"
            target="_blank"
            className="text-accent hover:underline"
          >
            {node.content}
          </a>
        );
    }
  });
}

export default function Description({ text }: DescriptionProps) {
  if (!text) return null;

  const lines = text.split("\n");
  return lines.map((line, i) => {
    const nodes = tokenize(line);
    return (
      <Fragment key={i}>
        {i > 0 && <br />}
        {renderNodes(nodes, i * 100)}
      </Fragment>
    );
  });
}
