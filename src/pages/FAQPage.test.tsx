import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
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
  Accordion: ({ children, ...props }: any) => (
    <div data-testid="accordion" {...props}>{children}</div>
  ),
  AccordionContent: ({ children }: any) => (
    <div data-testid="accordion-content">{children}</div>
  ),
  AccordionItem: ({ children, ...props }: any) => (
    <div data-testid="accordion-item" {...props}>{children}</div>
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
    expect(screen.getByText("Produk")).toBeInTheDocument();
  });

  it("should render FAQ questions", () => {
    render(
      <MemoryRouter>
        <FAQPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Bagaimana cara memesan produk?")).toBeInTheDocument();
    expect(screen.getByText("Metode pembayaran apa saja yang tersedia?")).toBeInTheDocument();
    expect(screen.getByText("Berapa lama waktu pengiriman?")).toBeInTheDocument();
  });

  it("should render accordion components", () => {
    render(
      <MemoryRouter>
        <FAQPage />
      </MemoryRouter>,
    );

    // 4 categories = 4 accordions, each with 3 items = 12 accordion items
    expect(screen.getAllByTestId("accordion")).toHaveLength(4);
    expect(screen.getAllByTestId("accordion-item")).toHaveLength(12);
  });

  it("should render accordion triggers for each question", () => {
    render(
      <MemoryRouter>
        <FAQPage />
      </MemoryRouter>,
    );

    const triggers = screen.getAllByTestId("accordion-trigger");
    expect(triggers).toHaveLength(12);
  });

  it("should render contact CTA", () => {
    render(
      <MemoryRouter>
        <FAQPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Hubungi Customer Service →")).toBeInTheDocument();
  });

  it("should have proper styling classes", () => {
    const { container } = render(
      <MemoryRouter>
        <FAQPage />
      </MemoryRouter>,
    );

    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass("mobile-container");
  });
});
