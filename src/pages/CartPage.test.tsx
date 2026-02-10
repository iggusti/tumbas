import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CartPage from "./CartPage";
import { MemoryRouter } from "react-router-dom";

// Mock components
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

// Mock lucide-react
vi.mock("lucide-react", () => {
  const icon = ({ children, ...props }: any) => <svg {...props}>{children}</svg>;
  return {
    Check: icon,
    ChevronRight: icon,
    Coins: icon,
    Minus: icon,
    Plus: icon,
    ShoppingCart: icon,
    Tag: icon,
  };
});

// Mock framer-motion
vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, onClick, disabled, className, ...props }: any) => (
      <button onClick={onClick} disabled={disabled} className={className}>{children}</button>
    ),
  },
}));

// Mock UI components
vi.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children, open }: any) => open ? <div>{children}</div> : null,
  DialogContent: ({ children }: any) => <div>{children}</div>,
  DialogHeader: ({ children }: any) => <div>{children}</div>,
  DialogTitle: ({ children }: any) => <div>{children}</div>,
}));

vi.mock("@/components/ui/checkbox", () => ({
  Checkbox: (props: any) => <input type="checkbox" {...props} />,
}));

// Mock contexts
const mockCartContext = {
  cartItems: [
    { productId: "1", quantity: 2, checked: true },
    { productId: "2", quantity: 1, checked: false },
  ],
  updateQuantity: vi.fn(),
  removeItem: vi.fn(),
  toggleCheck: vi.fn(),
};

const mockVoucherContext = {
  vouchers: [],
  selectedVoucher: null,
  selectVoucher: vi.fn(),
  calculateDiscount: vi.fn().mockReturnValue(0),
};

vi.mock("@/contexts/CartContext", () => ({ useCart: () => mockCartContext }));
vi.mock("@/contexts/VoucherContext", () => ({ useVoucher: () => mockVoucherContext }));

// Mock utilities
vi.mock("@/lib/formatters", () => ({
  formatPrice: (price: number) => `Rp ${price.toLocaleString("id-ID")}`,
}));

vi.mock("@/lib/product-utils", () => ({
  getProductById: (id: string) => {
    if (id === "1") return { id: "1", name: "Product 1", price: 100000, image: "/img1.jpg" };
    if (id === "2") return { id: "2", name: "Product 2", price: 80000, image: "/img2.jpg" };
    return undefined;
  },
}));

vi.mock("@/data/products", () => ({
  products: [
    { id: "1", name: "Product 1", price: 100000, image: "/img1.jpg" },
    { id: "2", name: "Product 2", price: 80000, image: "/img2.jpg" },
  ],
}));

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: ({ children, to, ...props }: any) => <a href={to} {...props}>{children}</a>,
  };
});

describe("CartPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCartContext.cartItems = [
      { productId: "1", quantity: 2, checked: true },
      { productId: "2", quantity: 1, checked: false },
    ];
  });

  it("should render page header with correct title", () => {
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("page-header")).toHaveTextContent("Keranjang Saya");
  });

  it("should render navigation link", () => {
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("nav-link")).toBeInTheDocument();
  });

  it("should render cart items when cart is not empty", () => {
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
  });

  it("should render empty state when cart is empty", () => {
    mockCartContext.cartItems = [];

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("should display price formatting", () => {
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Rp 100.000")).toBeInTheDocument();
  });
});
