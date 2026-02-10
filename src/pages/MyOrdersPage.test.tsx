import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MyOrdersPage from "./MyOrdersPage";

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
  return { Package: icon };
});

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

vi.mock("@/contexts/OrderContext", () => ({
  useOrder: () => ({ orders: [] }),
}));

vi.mock("@/lib/formatters", () => ({
  formatPrice: (p: number) => `Rp ${p}`,
  formatDateShort: (d: string) => d,
}));

vi.mock("@/data/constants", () => ({
  ORDER_STATUS_CONFIG: {},
}));

vi.mock("@/lib/product-utils", () => ({
  getProductById: () => null,
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: ({ children, to, ...props }: any) => <a href={to} {...props}>{children}</a>,
  };
});

describe("MyOrdersPage", () => {
  it("should render page header with correct title", () => {
    render(
      <MemoryRouter>
        <MyOrdersPage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("page-header")).toHaveTextContent("Pesanan Saya");
  });

  it("should render navigation link", () => {
    render(
      <MemoryRouter>
        <MyOrdersPage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("nav-link")).toBeInTheDocument();
  });

  it("should show empty state when no orders", () => {
    render(
      <MemoryRouter>
        <MyOrdersPage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });
});
