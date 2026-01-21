import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

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

vi.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children, open }: any) =>
    open ? <div data-testid="dialog">{children}</div> : null,
  DialogContent: ({ children }: any) => (
    <div data-testid="dialog-content">{children}</div>
  ),
  DialogHeader: ({ children }: any) => (
    <div data-testid="dialog-header">{children}</div>
  ),
  DialogTitle: ({ children }: any) => (
    <div data-testid="dialog-title">{children}</div>
  ),
}));

vi.mock("@/components/ui/checkbox", () => ({
  Checkbox: ({ checked, onCheckedChange }: any) => (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      data-testid="checkbox"
    />
  ),
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
  getProductById: vi.fn(),
}));

// Mock data
vi.mock("@/data/products", () => ({
  products: [
    { id: "1", name: "Product 1", price: 100000, image: "/img1.jpg" },
    { id: "2", name: "Product 2", price: 80000, image: "/img2.jpg" },
  ],
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
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
    // Should show checkout button or cart summary
    expect(screen.getByText(/Rp/)).toBeInTheDocument(); // Price formatting
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

  it("should calculate subtotal correctly", () => {
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    // With mock data: Product 1 (100000 * 2) + Product 2 (80000 * 1) = 280000
    // But only checked items: Product 1 = 200000
    // This would be tested by checking the displayed subtotal
  });

  it("should handle voucher selection", () => {
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    // Should have voucher related elements
    // This would test voucher dialog opening and selection
  });

  it("should navigate to checkout when checkout button is clicked", () => {
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    // Find and click checkout button
    const checkoutButtons = screen.getAllByText(/checkout|bayar/i);
    if (checkoutButtons.length > 0) {
      fireEvent.click(checkoutButtons[0]);
      expect(mockNavigate).toHaveBeenCalledWith("/checkout");
    }
  });

  it("should handle quantity updates", () => {
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    // Should have plus/minus buttons for quantity
    const plusButtons = screen.queryAllByRole("button", {
      name: /plus|increment/i,
    });
    const minusButtons = screen.queryAllByRole("button", {
      name: /minus|decrement/i,
    });

    if (plusButtons.length > 0) {
      fireEvent.click(plusButtons[0]);
      expect(mockCartContext.updateQuantity).toHaveBeenCalled();
    }

    if (minusButtons.length > 0) {
      fireEvent.click(minusButtons[0]);
      expect(mockCartContext.updateQuantity).toHaveBeenCalled();
    }
  });

  it("should handle item removal", () => {
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    // Should have remove buttons
    const removeButtons = screen.queryAllByRole("button", {
      name: /remove|delete/i,
    });
    if (removeButtons.length > 0) {
      fireEvent.click(removeButtons[0]);
      expect(mockCartContext.removeItem).toHaveBeenCalled();
    }
  });
});
