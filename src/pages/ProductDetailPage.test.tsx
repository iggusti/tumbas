import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductDetailPage from "./ProductDetailPage";

// Mock components
vi.mock("@/components/NavLink", () => ({
  default: () => <div data-testid="nav-link">NavLink</div>,
}));

// Mock hooks
vi.mock("@/hooks/use-toast", () => ({
  toast: vi.fn(),
}));

// Mock contexts
const mockCartContext = {
  addToCart: vi.fn(),
};

const mockFavoritesContext = {
  isFavorite: vi.fn().mockReturnValue(false),
  toggleFavorite: vi.fn(),
};

const mockRecentlyViewedContext = {
  addToRecentlyViewed: vi.fn(),
};

vi.mock("@/contexts/CartContext", () => ({
  useCart: () => mockCartContext,
}));

vi.mock("@/contexts/FavoritesContext", () => ({
  useFavorites: () => mockFavoritesContext,
}));

vi.mock("@/contexts/RecentlyViewedContext", () => ({
  useRecentlyViewed: () => mockRecentlyViewedContext,
}));

// Mock utilities
vi.mock("@/lib/formatters", () => ({
  formatPrice: (price: number) => `Rp ${price.toLocaleString("id-ID")}`,
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    img: ({ ...props }: any) => <img {...props} />,
  },
}));

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: "1" }),
    Link: ({ children, to }: any) => <a href={to}>{children}</a>,
  };
});

// Mock products data
vi.mock("@/data/products", () => ({
  products: [
    {
      id: "1",
      name: "Test Product",
      description:
        "This is a very long description that should be truncated in the short version but shown in full when expanded.",
      price: 150000,
      originalPrice: 180000,
      images: ["/img1.jpg", "/img2.jpg"],
      tags: ["Premium", "Batik"],
      category: "Batik",
      stock: 10,
      weight: 500,
    },
  ],
}));

describe("ProductDetailPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render product details for valid product ID", () => {
    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText(/Rp 150.000/)).toBeInTheDocument();
  });

  it("should render navigation link", () => {
    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("nav-link")).toBeInTheDocument();
  });

  it('should show "Product not found" for invalid product ID', () => {
    // Mock invalid product ID
    vi.mocked(require("react-router-dom").useParams).mockReturnValue({
      id: "999",
    });

    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Product not found")).toBeInTheDocument();
  });

  it("should add product to recently viewed on mount", () => {
    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>,
    );

    expect(mockRecentlyViewedContext.addToRecentlyViewed).toHaveBeenCalledWith(
      "1",
    );
  });

  it("should handle add to cart", () => {
    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>,
    );

    const addToCartButton = screen.getByRole("button", {
      name: /add to cart|keranjang/i,
    });
    fireEvent.click(addToCartButton);

    expect(mockCartContext.addToCart).toHaveBeenCalledWith("1", 1);
  });

  it("should handle favorite toggle", () => {
    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>,
    );

    const favoriteButton = screen.getByRole("button", {
      name: /favorite|heart/i,
    });
    fireEvent.click(favoriteButton);

    expect(mockFavoritesContext.toggleFavorite).toHaveBeenCalledWith("1");
  });

  it("should show truncated description initially", () => {
    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>,
    );

    // Should show truncated description (first 80 characters)
    expect(
      screen.getByText(/This is a very long description/),
    ).toBeInTheDocument();
  });

  it("should expand description when show more is clicked", () => {
    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>,
    );

    // Click show more button
    const showMoreButton = screen.getByText(/show more|selengkapnya/i);
    fireEvent.click(showMoreButton);

    // Should show full description
    expect(screen.getByText(/expanded/i)).toBeInTheDocument();
  });

  it("should display product images", () => {
    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>,
    );

    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("should show original price with strikethrough when discounted", () => {
    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>,
    );

    // Should show original price with strikethrough
    expect(screen.getByText("Rp 180.000")).toHaveClass("line-through");
  });

  it("should navigate back when back button is clicked", () => {
    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>,
    );

    const backButton = screen.getByRole("button", { name: /back|arrow/i });
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("should handle share functionality", () => {
    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>,
    );

    const shareButton = screen.getByRole("button", { name: /share/i });
    fireEvent.click(shareButton);

    // Should trigger share API or fallback
    // This would test the share functionality
  });
});
