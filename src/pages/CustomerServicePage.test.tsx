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

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  Phone: () => <span>Phone</span>,
  Mail: () => <span>Mail</span>,
  MessageCircle: () => <span>MessageCircle</span>,
  Clock: () => <span>Clock</span>,
  ChevronRight: () => <span>ChevronRight</span>,
  HelpCircle: () => <span>HelpCircle</span>,
  FileText: () => <span>FileText</span>,
  Package: () => <span>Package</span>,
  CreditCard: () => <span>CreditCard</span>,
  RotateCcw: () => <span>RotateCcw</span>,
  ExternalLink: () => <span>ExternalLink</span>,
  Send: () => <span>Send</span>,
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
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

  it("should render page content", () => {
    render(
      <MemoryRouter>
        <CustomerServicePage />
      </MemoryRouter>,
    );

    // Page should render without errors
    expect(screen.getByTestId("page-header")).toBeInTheDocument();
  });
});
