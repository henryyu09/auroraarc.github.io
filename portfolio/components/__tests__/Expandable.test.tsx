import { render, screen, fireEvent } from "@testing-library/react";
import Expandable from "@/components/mdx/Expandable";

describe("Expandable", () => {
  it("renders the summary text", () => {
    render(<Expandable summary="Click to expand">Hidden content</Expandable>);
    expect(screen.getByText("Click to expand")).toBeInTheDocument();
  });

  it("toggles content visibility on click", () => {
    render(<Expandable summary="Toggle me">Expandable content</Expandable>);
    expect(screen.queryByText("Expandable content")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Toggle me"));
    expect(screen.getByText("Expandable content")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Toggle me"));
    expect(screen.queryByText("Expandable content")).not.toBeInTheDocument();
  });
});
