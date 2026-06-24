import { render, screen } from "@testing-library/react";
import Callout from "@/components/mdx/Callout";

describe("Callout", () => {
  it("renders children content", () => {
    render(<Callout>Test callout content</Callout>);
    expect(screen.getByText("Test callout content")).toBeInTheDocument();
  });

  it("renders info type by default", () => {
    const { container } = render(<Callout>Default info</Callout>);
    expect(container.firstChild).toHaveClass("border-accent");
  });

  it("renders warning type with correct styling", () => {
    const { container } = render(<Callout type="warning">Warning</Callout>);
    expect(container.firstChild).toHaveClass("border-amber-500");
  });

  it("renders tip type with correct styling", () => {
    const { container } = render(<Callout type="tip">Tip</Callout>);
    expect(container.firstChild).toHaveClass("border-sky-500");
  });
});
