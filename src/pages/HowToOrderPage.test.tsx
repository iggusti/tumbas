import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HowToOrderPage from "./HowToOrderPage";

vi.mock("@/components/NavLink", () => ({
  default: () => <div data-testid="nav-link">NavLink</div>,
}));

vi.mock("@/components/PageHeader", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="page-header">{title}</div>
  ),
}));

vi.mock("lucide-react", () => {
  const icon = (props: any) => <svg {...props} />;
  return { CheckCircle: icon, Clock: icon, CreditCard: icon, Package: icon, ShoppingCart: icon, Truck: icon };
});

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("HowToOrderPage", () => {
  it("should render page header with correct title", () => {
    render(
      <MemoryRouter>
        <HowToOrderPage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("page-header")).toHaveTextContent("Cara Pemesanan");
  });

  it("should render navigation link", () => {
    render(
      <MemoryRouter>
        <HowToOrderPage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("nav-link")).toBeInTheDocument();
  });

  it("should render ordering instructions", () => {
    render(
      <MemoryRouter>
        <HowToOrderPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Panduan Pemesanan")).toBeInTheDocument();
    expect(screen.getByText("Pilih Produk")).toBeInTheDocument();
  });
});
