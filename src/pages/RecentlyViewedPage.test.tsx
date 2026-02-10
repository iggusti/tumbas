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

vi.mock("lucide-react", () => {
  const icon = (props: any) => <svg {...props} />;
  return { Clock4: icon };
});

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

vi.mock("@/contexts/RecentlyViewedContext", () => ({
  useRecentlyViewed: () => ({ recentlyViewed: [] }),
}));

vi.mock("@/lib/formatters", () => ({
  formatPrice: (price: number) => `Rp ${price.toLocaleString("id-ID")}`,
}));

vi.mock("@/data/products", () => ({
  products: [],
}));

describe("RecentlyViewedPage", () => {
  it("should render page header with correct title", () => {
    render(
      <MemoryRouter>
        <RecentlyViewedPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("page-header")).toHaveTextContent("Terakhir Dilihat");
  });

  it("should render navigation link", () => {
    render(
      <MemoryRouter>
        <RecentlyViewedPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("nav-link")).toBeInTheDocument();
  });

  it("should render empty state when no recently viewed", () => {
    render(
      <MemoryRouter>
        <RecentlyViewedPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });
});
