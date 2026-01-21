import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FAQPage from "./FAQPage";

// Mock components
vi.mock("@/components/NavLink", () => ({
  default: () => <div data-testid="nav-link">NavLink</div>,
}));

vi.mock("@/components/PageHeader", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="page-header">{title}</div>
  ),
}));

vi.mock("@/components/ui/accordion", () => ({
  Accordion: ({ children }: any) => (
    <div data-testid="accordion">{children}</div>
  ),
  AccordionContent: ({ children }: any) => (
    <div data-testid="accordion-content">{children}</div>
  ),
  AccordionItem: ({ children }: any) => (
    <div data-testid="accordion-item">{children}</div>
  ),
  AccordionTrigger: ({ children }: any) => (
    <button data-testid="accordion-trigger">{children}</button>
  ),
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("FAQPage", () => {
  it("should render page header with correct title", () => {
    render(
      <MemoryRouter>
        <FAQPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("page-header")).toHaveTextContent("FAQ");
  });

  it("should render navigation link", () => {
    render(
      <MemoryRouter>
        <FAQPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("nav-link")).toBeInTheDocument();
  });

  it("should render FAQ categories", () => {
    render(
      <MemoryRouter>
        <FAQPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Pemesanan")).toBeInTheDocument();
    expect(screen.getByText("Pembayaran")).toBeInTheDocument();
    expect(screen.getByText("Pengiriman")).toBeInTheDocument();
    expect(screen.getByText("Pengembalian")).toBeInTheDocument();
  });

  it("should render FAQ questions", () => {
    render(
      <MemoryRouter>
        <FAQPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("Bagaimana cara memesan produk?"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Metode pembayaran apa saja yang tersedia?"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Berapa lama waktu pengiriman?"),
    ).toBeInTheDocument();
  });

  it("should render accordion components", () => {
    render(
      <MemoryRouter>
        <FAQPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("accordion")).toBeInTheDocument();
    expect(screen.getAllByTestId("accordion-item")).toHaveLength(4); // 4 categories
  });

  it("should expand accordion items when clicked", () => {
    render(
      <MemoryRouter>
        <FAQPage />
      </MemoryRouter>,
    );

    const triggers = screen.getAllByTestId("accordion-trigger");
    expect(triggers.length).toBeGreaterThan(0);

    // Click first trigger
    fireEvent.click(triggers[0]);

    // Should show content
    expect(screen.getByTestId("accordion-content")).toBeInTheDocument();
  });

  it("should render contact information", () => {
    render(
      <MemoryRouter>
        <FAQPage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/customer service|kontak/i)).toBeInTheDocument();
  });

  it("should have proper styling classes", () => {
    const { container } = render(
      <MemoryRouter>
        <FAQPage />
      </MemoryRouter>,
    );

    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass("min-h-screen", "bg-background");
  });
});
