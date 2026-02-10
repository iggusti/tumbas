import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TrackingPage from "./TrackingPage";

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
  return { CheckCircle: icon, Clock: icon, MapPin: icon, Package: icon, Truck: icon, XCircle: icon };
});

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ orderId: "nonexistent" }),
    Link: ({ children, to, ...props }: any) => <a href={to} {...props}>{children}</a>,
  };
});

vi.mock("@/contexts/OrderContext", () => ({
  useOrder: () => ({ getOrder: () => null }),
}));

vi.mock("@/lib/formatters", () => ({
  formatDate: (d: string) => d,
}));

describe("TrackingPage", () => {
  it("should render not found state for invalid order", () => {
    render(
      <MemoryRouter>
        <TrackingPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Pesanan tidak ditemukan")).toBeInTheDocument();
  });

  it("should render navigation link", () => {
    render(
      <MemoryRouter>
        <TrackingPage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("nav-link")).toBeInTheDocument();
  });
});
