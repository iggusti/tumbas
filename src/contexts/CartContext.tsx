import { ReactNode, createContext, useContext, useState } from "react";

export interface CartItem {
  productId: string;
  quantity: number;
  checked: boolean;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productId: string, quantity: number) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeItem: (productId: string) => void;
  toggleCheck: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const DEFAULT_CART_ITEMS: CartItem[] = [
  { productId: "1", quantity: 2, checked: true },
  { productId: "4", quantity: 1, checked: true },
  { productId: "2", quantity: 1, checked: true },
];

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(DEFAULT_CART_ITEMS);

  const addToCart = (productId: string, quantity: number) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.productId === productId);
      if (existingItem) {
        return items.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...items, { productId, quantity, checked: true }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((items) =>
      items.filter((item) => item.productId !== productId)
    );
  };

  const toggleCheck = (productId: string) => {
    setCartItems((items) =>
      items.map((item) =>
        item.productId === productId
          ? { ...item, checked: !item.checked }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        toggleCheck,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
