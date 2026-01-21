import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import PageHeader from "./PageHeader";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    header: ({ children, ...props }: any) => (
      <header {...props}>{children}</header>
    ),
  },
}));

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: ({ children, to, onClick, ...props }: any) => (
      <a href={to} onClick={onClick} {...props}>
        {children}
      </a>
    ),
  };
});

describe("PageHeader", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("should render regular header with title", () => {
    render(
      <MemoryRouter>
        <PageHeader title="Test Page" />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test Page")).toBeInTheDocument();
    expect(screen.getByText("tumbas.")).toBeInTheDocument();
  });

  it("should render about page header when isAboutPage is true", () => {
    render(
      <MemoryRouter>
        <PageHeader title="About Page" isAboutPage={true} />
      </MemoryRouter>,
    );

    expect(screen.getByText("tumbas.")).toBeInTheDocument();
    // Should not show the title in about page mode
    expect(screen.queryByText("About Page")).not.toBeInTheDocument();
  });

  it("should navigate back when back button is clicked", () => {
    render(
      <MemoryRouter>
        <PageHeader title="Test Page" />
      </MemoryRouter>,
    );

    const backButton = screen.getByRole("link");
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("should have correct styling for regular header", () => {
    const { container } = render(
      <MemoryRouter>
        <PageHeader title="Test Page" />
      </MemoryRouter>,
    );

    const header = container.querySelector("header");
    expect(header).toHaveClass(
      "sticky",
      "top-0",
      "z-50",
      "bg-background",
      "px-4",
      "py-3",
      "flex",
      "items-center",
      "gap-3",
    );
  });

  it("should have correct styling for about page header", () => {
    const { container } = render(
      <MemoryRouter>
        <PageHeader title="About Page" isAboutPage={true} />
      </MemoryRouter>,
    );

    const header = container.querySelector("header");
    expect(header).toHaveClass("flex", "items-center", "gap-3", "px-4", "py-4");
  });

  it("should render back arrow icon", () => {
    render(
      <MemoryRouter>
        <PageHeader title="Test Page" />
      </MemoryRouter>,
    );

    const icon = document.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("width", "20");
    expect(icon).toHaveAttribute("height", "20");
  });

  it("should have correct text colors for regular header", () => {
    render(
      <MemoryRouter>
        <PageHeader title="Test Page" />
      </MemoryRouter>,
    );

    const arrowIcon = document.querySelector("svg");
    expect(arrowIcon).toHaveClass("text-foreground");

    const brandText = screen.getAllByText("tumbas.")[0];
    expect(brandText).toHaveClass("text-muted-foreground", "text-sm");
  });

  it("should have correct text colors for about page header", () => {
    render(
      <MemoryRouter>
        <PageHeader title="About Page" isAboutPage={true} />
      </MemoryRouter>,
    );

    const arrowIcon = document.querySelector("svg");
    expect(arrowIcon).toHaveClass("text-white");

    const brandText = screen.getByText("tumbas.");
    expect(brandText).toHaveClass("text-white/80", "text-sm");
  });
});
