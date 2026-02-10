import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AboutBatikIndramayuPage from "./AboutBatikIndramayuPage";

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

vi.mock("@/assets/about-batik-indramayu.png", () => ({ default: "/mock.png" }));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, style, ...props }: any) => (
      <div style={style} {...props}>{children}</div>
    ),
  },
}));

describe("AboutBatikIndramayuPage", () => {
  it("should render the page header with correct title", () => {
    render(
      <MemoryRouter>
        <AboutBatikIndramayuPage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("page-header")).toHaveTextContent("About Batik Indramayu - About");
  });

  it("should render navigation link", () => {
    render(
      <MemoryRouter>
        <AboutBatikIndramayuPage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("nav-link")).toBeInTheDocument();
  });

  it("should render the about batik content", () => {
    render(
      <MemoryRouter>
        <AboutBatikIndramayuPage />
      </MemoryRouter>,
    );
    // Text is inside a <strong> tag
    expect(screen.getByText("Batik Indramayu")).toBeInTheDocument();
  });

  it("should have correct container styling", () => {
    const { container } = render(
      <MemoryRouter>
        <AboutBatikIndramayuPage />
      </MemoryRouter>,
    );
    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass("min-h-screen", "bg-background", "max-w-[480px]", "mx-auto", "relative");
  });
});
