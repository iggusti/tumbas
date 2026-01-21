import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FavoritesPage from "./FavoritesPage";

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

vi.mock("@/components/ProductCard", () => ({
  default: ({ name }: { name: string }) => (
    <div data-testid="product-card">{name}</div>
  ),
}));

// Mock contexts
const mockFavoritesContext = {
  favorites: ["1", "2"],
  isFavorite: vi.fn(),
  toggleFavorite: vi.fn(),
};

vi.mock("@/contexts/FavoritesContext", () => ({
  useFavorites: () => mockFavoritesContext,
}));

// Mock products data
vi.mock("@/data/products", () => ({
  products: [
    { id: "1", name: "Favorite Product 1", price: 100000, image: "/img1.jpg" },
    { id: "2", name: "Favorite Product 2", price: 80000, image: "/img2.jpg" },
  ],
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("FavoritesPage", () => {
  it("should render page header with correct title", () => {
    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("page-header")).toHaveTextContent("Favorites");
  });

  it("should render navigation link", () => {
    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("nav-link")).toBeInTheDocument();
  });

  it("should render favorite products when favorites exist", () => {
    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Favorite Product 1")).toBeInTheDocument();
    expect(screen.getByText("Favorite Product 2")).toBeInTheDocument();
  });

  it("should render empty state when no favorites", () => {
    // Mock empty favorites
    mockFavoritesContext.favorites = [];

    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });
});
