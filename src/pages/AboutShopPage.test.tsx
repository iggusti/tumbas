import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import AboutShopPage from "./AboutShopPage";

// Mock the components
vi.mock("@/components/NavLink", () => ({
  default: () => <div data-testid="nav-link">NavLink</div>,
}));

vi.mock("@/components/PageHeader", () => ({
  default: ({
    title,
    isAboutPage,
  }: {
    title: string;
    isAboutPage: boolean;
  }) => (
    <div data-testid="page-header">
      {title} - {isAboutPage ? "About" : "Regular"}
    </div>
  ),
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("AboutShopPage", () => {
  it("should render the page header with correct title", () => {
    render(<AboutShopPage />);

    expect(screen.getByTestId("page-header")).toHaveTextContent(
      "About Shop - About",
    );
  });

  it("should render navigation link", () => {
    render(<AboutShopPage />);

    expect(screen.getByTestId("nav-link")).toBeInTheDocument();
  });

  it("should render the about shop content", () => {
    render(<AboutShopPage />);

    expect(
      screen.getByText(/Tumbas adalah platform digital/),
    ).toBeInTheDocument();
    expect(screen.getByText(/batik khas kekayaan/)).toBeInTheDocument();
    expect(screen.getByText(/pengrajin batik lokal/)).toBeInTheDocument();
  });

  it("should have correct container styling", () => {
    const { container } = render(<AboutShopPage />);

    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass(
      "min-h-screen",
      "bg-background",
      "max-w-[480px]",
      "mx-auto",
      "relative",
    );
  });

  it("should render all content paragraphs", () => {
    render(<AboutShopPage />);

    const paragraphs = screen.getAllByText(/^.{50,}/); // Get paragraphs with substantial content
    expect(paragraphs.length).toBeGreaterThan(2); // Should have multiple paragraphs
  });

  it("should have draggable content sheet", () => {
    render(<AboutShopPage />);

    // The draggable div should be present
    const draggableElements = document.querySelectorAll(
      '[style*="touch-action"]',
    );
    expect(draggableElements.length).toBeGreaterThan(0);
  });
});
