import { render, screen } from "@testing-library/react";
import Hero from "@/components/home/Hero";

describe("Hero", () => {
  it("renders name and positioning line", () => {
    render(<Hero />);
    expect(screen.getByText("Henry Yu")).toBeInTheDocument();
    expect(
      screen.getByText(/CS \+ Statistics student/i)
    ).toBeInTheDocument();
  });

  it("renders CTA buttons with correct links", () => {
    render(<Hero />);
    const projectsLink = screen.getByText("View projects");
    expect(projectsLink.closest("a")).toHaveAttribute("href", "/projects");

    const aboutLink = screen.getByText("About me");
    expect(aboutLink.closest("a")).toHaveAttribute("href", "/about");
  });
});
