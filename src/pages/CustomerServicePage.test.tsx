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

// Mock lucide-react with all icons used
vi.mock("lucide-react", () => {
  const icon = (props: any) => <svg {...props} />;
  return {
    ChevronRight: icon,
    FileText: icon,
    HelpCircle: icon,
    Mail: icon,
    MessageCircle: icon,
    Phone: icon,
    ShieldCheck: icon,
  };
});

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    a: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
  },
}));

describe("CustomerServicePage", () => {
  it("should render page header with correct title", () => {
    render(
      <MemoryRouter>
        <CustomerServicePage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("page-header")).toHaveTextContent("Customer Service");
  });

  it("should render navigation link", () => {
    render(
      <MemoryRouter>
        <CustomerServicePage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("nav-link")).toBeInTheDocument();
  });

  it("should render welcome banner", () => {
    render(
      <MemoryRouter>
        <CustomerServicePage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Halo, ada yang bisa kami bantu?")).toBeInTheDocument();
  });

  it("should render contact methods", () => {
    render(
      <MemoryRouter>
        <CustomerServicePage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Live Chat")).toBeInTheDocument();
    expect(screen.getByText("Telepon")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("should render help topics", () => {
    render(
      <MemoryRouter>
        <CustomerServicePage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Cara Pemesanan")).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toBeInTheDocument();
    expect(screen.getByText("Kebijakan Pengembalian")).toBeInTheDocument();
  });
});
