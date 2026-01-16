import { ReactNode, createContext, useContext, useState } from "react";

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  addressId: string;
  shippingOption: string;
  shippingCost: number;
  subtotal: number;
  discount: number;
  total: number;
  sellerMessage?: string;
  voucherCode?: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "createdAt">) => string;
  getOrder: (id: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Default orders for demo purposes
const DEFAULT_ORDERS: Order[] = [
  {
    id: "ORD-1736847600000",
    items: [
      { productId: "1", quantity: 1, price: 450000 },
      { productId: "3", quantity: 2, price: 380000 },
    ],
    addressId: "1",
    shippingOption: "Express",
    shippingCost: 35000,
    subtotal: 1210000,
    discount: 0,
    total: 1245000,
    status: "delivered",
    createdAt: "2025-01-10T10:00:00.000Z",
  },
  {
    id: "ORD-1736934000000",
    items: [
      { productId: "2", quantity: 1, price: 520000 },
    ],
    addressId: "2",
    shippingOption: "Regular",
    shippingCost: 18000,
    subtotal: 520000,
    discount: 52000,
    total: 486000,
    voucherCode: "BATIK10",
    status: "processing",
    createdAt: "2025-01-14T14:00:00.000Z",
  },
];

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(DEFAULT_ORDERS);

  const addOrder = (orderData: Omit<Order, "id" | "createdAt">): string => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [...prev, newOrder]);
    return newOrder.id;
  };

  const getOrder = (id: string): Order | undefined => {
    return orders.find((order) => order.id === id);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        getOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
