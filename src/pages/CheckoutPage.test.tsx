import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CheckoutPage from "./CheckoutPage";

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
    AlertTriangle: icon, Check: icon, ChevronRight: icon, CreditCard: icon,
    HandCoins: icon, MapPin: icon, MessageSquare: icon, Tag: icon,
  };
});

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, onClick, ...props }: any) => <button onClick={onClick} {...props}>{children}</button>,
  },
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ state: { items: [] } }),
    Link: ({ children, to, ...props }: any) => <a href={to} {...props}>{children}</a>,
  };
});

vi.mock("@/contexts/AddressContext", () => ({
  useAddress: () => ({
    addresses: [],
    selectedAddressId: null,
    selectAddress: vi.fn(),
    getSelectedAddress: () => null,
  }),
  getAddressIcon: () => (props: any) => <svg {...props} />,
}));

vi.mock("@/contexts/VoucherContext", () => ({
  useVoucher: () => ({
    vouchers: [],
    selectedVoucher: null,
    selectVoucher: vi.fn(),
    calculateDiscount: () => 0,
  }),
}));

vi.mock("@/contexts/CartContext", () => ({
  useCart: () => ({ clearCheckedItems: vi.fn() }),
}));

vi.mock("@/contexts/OrderContext", () => ({
  useOrder: () => ({ addOrder: vi.fn() }),
}));

vi.mock("@/contexts/NotificationContext", () => ({
  useNotification: () => ({ addNotification: vi.fn() }),
}));

vi.mock("@/components/PaymentMethodSelector", () => ({
  default: () => null,
  paymentMethods: [{ id: "bca", name: "BCA", icon: (props: any) => <svg {...props} /> }],
}));

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

vi.mock("@/lib/formatters", () => ({
  formatPrice: (p: number) => `Rp ${p}`,
}));

vi.mock("@/lib/product-utils", () => ({
  getProductById: () => null,
}));

vi.mock("@/data/constants", () => ({
  SHIPPING_OPTIONS: [{
    name: "Regular",
    price: 15000,
    eta: "3-5 hari",
    icon: (props: any) => <svg {...props} />,
  }],
}));

vi.mock("@/lib/validations", () => ({
  sellerMessageSchema: { safeParse: () => ({ success: true }) },
}));

vi.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children, open }: any) => open ? <div>{children}</div> : null,
  DialogContent: ({ children }: any) => <div>{children}</div>,
  DialogHeader: ({ children }: any) => <div>{children}</div>,
  DialogTitle: ({ children }: any) => <div>{children}</div>,
}));

vi.mock("@/components/ui/alert-dialog", () => ({
  AlertDialog: ({ children, open }: any) => open ? <div>{children}</div> : null,
  AlertDialogAction: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  AlertDialogCancel: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  AlertDialogContent: ({ children }: any) => <div>{children}</div>,
  AlertDialogDescription: ({ children }: any) => <p>{children}</p>,
  AlertDialogFooter: ({ children }: any) => <div>{children}</div>,
  AlertDialogHeader: ({ children }: any) => <div>{children}</div>,
  AlertDialogTitle: ({ children }: any) => <div>{children}</div>,
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

vi.mock("@/components/ui/label", () => ({
  Label: ({ children, ...props }: any) => <label {...props}>{children}</label>,
}));

vi.mock("@/components/ui/textarea", () => ({
  Textarea: (props: any) => <textarea {...props} />,
}));

describe("CheckoutPage", () => {
  it("should render page header with correct title", () => {
    render(
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("page-header")).toHaveTextContent("Checkout");
  });

  it("should render navigation link", () => {
    render(
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("nav-link")).toBeInTheDocument();
  });
});
