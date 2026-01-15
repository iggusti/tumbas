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
  addNotification: (notification: Omit<Notification, "id" | "time" | "isNew">) => void;
  markAsRead: (id: string) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const DEFAULT_NOTIFICATIONS: Notification[] = [
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
    link: "/search",
  },
];

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>(DEFAULT_NOTIFICATIONS);

  const addNotification = (notification: Omit<Notification, "id" | "time" | "isNew">) => {
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

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
