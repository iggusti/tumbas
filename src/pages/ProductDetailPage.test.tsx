import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductDetailPage from "./ProductDetailPage";

// Mock components
vi.mock("@/components/NavLink", () => ({
  default: () => <div data-testid="nav-link">NavLink</div>,
}));

// Mock sonner
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  ArrowLeft: () => <span>ArrowLeft</span>,
  Heart: () => <span>Heart</span>,
  Share2: () => <span>Share2</span>,
  ShoppingCart: () => <span>ShoppingCart</span>,
  Minus: () => <span>Minus</span>,
  Plus: () => <span>Plus</span>,
  Star: () => <span>Star</span>,
  MapPin: () => <span>MapPin</span>,
  ChevronRight: () => <span>ChevronRight</span>,
  ChevronDown: () => <span>ChevronDown</span>,
  ChevronUp: () => <span>ChevronUp</span>,
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
    img: (props: any) => <img {...props} />,
    button: ({ children, onClick, ...props }: any) => (
      <button onClick={onClick} {...props}>{children}</button>
    ),
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
      description: "This is a very long description that should be truncated in the short version but shown in full when expanded.",
      price: 150000,
      originalPrice: 180000,
      image: "/img1.jpg",
      tags: ["Man", "Batik Fabric"],
      category: "Batik Tulis",
      origin: "Indramayu, West Java",
      material: "Premium cotton",
      dyeingProcess: "Natural Dye",
    },
  ],
}));

// Mock product-utils
vi.mock("@/lib/product-utils", () => ({
  getProductById: (id: string) => {
    if (id === "1") {
      return {
        id: "1",
        name: "Test Product",
        description: "This is a very long description that should be truncated in the short version but shown in full when expanded.",
        price: 150000,
        originalPrice: 180000,
        image: "/img1.jpg",
        tags: ["Man", "Batik Fabric"],
        category: "Batik Tulis",
        origin: "Indramayu, West Java",
        material: "Premium cotton",
        dyeingProcess: "Natural Dye",
      };
    }
    return undefined;
  },
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

    expect(mockRecentlyViewedContext.addToRecentlyViewed).toHaveBeenCalledWith(
      "1",
    );
  });

  it("should display product price", () => {
    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>,
    );

    // Price should be displayed
    expect(screen.getByText(/Rp 150/)).toBeInTheDocument();
  });

  it("should display product category", () => {
    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Batik Tulis")).toBeInTheDocument();
  });

  it("should display product origin", () => {
    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Indramayu/)).toBeInTheDocument();
  });

  it("should have add to cart button", () => {
    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>,
    );

    // Check for add to cart button
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });
});
