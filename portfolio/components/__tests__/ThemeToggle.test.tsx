import { render, screen } from "@testing-library/react";
import ThemeToggle from "@/components/ui/ThemeToggle";

// Mock the theme context
vi.mock("@/lib/theme", () => ({
  useTheme: () => ({
    theme: "light",
    toggle: vi.fn(),
  }),
}));

describe("ThemeToggle", () => {
  it("renders a toggle button with aria-label", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label");
  });
});
