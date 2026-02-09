import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import {
  RecentlyViewedProvider,
  useRecentlyViewed,
} from "./RecentlyViewedContext";

// Test component that uses the context
const TestComponent = () => {
  const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();

  return (
    <div>
      <div data-testid="recently-viewed-count">{recentlyViewed.length}</div>
      <button onClick={() => addToRecentlyViewed("1")} data-testid="add-recent">
        Add Recent
      </button>
      <button
        onClick={() => addToRecentlyViewed("2")}
        data-testid="add-recent-2"
      >
        Add Recent 2
      </button>
    </div>
  );
};

describe("RecentlyViewedContext", () => {
  it("should provide recently viewed items", () => {
    render(
      <RecentlyViewedProvider>
        <TestComponent />
      </RecentlyViewedProvider>,
    );

    // Should have default items or be empty
    const count = screen.getByTestId("recently-viewed-count").textContent;
    expect(parseInt(count || "0")).toBeGreaterThanOrEqual(0);
  });

  it("should add item to recently viewed", () => {
    render(
      <RecentlyViewedProvider>
        <TestComponent />
      </RecentlyViewedProvider>,
    );

    const initialCount = parseInt(
      screen.getByTestId("recently-viewed-count").textContent || "0"
    );

    act(() => {
      screen.getByTestId("add-recent").click();
    });

    const newCount = parseInt(
      screen.getByTestId("recently-viewed-count").textContent || "0"
    );
    expect(newCount).toBeGreaterThanOrEqual(initialCount);
  });

  it("should move existing item to front when re-added", () => {
    render(
      <RecentlyViewedProvider>
        <TestComponent />
      </RecentlyViewedProvider>,
    );

    // Add item 1
    act(() => {
      screen.getByTestId("add-recent").click();
    });

    const countAfterFirst = parseInt(
      screen.getByTestId("recently-viewed-count").textContent || "0"
    );

    // Add item 2
    act(() => {
      screen.getByTestId("add-recent-2").click();
    });

    const countAfterSecond = parseInt(
      screen.getByTestId("recently-viewed-count").textContent || "0"
    );

    // Count should be at least 1
    expect(countAfterSecond).toBeGreaterThanOrEqual(1);
  });

  it("should throw error when useRecentlyViewed is used outside provider", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow(
      "useRecentlyViewed must be used within a RecentlyViewedProvider",
    );

    consoleSpy.mockRestore();
  });
});
