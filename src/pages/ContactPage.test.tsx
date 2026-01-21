import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ContactPage from "./ContactPage";

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

describe("ContactPage", () => {
  it("should render page header with correct title", () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("page-header")).toHaveTextContent("Contact");
  });

  it("should render navigation link", () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("nav-link")).toBeInTheDocument();
  });

  it("should render contact information", () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/contact|kontak/i)).toBeInTheDocument();
  });
});
