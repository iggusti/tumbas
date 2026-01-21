import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CustomerServicePage from "./CustomerServicePage";

// Mock components
vi.mock("@/components/NavLink", () => ({
  default: () => <div data-testid="nav-link">NavLink</div>,
}));

vi.mock("@/components/PageHeader", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="page-header">{title}</div>
  ),
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("CustomerServicePage", () => {
  it("should render page header with correct title", () => {
    render(
      <MemoryRouter>
        <CustomerServicePage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("page-header")).toHaveTextContent(
      "Customer Service",
    );
  });

  it("should render navigation link", () => {
    render(
      <MemoryRouter>
        <CustomerServicePage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("nav-link")).toBeInTheDocument();
  });

  it("should render customer service content", () => {
    render(
      <MemoryRouter>
        <CustomerServicePage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/customer service|layanan/i)).toBeInTheDocument();
  });
});
