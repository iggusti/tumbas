import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
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

    expect(screen.getByTestId("notifications-count")).toHaveTextContent("3"); // Default notifications
  });

  it("should add notification", () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>,
    );

    expect(screen.getByTestId("notifications-count")).toHaveTextContent("3");

    const addButton = screen.getByTestId("add-notification");
    addButton.click();

    expect(screen.getByTestId("notifications-count")).toHaveTextContent("4");
  });

  it("should mark notification as read", () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>,
    );

    expect(screen.getByTestId("has-unread")).toHaveTextContent("true");

    const markReadButton = screen.getByTestId("mark-read");
    markReadButton.click();

    // Should have fewer unread notifications
  });

  it("should mark all notifications as read", () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>,
    );

    expect(screen.getByTestId("has-unread")).toHaveTextContent("true");

    const markAllReadButton = screen.getByTestId("mark-all-read");
    markAllReadButton.click();

    expect(screen.getByTestId("has-unread")).toHaveTextContent("false");
  });

  it("should clear all notifications", () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>,
    );

    expect(screen.getByTestId("notifications-count")).toHaveTextContent("3");

    const clearButton = screen.getByTestId("clear-notifications");
    clearButton.click();

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
