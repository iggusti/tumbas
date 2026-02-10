import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutShopPage from "./AboutShopPage";

vi.mock("@/components/NavLink", () => ({
  default: () => <div data-testid="nav-link">NavLink</div>,
}));

vi.mock("@/components/PageHeader", () => ({
  default: ({ title, isAboutPage }: { title: string; isAboutPage: boolean }) => (
    <div data-testid="page-header">
      {title} - {isAboutPage ? "About" : "Regular"}
    </div>
  ),
}));

vi.mock("@/assets/about-shop.png", () => ({ default: "/mock-about-shop.png" }));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, style, ...props }: any) => (
      <div style={style} {...props}>{children}</div>
    ),
  },
}));

describe("AboutShopPage", () => {
  it("should render the page header with correct title", () => {
    render(<AboutShopPage />);
    expect(screen.getByTestId("page-header")).toHaveTextContent("About Shop - About");
  });

  it("should render navigation link", () => {
    render(<AboutShopPage />);
    expect(screen.getByTestId("nav-link")).toBeInTheDocument();
  });

  it("should render the about shop content", () => {
    render(<AboutShopPage />);
    // Check for text within a strong tag
    const strongEl = screen.getByText("Tumbas");
    expect(strongEl).toBeInTheDocument();
  });

  it("should have correct container styling", () => {
    const { container } = render(<AboutShopPage />);
    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass("min-h-screen", "bg-background", "max-w-[480px]", "mx-auto", "relative");
  });

  it("should render all content paragraphs", () => {
    render(<AboutShopPage />);
    const paragraphs = screen.getAllByText(/^.{50,}/);
    expect(paragraphs.length).toBeGreaterThan(2);
  });

  it("should render hero background image", () => {
    render(<AboutShopPage />);
    const img = screen.getByAltText("Batik Background");
    expect(img).toBeInTheDocument();
  });
});
