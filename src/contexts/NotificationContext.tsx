import { ReactNode, createContext, useContext, useState } from "react";

export interface Notification {
  id: string;
  type: "promo" | "order" | "update";
  title: string;
  description: string;
  time: string;
  isNew: boolean;
  link: string;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (
    notification: Omit<Notification, "id" | "time" | "isNew">
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  hasUnreadNotifications: () => boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

const DEFAULT_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-order-1",
    type: "order",
    title: "Pesanan Diterima",
    description:
      "Pesanan ORD-1736847600000 telah berhasil diterima. Total: Rp1.245.000",
    time: "6 hari lalu",
    isNew: false,
    link: "/order/ORD-1736847600000",
  },
  {
    id: "notif-order-2",
    type: "order",
    title: "Pesanan Sedang Diproses",
    description: "Pesanan ORD-1736934000000 sedang diproses. Total: Rp486.000",
    time: "2 hari lalu",
    isNew: false,
    link: "/order/ORD-1736934000000",
  },
  {
    id: "notif-1",
    type: "promo",
    title: "Promo Tahun Baru 2024!",
    description:
      "Diskon hingga 20% untuk semua produk Batik Tulis. Gunakan kode TAHUNBARU2024.",
    time: "2 jam lalu",
    isNew: true,
    link: "/promo-code",
  },
  {
    id: "notif-2",
    type: "promo",
    title: "Flash Sale Batik Premium",
    description:
      "Hemat hingga 15% untuk koleksi batik premium pilihan. Berlaku hingga akhir bulan!",
    time: "5 jam lalu",
    isNew: true,
    link: "/search",
  },
  {
    id: "notif-3",
    type: "update",
    title: "Koleksi Baru Tersedia!",
    description:
      "Jelajahi koleksi batik terbaru dari pengrajin Indramayu. Motif eksklusif menanti!",
    time: "3 hari lalu",
    isNew: false,
    link: "/",
  },
];

interface NotificationProviderProps {
  children: ReactNode | ((context: { addNotification: NotificationContextType["addNotification"] }) => ReactNode);
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>(
    DEFAULT_NOTIFICATIONS
  );

  const addNotification = (
    notification: Omit<Notification, "id" | "time" | "isNew">
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      time: "Baru saja",
      isNew: true,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isNew: false } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isNew: false }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const hasUnreadNotifications = () => {
    return notifications.some((notif) => notif.isNew);
  };

  const contextValue = {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    hasUnreadNotifications,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {typeof children === "function"
        ? children({ addNotification })
        : children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
