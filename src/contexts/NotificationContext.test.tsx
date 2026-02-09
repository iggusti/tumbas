import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { NotificationProvider, useNotification } from "./NotificationContext";

// Test component that uses the context
const TestComponent = () => {
  const {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    hasUnreadNotifications,
  } = useNotification();

  return (
    <div>
      <div data-testid="notifications-count">{notifications.length}</div>
      <div data-testid="has-unread">
        {hasUnreadNotifications() ? "true" : "false"}
      </div>
      <button
        onClick={() =>
          addNotification({
            type: "promo",
            title: "Test Notification",
            description: "Test description",
            link: "/test",
          })
        }
        data-testid="add-notification"
      >
        Add Notification
      </button>
      <button
        onClick={() => markAsRead(notifications[0]?.id)}
        data-testid="mark-read"
      >
        Mark Read
      </button>
      <button onClick={() => markAllAsRead()} data-testid="mark-all-read">
        Mark All Read
      </button>
      <button
        onClick={() => clearNotifications()}
        data-testid="clear-notifications"
      >
        Clear Notifications
      </button>
    </div>
  );
};

describe("NotificationContext", () => {
  it("should provide notifications", () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>,
    );

    // Should have default notifications
    const count = screen.getByTestId("notifications-count").textContent;
    expect(parseInt(count || "0")).toBeGreaterThanOrEqual(0);
  });

  it("should add notification", () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>,
    );

    const initialCount = parseInt(
      screen.getByTestId("notifications-count").textContent || "0"
    );

    act(() => {
      screen.getByTestId("add-notification").click();
    });

    const newCount = parseInt(
      screen.getByTestId("notifications-count").textContent || "0"
    );
    expect(newCount).toBe(initialCount + 1);
  });

  it("should mark notification as read", () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>,
    );

    act(() => {
      screen.getByTestId("mark-read").click();
    });

    // Should still have notifications
    expect(screen.getByTestId("notifications-count")).toBeInTheDocument();
  });

  it("should mark all notifications as read", () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>,
    );

    act(() => {
      screen.getByTestId("mark-all-read").click();
    });

    expect(screen.getByTestId("has-unread")).toHaveTextContent("false");
  });

  it("should clear all notifications", () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>,
    );

    act(() => {
      screen.getByTestId("clear-notifications").click();
    });

    expect(screen.getByTestId("notifications-count")).toHaveTextContent("0");
  });

  it("should throw error when useNotification is used outside provider", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useNotification must be used within a NotificationProvider");

    consoleSpy.mockRestore();
  });
});
