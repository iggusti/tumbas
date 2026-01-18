import { Bell, Package, Percent } from "lucide-react";

import { Link } from "react-router-dom";
import NavLink from "@/components/NavLink";
import { motion } from "framer-motion";
import { useNotification } from "@/contexts/NotificationContext";

const NotificationPage = () => {
  const { notifications, markAsRead } = useNotification();

  const getIcon = (type: string) => {
    switch (type) {
      case "promo":
        return Percent;
      case "order":
        return Package;
      case "update":
        return Bell;
      default:
        return Bell;
    }
  };

  const getIconStyle = (type: string) => {
    switch (type) {
      case "promo":
        return "bg-amber-100 text-amber-600";
      case "order":
        return "bg-orange-100 text-orange-600";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };

  return (
    <div className="mobile-container">
      <div className="page-content pb-24">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4"
        >
          <h1 className="font-display text-2xl font-bold text-foreground">
            Notifikasi
          </h1>
        </motion.header>

        {/* Status Section */}
        <div className="px-4">
          <h2 className="text-sm font-semibold text-foreground mb-3">Status</h2>
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell size={48} className="mx-auto mb-4 opacity-50" />
              <p>Belum ada notifikasi</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification, index) => {
                const Icon = getIcon(notification.type);
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={notification.link}
                      onClick={() => handleNotificationClick(notification.id)}
                      className={`p-4 rounded-xl flex gap-3 block border transition-colors ${
                        notification.isNew
                          ? "bg-primary/10 border-primary/30"
                          : "bg-card border-border/50"
                      } hover:border-primary/30`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getIconStyle(
                          notification.type,
                        )}`}
                      >
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-sm text-foreground">
                            {notification.title}
                          </h3>
                          {notification.isNew && (
                            <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5" />
                          )}
                        </div>
                        <p className="text-xs mt-0.5 line-clamp-2 text-muted-foreground">
                          {notification.description}
                        </p>
                        <p className="text-xs text-muted-foreground/70 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <NavLink />
    </div>
  );
};

export default NotificationPage;
