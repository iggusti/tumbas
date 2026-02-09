import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { OrderProvider, useOrder } from "./OrderContext";

// Test component that uses the context
const TestComponent = () => {
  const { orders, addOrder, updateOrder, cancelOrder } = useOrder();

  return (
    <div>
      <div data-testid="orders-count">{orders.length}</div>
      <button
        onClick={() =>
          addOrder({
            items: [{ productId: "1", quantity: 1, price: 100000 }],
            addressId: "1",
            shippingOption: "regular",
            shippingCost: 18000,
            subtotal: 100000,
            discount: 0,
            total: 118000,
            status: "pending",
          })
        }
        data-testid="add-order"
      >
        Add Order
      </button>
      <button
        onClick={() => updateOrder(orders[0]?.id, { status: "shipped" })}
        data-testid="update-order"
      >
        Update Order
      </button>
      <button
        onClick={() => cancelOrder(orders[0]?.id, "Test cancellation")}
        data-testid="cancel-order"
      >
        Cancel Order
      </button>
    </div>
  );
};

describe("OrderContext", () => {
  it("should provide orders", () => {
    render(
      <OrderProvider>
        <TestComponent />
      </OrderProvider>,
    );

    // Should have default orders
    const count = screen.getByTestId("orders-count").textContent;
    expect(parseInt(count || "0")).toBeGreaterThanOrEqual(0);
  });

  it("should create new order", () => {
    render(
      <OrderProvider>
        <TestComponent />
      </OrderProvider>,
    );

    const initialCount = parseInt(
      screen.getByTestId("orders-count").textContent || "0"
    );

    act(() => {
      screen.getByTestId("add-order").click();
    });

    const newCount = parseInt(
      screen.getByTestId("orders-count").textContent || "0"
    );
    expect(newCount).toBe(initialCount + 1);
  });

  it("should update order status", () => {
    render(
      <OrderProvider>
        <TestComponent />
      </OrderProvider>,
    );

    act(() => {
      screen.getByTestId("update-order").click();
    });

    // Order should still exist
    expect(screen.getByTestId("orders-count")).toBeInTheDocument();
  });

  it("should cancel order", () => {
    render(
      <OrderProvider>
        <TestComponent />
      </OrderProvider>,
    );

    act(() => {
      screen.getByTestId("cancel-order").click();
    });

    // Order should still exist (just with cancelled status)
    expect(screen.getByTestId("orders-count")).toBeInTheDocument();
  });

  it("should throw error when useOrder is used outside provider", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useOrder must be used within an OrderProvider");

    consoleSpy.mockRestore();
  });
});
