import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MyAccountPage from "./MyAccountPage";

vi.mock("@/components/NavLink", () => ({
  default: () => <div data-testid="nav-link">NavLink</div>,
}));

vi.mock("@/components/PageHeader", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="page-header">{title}</div>
  ),
}));

vi.mock("lucide-react", () => {
  const icon = (props: any) => <svg {...props} />;
  return { Camera: icon, ChevronRight: icon, Eye: icon, EyeOff: icon, Lock: icon, Mail: icon, Phone: icon, User: icon };
});

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
}));

vi.mock("@/contexts/ProfileContext", () => ({
  useProfile: () => ({
    profile: { fullName: "Test User", email: "test@test.com", phone: "08123", photo: "/photo.jpg" },
    updateProfile: vi.fn(),
    updatePhoto: vi.fn(),
  }),
}));

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

vi.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children, open }: any) => open ? <div>{children}</div> : null,
  DialogContent: ({ children }: any) => <div>{children}</div>,
  DialogHeader: ({ children }: any) => <div>{children}</div>,
  DialogTitle: ({ children }: any) => <div>{children}</div>,
}));

vi.mock("@/components/ui/input", () => ({
  Input: (props: any) => <input {...props} />,
}));

vi.mock("@/components/ui/label", () => ({
  Label: ({ children, ...props }: any) => <label {...props}>{children}</label>,
}));

vi.mock("@/lib/validations", () => ({
  profileSchema: {},
  passwordSchema: {},
}));

vi.mock("@hookform/resolvers/zod", () => ({
  zodResolver: () => () => ({ values: {}, errors: {} }),
}));

describe("MyAccountPage", () => {
  it("should render page header with correct title", () => {
    render(
      <MemoryRouter>
        <MyAccountPage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("page-header")).toHaveTextContent("My Account");
  });

  it("should render navigation link", () => {
    render(
      <MemoryRouter>
        <MyAccountPage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("nav-link")).toBeInTheDocument();
  });

  it("should display user info", () => {
    render(
      <MemoryRouter>
        <MyAccountPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Test User")).toBeInTheDocument();
  });
});
