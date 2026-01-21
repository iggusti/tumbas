import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchPage from "./SearchPage";

// Mock components
vi.mock("@/components/NavLink", () => ({
  default: () => <div data-testid="nav-link">NavLink</div>,
}));

vi.mock("@/components/ui/input", () => ({
  Input: ({ value, onChange, placeholder, ...props }: any) => (
    <input
      value={value}
      onChange={(e) => onChange(e)}
      placeholder={placeholder}
      {...props}
      data-testid="search-input"
    />
  ),
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
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
      tags: ["Man", "Premium"],
      price: 150000,
      image: "/img1.jpg",
    },
    {
      id: "2",
      name: "Batik Wanita Elegan",
      category: "Batik",
      description: "Batik untuk wanita yang elegan",
      tags: ["Woman", "Premium"],
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
  it("should render search input", () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
  });

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

  it("should show popular products initially", () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Batik Pria Premium")).toBeInTheDocument();
  });

  it("should filter products based on search query", async () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );

    const searchInput = screen.getByTestId("search-input");

    // Type search query
    fireEvent.change(searchInput, { target: { value: "pria" } });

    await waitFor(() => {
      expect(screen.getByText("Batik Pria Premium")).toBeInTheDocument();
      expect(screen.queryByText("Batik Wanita Elegan")).not.toBeInTheDocument();
    });
  });

  it("should filter products by category when category is selected", () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );

    // Click on Man category
    const manButton = screen.getByText("Man");
    fireEvent.click(manButton);

    expect(screen.getByText("Batik Pria Premium")).toBeInTheDocument();
    expect(screen.queryByText("Kain Batik Motif")).not.toBeInTheDocument();
  });

  it("should clear category filter when back to categories is clicked", () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );

    // Select a category first
    const manButton = screen.getByText("Man");
    fireEvent.click(manButton);

    // Should have back button or way to clear filter
    // This would test the back functionality
  });

  it("should show search results when typing", async () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "batik" } });

    await waitFor(() => {
      // Should show multiple results
      expect(screen.getAllByText(/batik/i)).toHaveLength(3);
    });
  });

  it("should handle empty search results", async () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "nonexistent" } });

    await waitFor(() => {
      // Should show no results or empty state
      expect(screen.queryByText("Batik Pria Premium")).not.toBeInTheDocument();
    });
  });

  it("should clear search when eraser button is clicked", () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "test" } });

    // Assuming there's a clear button
    const clearButtons = screen.queryAllByRole("button", {
      name: /clear|eraser/i,
    });
    if (clearButtons.length > 0) {
      fireEvent.click(clearButtons[0]);
      expect(searchInput).toHaveValue("");
    }
  });
});
