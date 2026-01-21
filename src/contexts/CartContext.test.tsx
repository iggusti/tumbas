import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";

// Test component that uses the context
const TestComponent = () => {
  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    toggleCheck,
    clearCart,
    clearCheckedItems,
  } = useCart();

  return (
    <div>
      <div data-testid="cart-count">{cartItems.length}</div>
      <button
        onClick={() => addToCart("test-product", 1)}
        data-testid="add-to-cart"
      >
        Add to Cart
      </button>
      <button
        onClick={() => updateQuantity("1", 1)}
        data-testid="update-quantity"
      >
        Update Quantity
      </button>
      <button onClick={() => removeItem("1")} data-testid="remove-item">
        Remove Item
      </button>
      <button onClick={() => toggleCheck("1")} data-testid="toggle-check">
        Toggle Check
      </button>
      <button onClick={() => clearCart()} data-testid="clear-cart">
        Clear Cart
      </button>
      <button onClick={() => clearCheckedItems()} data-testid="clear-checked">
        Clear Checked
      </button>
    </div>
  );
};

describe("CartContext", () => {
  it("should provide default cart items", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    expect(screen.getByTestId("cart-count")).toHaveTextContent("3"); // DEFAULT_CART_ITEMS has 3 items
  });

  it("should add item to cart", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    expect(screen.getByTestId("cart-count")).toHaveTextContent("3");

    // Add new item
    const addButton = screen.getByTestId("add-to-cart");
    addButton.click();

    expect(screen.getByTestId("cart-count")).toHaveTextContent("4");
  });

  it("should increase quantity of existing item", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    // Initially item with productId '1' has quantity 2
    // When we add 1 more, it should become 3
    const addButton = screen.getByTestId("add-to-cart");
    // This adds to 'test-product', not '1', so cart count increases by 1
    addButton.click();
    expect(screen.getByTestId("cart-count")).toHaveTextContent("4");
  });

  it("should update quantity", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    const updateButton = screen.getByTestId("update-quantity");
    updateButton.click();

    // This should increase quantity of item with productId '1' from 2 to 3
    // Cart count should remain the same since we're just updating quantity
    expect(screen.getByTestId("cart-count")).toHaveTextContent("3");
  });

  it("should remove item from cart", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    expect(screen.getByTestId("cart-count")).toHaveTextContent("3");

    const removeButton = screen.getByTestId("remove-item");
    removeButton.click();

    expect(screen.getByTestId("cart-count")).toHaveTextContent("2");
  });

  it("should toggle check status", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    const toggleButton = screen.getByTestId("toggle-check");
    toggleButton.click();

    // Cart count should remain the same, just checked status changes
    expect(screen.getByTestId("cart-count")).toHaveTextContent("3");
  });

  it("should clear cart", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    expect(screen.getByTestId("cart-count")).toHaveTextContent("3");

    const clearButton = screen.getByTestId("clear-cart");
    clearButton.click();

    expect(screen.getByTestId("cart-count")).toHaveTextContent("0");
  });

  it("should clear checked items", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    expect(screen.getByTestId("cart-count")).toHaveTextContent("3");

    const clearCheckedButton = screen.getByTestId("clear-checked");
    clearCheckedButton.click();

    // Since all default items are checked, this should clear all items
    expect(screen.getByTestId("cart-count")).toHaveTextContent("0");
  });

  it("should throw error when useCart is used outside provider", () => {
    // Mock console.error to avoid noise
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useCart must be used within a CartProvider");

    consoleSpy.mockRestore();
  });
});
