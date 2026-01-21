import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavLink from "./NavLink";

// Mock contexts
const mockNotificationContext = {
  hasUnreadNotifications: vi.fn().mockReturnValue(true),
};

vi.mock("@/contexts/NotificationContext", () => ({
  useNotification: () => mockNotificationContext,
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("NavLink", () => {
  it("should render all navigation items", () => {
    render(
      <MemoryRouter>
        <NavLink />
      </MemoryRouter>,
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Notification")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("should highlight active navigation item", () => {
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <NavLink />
      </MemoryRouter>,
    );

    // The active item should have the 'active' class
    const navItems = document.querySelectorAll(".nav-item");
    const activeItem = Array.from(navItems).find((item) =>
      item.classList.contains("active"),
    );
    expect(activeItem).toBeInTheDocument();
  });

  it("should show notification indicator when there are unread notifications", () => {
    render(
      <MemoryRouter>
        <NavLink />
      </MemoryRouter>,
    );

    const notificationIndicator = document.querySelector(".bg-accent");
    expect(notificationIndicator).toBeInTheDocument();
  });

  it("should not show notification indicator when there are no unread notifications", () => {
    mockNotificationContext.hasUnreadNotifications.mockReturnValue(false);

    render(
      <MemoryRouter>
        <NavLink />
      </MemoryRouter>,
    );

    const notificationIndicator = document.querySelector(".bg-accent");
    expect(notificationIndicator).not.toBeInTheDocument();
  });

  it("should have correct navigation container styling", () => {
    const { container } = render(
      <MemoryRouter>
        <NavLink />
      </MemoryRouter>,
    );

    const nav = container.querySelector("nav");
    expect(nav).toHaveClass("bottom-nav");

    const navContainer = nav?.querySelector("div");
    expect(navContainer).toHaveClass(
      "flex",
      "items-center",
      "justify-around",
      "h-full",
      "px-4",
    );
  });

  it("should render navigation links with correct paths", () => {
    render(
      <MemoryRouter>
        <NavLink />
      </MemoryRouter>,
    );

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(4);

    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[1]).toHaveAttribute("href", "/search");
    expect(links[2]).toHaveAttribute("href", "/notification");
    expect(links[3]).toHaveAttribute("href", "/profile");
  });

  it("should render icons with correct sizes", () => {
    render(
      <MemoryRouter>
        <NavLink />
      </MemoryRouter>,
    );

    const icons = document.querySelectorAll("svg");
    expect(icons).toHaveLength(4);

    icons.forEach((icon) => {
      expect(icon).toHaveAttribute("width", "22");
      expect(icon).toHaveAttribute("height", "22");
    });
  });
});
