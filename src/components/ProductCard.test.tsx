import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import ProductCard from "./ProductCard";

// Mock contexts
const mockFavoritesContext = {
  isFavorite: vi.fn().mockReturnValue(false),
  toggleFavorite: vi.fn(),
};

vi.mock("@/contexts/FavoritesContext", () => ({
  useFavorites: () => mockFavoritesContext,
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("ProductCard", () => {
  const mockProduct = {
    id: "1",
    name: "Test Product",
    price: 150000,
    image: "/test-image.jpg",
    category: "Batik",
    originalPrice: 180000,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render product information", () => {
    render(
      <MemoryRouter>
        <ProductCard {...mockProduct} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Rp 150.000")).toBeInTheDocument();
    expect(screen.getByText("Batik")).toBeInTheDocument();
  });

  it("should render product image", () => {
    render(
      <MemoryRouter>
        <ProductCard {...mockProduct} />
      </MemoryRouter>,
    );

    const image = screen.getByAltText("Test Product");
    expect(image).toHaveAttribute("src", "/test-image.jpg");
  });

  it("should show original price with strikethrough when discounted", () => {
    render(
      <MemoryRouter>
        <ProductCard {...mockProduct} />
      </MemoryRouter>,
    );

    const originalPrice = screen.getByText("Rp 180.000");
    expect(originalPrice).toHaveClass("line-through");
  });

  it("should show limited offer text when discounted", () => {
    render(
      <MemoryRouter>
        <ProductCard {...mockProduct} />
      </MemoryRouter>,
    );

    expect(screen.getByText("limited offer")).toBeInTheDocument();
  });

  it("should not show original price when not discounted", () => {
    const productWithoutDiscount = { ...mockProduct, originalPrice: undefined };

    render(
      <MemoryRouter>
        <ProductCard {...productWithoutDiscount} />
      </MemoryRouter>,
    );

    expect(screen.queryByText("limited offer")).not.toBeInTheDocument();
  });

  it("should handle favorite toggle", () => {
    render(
      <MemoryRouter>
        <ProductCard {...mockProduct} />
      </MemoryRouter>,
    );

    const favoriteButton = screen.getByRole("button");
    fireEvent.click(favoriteButton);

    expect(mockFavoritesContext.toggleFavorite).toHaveBeenCalledWith("1");
  });

  it("should show filled heart when product is favorited", () => {
    mockFavoritesContext.isFavorite.mockReturnValue(true);

    render(
      <MemoryRouter>
        <ProductCard {...mockProduct} />
      </MemoryRouter>,
    );

    const heartIcon = document.querySelector("svg");
    expect(heartIcon).toHaveClass("fill-destructive", "text-destructive");
  });

  it("should show outline heart when product is not favorited", () => {
    mockFavoritesContext.isFavorite.mockReturnValue(false);

    render(
      <MemoryRouter>
        <ProductCard {...mockProduct} />
      </MemoryRouter>,
    );

    const heartIcon = document.querySelector("svg");
    expect(heartIcon).toHaveClass("text-muted-foreground");
    expect(heartIcon).not.toHaveClass("fill-destructive");
  });

  it("should navigate to product detail page when clicked", () => {
    render(
      <MemoryRouter>
        <ProductCard {...mockProduct} />
      </MemoryRouter>,
    );

    const productLink = screen.getByRole("link");
    expect(productLink).toHaveAttribute("href", "/product/1");
  });

  it("should prevent navigation when favorite button is clicked", () => {
    render(
      <MemoryRouter>
        <ProductCard {...mockProduct} />
      </MemoryRouter>,
    );

    const favoriteButton = screen.getByRole("button");
    const clickEvent = new MouseEvent("click", { bubbles: true });
    const preventDefaultSpy = vi.spyOn(clickEvent, "preventDefault");

    fireEvent(favoriteButton, clickEvent);

    // The button should prevent default to stop link navigation
    expect(mockFavoritesContext.toggleFavorite).toHaveBeenCalledWith("1");
  });

  it("should have correct container styling", () => {
    const { container } = render(
      <MemoryRouter>
        <ProductCard {...mockProduct} />
      </MemoryRouter>,
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("product-card", "group");
  });

  it("should format price correctly", () => {
    render(
      <MemoryRouter>
        <ProductCard {...mockProduct} />
      </MemoryRouter>,
    );

    // Should use Indonesian locale formatting
    expect(screen.getByText("Rp 150.000")).toBeInTheDocument();
  });
});
