import { render, screen } from "@testing-library/react";
import Header from "@/components/layout/Header";

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Header", () => {
  it("renders all 5 nav items", () => {
    render(<Header />);
    expect(screen.getByText("Work")).toBeInTheDocument();
    expect(screen.getByText("Writing")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Resume")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders site name as home link", () => {
    render(<Header />);
    const homeLink = screen.getByText("Henry Yu");
    expect(homeLink.closest("a")).toHaveAttribute("href", "/");
  });
});
