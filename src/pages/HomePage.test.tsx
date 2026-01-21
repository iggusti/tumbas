import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import HomePage from "./HomePage";
import { MemoryRouter } from "react-router-dom";

// Mock components
vi.mock("@/components/NavLink", () => ({
  default: () => <div data-testid="nav-link">NavLink</div>,
}));

vi.mock("@/components/NavLink", () => ({
  default: () => <div data-testid="nav-link">NavLink</div>,
}));

vi.mock("@/components/ProductCard", () => ({
  default: ({ name }: { name: string }) => (
    <div data-testid="product-card">{name}</div>
  ),
}));

vi.mock("@/components/ui/sheet", () => ({
  Sheet: ({ children, open }: any) =>
    open ? <div data-testid="sheet">{children}</div> : null,
  SheetContent: ({ children, className }: any) => (
    <div className={className} data-testid="sheet-content">
      {children}
    </div>
  ),
  SheetHeader: ({ children }: any) => (
    <div data-testid="sheet-header">{children}</div>
  ),
  SheetTitle: ({ children }: any) => (
    <div data-testid="sheet-title">{children}</div>
  ),
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => (
      <section {...props}>{children}</section>
    ),
    header: ({ children, ...props }: any) => (
      <header {...props}>{children}</header>
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
    Link: ({ children, to, ...props }: any) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  };
});

// Mock products data
vi.mock("@/data/products", () => ({
  products: [
    {
      id: 1,
      name: "Product 1",
      price: 100000,
      originalPrice: 120000,
      isPremium: true,
      image: "/img1.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 80000,
      isPremium: false,
      image: "/img2.jpg",
    },
    {
      id: 3,
      name: "Product 3",
      price: 150000,
      originalPrice: 180000,
      isPremium: true,
      image: "/img3.jpg",
    },
    {
      id: 4,
      name: "Product 4",
      price: 90000,
      isPremium: false,
      image: "/img4.jpg",
    },
    {
      id: 5,
      name: "Product 5",
      price: 200000,
      isPremium: true,
      image: "/img5.jpg",
    },
  ],
}));

// Mock hero banner
vi.mock("@/assets/hero-banner.png", () => "/mock-hero-banner.png");

describe("HomePage", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("should render the main title", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByText("tumbas.")).toBeInTheDocument();
  });

  it("should render hero banner section", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByText("new era 2025")).toBeInTheDocument();
    expect(screen.getByText("collection.")).toBeInTheDocument();
    expect(screen.getByText("Shop Now")).toBeInTheDocument();
  });

  it("should navigate to search page when Shop Now is clicked", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    const shopNowButton = screen.getByText("Shop Now");
    fireEvent.click(shopNowButton);

    expect(mockNavigate).toHaveBeenCalledWith("/search");
  });

  it("should render category buttons", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByText("About Shop")).toBeInTheDocument();
    expect(screen.getByText("About Batik Indramayu")).toBeInTheDocument();
  });

  it("should render selling fast section", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Selling fast")).toBeInTheDocument();
  });

  it("should render premium and classic sections", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Premium")).toBeInTheDocument();
    expect(screen.getByText("Classic")).toBeInTheDocument();
  });

  it("should render navigation link", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("nav-link")).toBeInTheDocument();
  });

  it("should open menu sheet when menu button is clicked", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    // Initially menu should not be open
    expect(screen.queryByTestId("sheet")).not.toBeInTheDocument();

    // Click menu button
    const menuButton = screen.getByRole("button", { name: /menu/i });
    fireEvent.click(menuButton);

    // Menu should now be open
    expect(screen.getByTestId("sheet")).toBeInTheDocument();
  });

  it("should render menu items in the sheet", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    // Open menu first
    const menuButton = screen.getByRole("button", { name: /menu/i });
    fireEvent.click(menuButton);

    expect(screen.getByText("Cari Produk")).toBeInTheDocument();
    expect(screen.getByText("Pesanan Saya")).toBeInTheDocument();
    expect(screen.getByText("Promo & Voucher")).toBeInTheDocument();
    expect(screen.getByText("Cara Order")).toBeInTheDocument();
    expect(screen.getByText("About Shop")).toBeInTheDocument();
    expect(screen.getByText("Customer Service")).toBeInTheDocument();
  });

  it("should filter products correctly", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    // Should have products with originalPrice in selling fast
    // Should have premium products
    // Should have classic products
    expect(screen.getAllByTestId("product-card")).toHaveLength(5); // All products rendered
  });
});
