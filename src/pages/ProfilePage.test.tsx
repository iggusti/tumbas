import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProfilePage from "./ProfilePage";

vi.mock("@/components/NavLink", () => ({
  default: () => <div data-testid="nav-link">NavLink</div>,
}));

vi.mock("lucide-react", () => {
  const icon = (props: any) => <svg {...props} />;
  return {
    Bell: icon, ChevronRight: icon, ClipboardList: icon, Clock4: icon,
    CreditCard: icon, Headphones: icon, Heart: icon, MapPin: icon,
    Percent: icon, Phone: icon, User: icon,
  };
});

vi.mock("@/assets/profile-photo.jpg", () => ({ default: "/mock-photo.jpg" }));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
}));

describe("ProfilePage", () => {
  it("should render profile page title", () => {
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>,
    );
    expect(screen.getByText("tumbas.")).toBeInTheDocument();
  });

  it("should render navigation link", () => {
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("nav-link")).toBeInTheDocument();
  });

  it("should render quick actions", () => {
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>,
    );
    expect(screen.getByText("My Orders")).toBeInTheDocument();
    expect(screen.getByText("Promo Code")).toBeInTheDocument();
    expect(screen.getByText("Customer Service")).toBeInTheDocument();
  });
});
