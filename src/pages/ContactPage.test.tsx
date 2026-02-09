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

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  Phone: () => <span>Phone</span>,
  Mail: () => <span>Mail</span>,
  MapPin: () => <span>MapPin</span>,
  Clock: () => <span>Clock</span>,
  MessageCircle: () => <span>MessageCircle</span>,
  Instagram: () => <span>Instagram</span>,
  Facebook: () => <span>Facebook</span>,
  Send: () => <span>Send</span>,
  ExternalLink: () => <span>ExternalLink</span>,
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
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

  it("should render page content", () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    // Page should render without errors
    expect(screen.getByTestId("page-header")).toBeInTheDocument();
  });
});
