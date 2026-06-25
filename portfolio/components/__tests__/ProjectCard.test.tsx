import { render, screen } from "@testing-library/react";
import ProjectCard from "@/components/projects/ProjectCard";

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { fill, ...rest } = props;
    return <img {...rest} data-fill={fill ? "true" : undefined} />;
  },
}));

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

  it("renders image when image prop is provided", () => {
    render(<ProjectCard {...defaultProps} image="/images/projects/test.svg" />);
    const img = screen.getByAltText("Test Project thumbnail");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/images/projects/test.svg");
  });
});
