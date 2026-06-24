import { render, screen } from "@testing-library/react";
import Footer from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders social links", () => {
    render(<Footer />);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByText("Resume")).toBeInTheDocument();
  });

  it("has correct href for email", () => {
    render(<Footer />);
    const emailLink = screen.getByText("Email").closest("a");
    expect(emailLink).toHaveAttribute("href", "mailto:henry.yu094@gmail.com");
  });
});
