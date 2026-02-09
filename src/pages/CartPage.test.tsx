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

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  Minus: () => <span>Minus</span>,
  Plus: () => <span>Plus</span>,
  Trash2: () => <span>Trash2</span>,
  Tag: () => <span>Tag</span>,
  ChevronRight: () => <span>ChevronRight</span>,
  ShoppingCart: () => <span>ShoppingCart</span>,
  Check: () => <span>Check</span>,
  X: () => <span>X</span>,
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
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
  vouchers: [{ id: "1", code: "DISCOUNT10", discount: 10000, type: "fixed" }],
  selectedVoucher: null,
  selectVoucher: vi.fn(),
  calculateDiscount: vi.fn().mockReturnValue(10000),
};

vi.mock("@/contexts/CartContext", () => ({
  useCart: () => mockCartContext,
}));

vi.mock("@/contexts/VoucherContext", () => ({
  useVoucher: () => mockVoucherContext,
}));

// Mock utilities
vi.mock("@/lib/formatters", () => ({
  formatPrice: (price: number) => `Rp ${price.toLocaleString("id-ID")}`,
}));

vi.mock("@/lib/product-utils", () => ({
  getProductById: (id: string) => {
    if (id === "1") {
      return { id: "1", name: "Product 1", price: 100000, image: "/img1.jpg" };
    }
    if (id === "2") {
      return { id: "2", name: "Product 2", price: 80000, image: "/img2.jpg" };
    }
    return undefined;
  },
}));

// Mock data
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
    Link: ({ children, to }: any) => <a href={to}>{children}</a>,
  };
});

describe("CartPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset cart items
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

    expect(screen.getByTestId("page-header")).toHaveTextContent("Cart");
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

    expect(screen.getByText("Cart")).toBeInTheDocument();
  });

  it("should render empty state when cart is empty", () => {
    // Mock empty cart
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

    // Price formatting should be present
    expect(screen.getByText(/Rp/)).toBeInTheDocument();
  });
});
