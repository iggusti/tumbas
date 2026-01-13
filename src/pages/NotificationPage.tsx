import { Bell, CheckCircle, Clock, Percent, Truck } from "lucide-react";

import { Link } from "react-router-dom";
import NavLink from "@/components/NavLink";
import { motion } from "framer-motion";

const notifications = [
  {
    id: 1,
    type: "promo",
    icon: Percent,
    title: "Promo Tahun Baru 2024!",
    description:
      "Diskon hingga 20% untuk semua produk Batik Tulis. Gunakan kode TAHUNBARU2024.",
    time: "2 jam lalu",
    isNew: true,
    link: "/promo-code",
  },
  {
    id: 2,
    type: "promo",
    icon: Percent,
    title: "Flash Sale Batik Premium",
    description:
      "Hemat hingga 15% untuk koleksi batik premium pilihan. Berlaku hingga akhir bulan!",
    time: "5 jam lalu",
    isNew: true,
    link: "/search",
  },
  {
    id: 3,
    type: "order",
    icon: Truck,
    title: "Pesanan Sedang Dikirim",
    description:
      "Pesanan ORD-2024-002 sedang dalam perjalanan menuju alamatmu. Estimasi tiba 1-2 hari.",
    time: "1 hari lalu",
    isNew: false,
    link: "/order/ORD-2024-002",
  },
  {
    id: 4,
    type: "order",
    icon: CheckCircle,
    title: "Pesanan Diterima",
    description:
      "Pesanan ORD-2024-001 telah sampai di tujuan. Terima kasih telah berbelanja di tumbas.!",
    time: "2 hari lalu",
    isNew: false,
    link: "/order/ORD-2024-001",
  },
  {
    id: 5,
    type: "update",
    icon: Bell,
    title: "Koleksi Baru Tersedia!",
    description:
      "Jelajahi koleksi batik terbaru dari pengrajin Indramayu. Motif eksklusif menanti!",
    time: "3 hari lalu",
    isNew: false,
    link: "/search",
  },
  {
    id: 6,
    type: "order",
    icon: Clock,
    title: "Pesanan Sedang Diproses",
    description:
      "Pesanan ORD-2024-003 sedang diproses oleh tim kami. Mohon tunggu update selanjutnya.",
    time: "4 hari lalu",
    isNew: false,
    link: "/order/ORD-2024-003",
  },
];

const NotificationPage = () => {
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
                >
                  <Link
                    to={notification.link}
                    className={`p-4 rounded-xl flex gap-3 block ${
                      notification.isNew ? "bg-primary/10" : "bg-card"
                    } border border-border/50 hover:border-primary/30 transition-colors`}
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
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-foreground text-sm">
                          {notification.title}
                        </h3>
                        {notification.isNew && (
                          <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
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
        </div>
      </div>
      <NavLink />
    </div>
  );
};

export default NotificationPage;
