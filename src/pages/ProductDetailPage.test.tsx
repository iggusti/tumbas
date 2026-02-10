import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductDetailPage from "./ProductDetailPage";

// Mock components
vi.mock("@/components/NavLink", () => ({
  default: () => <div data-testid="nav-link">NavLink</div>,
}));

vi.mock("@/hooks/use-toast", () => ({
  toast: vi.fn(),
  useToast: () => ({ toast: vi.fn() }),
}));

vi.mock("lucide-react", () => {
  const icon = (props: any) => <svg {...props} />;
  return { ArrowLeft: icon, Heart: icon, Share2: icon, ShoppingCart: icon, Plus: icon };
});

const mockCartContext = { addToCart: vi.fn() };
const mockFavoritesContext = { isFavorite: vi.fn().mockReturnValue(false), toggleFavorite: vi.fn() };
const mockRecentlyViewedContext = { addToRecentlyViewed: vi.fn() };

vi.mock("@/contexts/CartContext", () => ({ useCart: () => mockCartContext }));
vi.mock("@/contexts/FavoritesContext", () => ({ useFavorites: () => mockFavoritesContext }));
vi.mock("@/contexts/RecentlyViewedContext", () => ({ useRecentlyViewed: () => mockRecentlyViewedContext }));

vi.mock("@/lib/formatters", () => ({
  formatPrice: (price: number) => `Rp ${price.toLocaleString("id-ID")}`,
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
    button: ({ children, onClick, ...props }: any) => (
      <button onClick={onClick} {...props}>{children}</button>
    ),
  },
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: "1" }),
    Link: ({ children, to, onClick, ...props }: any) => (
      <a href={to} onClick={onClick} {...props}>{children}</a>
    ),
  };
});

vi.mock("@/data/products", () => ({
  products: [
    {
      id: "1",
      name: "Test Product Name",
      description: "Short desc",
      price: 150000,
      originalPrice: 180000,
      image: "/img1.jpg",
      tags: ["Man"],
      category: "Batik Tulis",
      material: "Premium cotton",
      dyeingProcess: "Natural Dye",
    },
  ],
}));

describe("ProductDetailPage", () => {
  it("should render product details", () => {
    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>,
    );
    // Product renders with price
    expect(screen.getByText("Rp 150.000")).toBeInTheDocument();
  });

  it("should render navigation link", () => {
    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("nav-link")).toBeInTheDocument();
  });

  it("should add product to recently viewed on mount", () => {
    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>,
    );
    expect(mockRecentlyViewedContext.addToRecentlyViewed).toHaveBeenCalledWith("1");
  });

  it("should display product price", () => {
    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Rp 150.000")).toBeInTheDocument();
  });

  it("should display product category", () => {
    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Batik Tulis")).toBeInTheDocument();
  });

  it("should display product material", () => {
    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Premium cotton")).toBeInTheDocument();
  });

  it("should have add button", () => {
    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Add")).toBeInTheDocument();
  });
});
