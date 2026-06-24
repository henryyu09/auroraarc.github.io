import { render, screen } from "@testing-library/react";
import ProjectCard from "@/components/projects/ProjectCard";

describe("ProjectCard", () => {
  const defaultProps = {
    title: "Test Project",
    description: "A test project description",
    tags: ["Quantum", "ML"],
    slug: "test-project",
  };

  it("renders title, description, and tags", () => {
    render(<ProjectCard {...defaultProps} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.getByText("A test project description")).toBeInTheDocument();
    expect(screen.getByText("Quantum")).toBeInTheDocument();
    expect(screen.getByText("ML")).toBeInTheDocument();
  });

  it("links to the correct slug", () => {
    render(<ProjectCard {...defaultProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/projects/test-project");
  });
});
