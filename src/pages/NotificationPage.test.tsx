import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotificationPage from "./NotificationPage";

vi.mock("@/components/NavLink", () => ({
  default: () => <div data-testid="nav-link">NavLink</div>,
}));

vi.mock("lucide-react", () => {
  const icon = (props: any) => <svg {...props} />;
  return { Bell: icon, Package: icon, Percent: icon };
});

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
  },
}));

vi.mock("@/contexts/NotificationContext", () => ({
  useNotification: () => ({
    notifications: [],
    markAsRead: vi.fn(),
    hasUnreadNotifications: () => false,
  }),
}));

describe("NotificationPage", () => {
  it("should render page title", () => {
    render(
      <MemoryRouter>
        <NotificationPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Notifikasi")).toBeInTheDocument();
  });

  it("should render navigation link", () => {
    render(
      <MemoryRouter>
        <NotificationPage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("nav-link")).toBeInTheDocument();
  });

  it("should render empty state when no notifications", () => {
    render(
      <MemoryRouter>
        <NotificationPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Belum ada notifikasi")).toBeInTheDocument();
  });
});
