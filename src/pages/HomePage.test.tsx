import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import HomePage from "./HomePage";
import { MemoryRouter } from "react-router-dom";

// Mock components
vi.mock("@/components/NavLink", () => ({
  default: () => <div data-testid="nav-link">NavLink</div>,
}));

vi.mock("@/components/ProductCard", () => ({
  default: ({ name }: { name: string }) => (
    <div data-testid="product-card">{name}</div>
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
      id: "1",
      name: "Product 1",
      price: 100000,
      originalPrice: 120000,
      isPremium: true,
      image: "/img1.jpg",
    },
    {
      id: "2",
      name: "Product 2",
      price: 80000,
      isPremium: false,
      image: "/img2.jpg",
    },
    {
      id: "3",
      name: "Product 3",
      price: 150000,
      originalPrice: 180000,
      isPremium: true,
      image: "/img3.jpg",
    },
  ],
}));

// Mock hero banner
vi.mock("@/assets/hero-banner.png", () => ({
  default: "/mock-hero-banner.png",
}));

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
});
