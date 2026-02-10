import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ContactPage from "./ContactPage";

// Mock components
vi.mock("@/components/PageHeader", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="page-header">{title}</div>
  ),
}));

// Mock lucide-react with all icons used by ContactPage
vi.mock("lucide-react", () => {
  const icon = (props: any) => <svg {...props} />;
  return {
    ArrowLeft: icon,
    Clock: icon,
    Facebook: icon,
    Globe: icon,
    Instagram: icon,
    Mail: icon,
    MapPin: icon,
    Phone: icon,
  };
});

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    a: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
  },
}));

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: ({ children, to, ...props }: any) => <a href={to} {...props}>{children}</a>,
  };
});

describe("ContactPage", () => {
  it("should render page header with correct title", () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("page-header")).toHaveTextContent("Contact");
  });

  it("should render contact information", () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Informasi Kontak")).toBeInTheDocument();
    expect(screen.getByText("+62 812-3456-7890")).toBeInTheDocument();
    expect(screen.getByText("hello@tumbas.id")).toBeInTheDocument();
  });

  it("should render social media section", () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Ikuti Kami")).toBeInTheDocument();
    expect(screen.getByText("@tumbas.batik")).toBeInTheDocument();
  });

  it("should render WhatsApp CTA", () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Chat via WhatsApp")).toBeInTheDocument();
  });
});
