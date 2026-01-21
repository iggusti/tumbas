import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RecentlyViewedPage from "./RecentlyViewedPage";

vi.mock("@/components/NavLink", () => ({
  default: () => <div data-testid="nav-link">NavLink</div>,
}));

vi.mock("@/components/PageHeader", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="page-header">{title}</div>
  ),
}));

vi.mock("@/components/EmptyState", () => ({
  default: ({ title, description }: { title: string; description: string }) => (
    <div data-testid="empty-state">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  ),
}));

vi.mock("@/components/ProductCard", () => ({
  default: ({ name }: { name: string }) => (
    <div data-testid="product-card">{name}</div>
  ),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("RecentlyViewedPage", () => {
  it("should render page header with correct title", () => {
    render(
      <MemoryRouter>
        <RecentlyViewedPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("page-header")).toHaveTextContent(
      "Recently Viewed",
    );
  });

  it("should render navigation link", () => {
    render(
      <MemoryRouter>
        <RecentlyViewedPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("nav-link")).toBeInTheDocument();
  });
});
