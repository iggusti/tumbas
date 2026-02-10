import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OrderDetailPage from "./OrderDetailPage";

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
  return {
    AlertTriangle: icon, Check: icon, CheckCircle: icon, Clock: icon, Copy: icon,
    CreditCard: icon, MapPin: icon, MessageSquare: icon, Package: icon, Truck: icon, XCircle: icon,
  };
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
  useOrder: () => ({
    getOrder: () => null,
    orders: [],
    updateOrder: vi.fn(),
    cancelOrder: vi.fn(),
  }),
}));

vi.mock("@/contexts/AddressContext", () => ({
  useAddress: () => ({ addresses: [] }),
  getAddressIcon: () => (props: any) => <svg {...props} />,
}));

vi.mock("@/contexts/NotificationContext", () => ({
  useNotification: () => ({
    addNotification: vi.fn(),
    hasUnreadNotifications: () => false,
  }),
}));

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: vi.fn() }),
}));

vi.mock("@/components/PaymentMethodSelector", () => ({
  default: () => null,
  paymentMethods: [],
}));

vi.mock("@/components/PaymentInstructions", () => ({
  default: () => null,
}));

vi.mock("@/lib/formatters", () => ({
  formatPrice: (p: number) => `Rp ${p.toLocaleString("id-ID")}`,
  formatDate: (d: string) => d,
}));

vi.mock("@/lib/product-utils", () => ({
  getProductById: () => null,
}));

vi.mock("@/data/constants", () => ({
  ORDER_STATUS_CONFIG: {},
  SHIPPING_OPTIONS: [],
}));

vi.mock("@/lib/validations", () => ({
  sellerMessageSchema: { safeParse: () => ({ success: true }) },
}));

describe("OrderDetailPage", () => {
  it("should render not found state for invalid order", () => {
    render(
      <MemoryRouter>
        <OrderDetailPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Pesanan tidak ditemukan")).toBeInTheDocument();
  });

  it("should render navigation link", () => {
    render(
      <MemoryRouter>
        <OrderDetailPage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("nav-link")).toBeInTheDocument();
  });
});
