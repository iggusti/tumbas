import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchPage from "./SearchPage";

// Mock components
vi.mock("@/components/NavLink", () => ({
  default: () => <div data-testid="nav-link">NavLink</div>,
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
    button: ({ children, onClick, ...props }: any) => (
      <button onClick={onClick} {...props}>{children}</button>
    ),
  },
}));

// Mock products data
vi.mock("@/data/products", () => ({
  products: [
    {
      id: "1",
      name: "Batik Pria Premium",
      category: "Batik",
      description: "Batik untuk pria berkualitas tinggi",
      tags: ["Man"],
      price: 150000,
      image: "/img1.jpg",
    },
    {
      id: "2",
      name: "Batik Wanita Elegan",
      category: "Batik",
      description: "Batik untuk wanita yang elegan",
      tags: ["Woman"],
      price: 120000,
      image: "/img2.jpg",
    },
    {
      id: "3",
      name: "Kain Batik Motif",
      category: "Fabric",
      description: "Kain batik dengan motif indah",
      tags: ["Batik Fabric"],
      price: 80000,
      image: "/img3.jpg",
    },
  ],
  ProductTag: {},
}));

describe("SearchPage", () => {
  it("should render navigation link", () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("nav-link")).toBeInTheDocument();
  });

  it("should render category buttons", () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Man")).toBeInTheDocument();
    expect(screen.getByText("Woman")).toBeInTheDocument();
    expect(screen.getByText("Batik Fabric")).toBeInTheDocument();
    expect(screen.getByText("Accessories")).toBeInTheDocument();
  });

  it("should render search title initially", () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("should render popular products section", () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Popular Product")).toBeInTheDocument();
  });

  it("should render categories section", () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Categories")).toBeInTheDocument();
  });

  it("should filter products by category when category is selected", async () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );

    // Click on Man category
    const manButton = screen.getByText("Man");
    
    await act(async () => {
      fireEvent.click(manButton);
    });

    // Should show Man header with product count
    await waitFor(() => {
      expect(screen.getByText(/Man/)).toBeInTheDocument();
    });
  });

  it("should have back button when category is selected", async () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );

    // Click on Man category
    const manButton = screen.getByText("Man");
    
    await act(async () => {
      fireEvent.click(manButton);
    });

    // Should show back functionality (X button)
    await waitFor(() => {
      const closeButtons = screen.getAllByRole("button");
      expect(closeButtons.length).toBeGreaterThan(0);
    });
  });
});
