import CodeBlock from "./CodeBlock";
import Callout from "./Callout";
import Figure from "./Figure";
import Chart from "./Chart";
import Diagram from "./Diagram";
import Expandable from "./Expandable";

export const mdxComponents = {
  CodeBlock,
  Callout,
  Figure,
  Chart,
  Diagram,
  Expandable,
  // Map standard HTML block elements to custom styles via wrapper components
  pre: ({ children }: { children: React.ReactNode }) => (
    <div className="my-6 rounded-lg border border-border-subtle overflow-hidden bg-surface-secondary">
      <pre className="p-4 overflow-x-auto text-small leading-relaxed font-code m-0">
        {children}
      </pre>
    </div>
  ),
  img: ({ src, alt }: { src: string; alt: string }) => (
    <Figure src={src} alt={alt} />
  ),
};
