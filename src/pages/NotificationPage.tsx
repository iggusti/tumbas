import { motion } from "framer-motion";
import { Percent, Package, Bell } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

const notifications = [
  {
    id: 1,
    type: "promo",
    icon: Percent,
    title: "Special 2025!",
    description: "Promo Pembelian 2729 khusus ber @, DISKON rd 20%. Year ya",
    time: "2h ago",
    isNew: true,
  },
  {
    id: 2,
    type: "promo",
    icon: Percent,
    title: "Special Natural",
    description: "Promo khusus khusus beli di 0 EKON 15%",
    time: "5h ago",
    isNew: true,
  },
  {
    id: 3,
    type: "order",
    icon: Package,
    title: "Pesananmu dalam perjalanan!",
    description: "Tunggu sebentar ya, Pengiriman sedang menuju Alamatmu",
    time: "1d ago",
    isNew: false,
  },
  {
    id: 4,
    type: "order",
    icon: Package,
    title: "Pesanan Tiba",
    description: "Pesanan #00011106047 dengan nomor #0000010 akan tiba 0-1 hari.",
    time: "2d ago",
    isNew: false,
  },
  {
    id: 5,
    type: "update",
    icon: Bell,
    title: "Update Latar",
    description: "Tunggu sebentar ya, itu ada/log update!",
    time: "3d ago",
    isNew: false,
  },
  {
    id: 6,
    type: "order",
    icon: Package,
    title: "Pesananmu dalam perjalanan!",
    description: "Tunggu sebentar ya Pengiriman sedang menuju Alamatmu",
    time: "4d ago",
    isNew: false,
  },
];

const NotificationPage = () => {
  return (
    <div className="mobile-container">
      <div className="page-content pb-24">
        {/* Header */}
        <div className="px-4 pt-4 pb-2">
          <h1 className="text-2xl font-display font-bold text-foreground">Notification</h1>
        </div>

        {/* Status Section */}
        <div className="px-4 mt-4">
          <h2 className="text-sm font-semibold text-foreground mb-3">Status</h2>
          <div className="space-y-3">
            {notifications.map((notification, index) => {
              const Icon = notification.icon;
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl flex gap-3 ${
                    notification.isNew ? "bg-primary/10" : "bg-card"
                  } border border-border/50`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      notification.type === "promo"
                        ? "bg-amber-100 text-amber-600"
                        : notification.type === "order"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm">
                      {notification.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {notification.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default NotificationPage;
