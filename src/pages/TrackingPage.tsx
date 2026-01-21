import {
  CheckCircle,
  Clock,
  MapPin,
  Package,
  Truck,
  XCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import NavLink from "@/components/NavLink";
import PageHeader from "@/components/PageHeader";
import { formatDate } from "@/lib/formatters";
import { motion } from "framer-motion";
import { useOrder } from "@/contexts/OrderContext";

const TrackingPage = () => {
  const { orderId } = useParams();
  const { getOrder } = useOrder();

  const order = getOrder(orderId || "");

  if (!order) {
    return (
      <div className="mobile-container">
        <div className="page-content pb-24 flex flex-col items-center justify-center min-h-screen">
          <Package size={64} className="text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">Pesanan tidak ditemukan</p>
          <Link to="/my-orders" className="text-primary mt-4">
            Kembali ke Pesanan Saya
          </Link>
        </div>
        <NavLink />
      </div>
    );
  }

  const getTrackingSteps = () => {
    const createdDate = new Date(order.createdAt);
    const steps = [];

    // Step 1: Order created
    steps.push({
      icon: Package,
      title: "Pesanan Dibuat",
      description: "Pesanan berhasil dibuat dan menunggu pembayaran",
      date: formatDate(order.createdAt),
      completed: true,
      active: order.status === "pending",
    });

    // Step 2: Payment confirmed
    if (order.status !== "pending" && order.status !== "cancelled") {
      const paymentDate = new Date(createdDate.getTime() + 30 * 60 * 1000);
      steps.push({
        icon: CheckCircle,
        title: "Pembayaran Dikonfirmasi",
        description: "Pembayaran berhasil diterima",
        date: formatDate(paymentDate.toISOString()),
        completed: true,
        active: order.status === "processing",
      });
    } else if (order.status === "cancelled") {
      steps.push({
        icon: XCircle,
        title: "Pesanan Dibatalkan",
        description: order.cancelledReason || "Pesanan telah dibatalkan",
        date: formatDate(createdDate.toISOString()),
        completed: true,
        active: true,
        cancelled: true,
      });
    } else {
      steps.push({
        icon: Clock,
        title: "Menunggu Pembayaran",
        description: "Silakan selesaikan pembayaran Anda",
        date: "",
        completed: false,
        active: true,
      });
    }

    // Step 3: Processing
    if (
      order.status === "processing" ||
      order.status === "shipped" ||
      order.status === "delivered"
    ) {
      const processDate = new Date(createdDate.getTime() + 2 * 60 * 60 * 1000);
      steps.push({
        icon: Package,
        title: "Pesanan Diproses",
        description: "Pesanan sedang disiapkan oleh penjual",
        date: formatDate(processDate.toISOString()),
        completed:
          order.status === "shipped" || order.status === "delivered",
        active: order.status === "processing",
      });
    } else if (order.status !== "cancelled") {
      steps.push({
        icon: Package,
        title: "Pesanan Diproses",
        description: "Pesanan akan diproses setelah pembayaran",
        date: "",
        completed: false,
        active: false,
      });
    }

    // Step 4: Shipped
    if (order.status === "shipped" || order.status === "delivered") {
      const shipDate = new Date(createdDate.getTime() + 24 * 60 * 60 * 1000);
      steps.push({
        icon: Truck,
        title: "Dalam Pengiriman",
        description: `Dikirim dengan ${order.shippingOption}`,
        date: formatDate(shipDate.toISOString()),
        completed: order.status === "delivered",
        active: order.status === "shipped",
        locations: [
          {
            time: formatDate(
              new Date(shipDate.getTime() + 1 * 60 * 60 * 1000).toISOString()
            ),
            location: "Gudang Indramayu",
            status: "Paket diambil kurir",
          },
          {
            time: formatDate(
              new Date(shipDate.getTime() + 4 * 60 * 60 * 1000).toISOString()
            ),
            location: "Sortir Center Cirebon",
            status: "Paket sedang disortir",
          },
          {
            time: formatDate(
              new Date(shipDate.getTime() + 12 * 60 * 60 * 1000).toISOString()
            ),
            location: "Hub Jakarta",
            status: "Paket tiba di hub tujuan",
          },
        ],
      });
    } else if (order.status !== "cancelled") {
      steps.push({
        icon: Truck,
        title: "Dalam Pengiriman",
        description: "Pesanan akan dikirim setelah diproses",
        date: "",
        completed: false,
        active: false,
      });
    }

    // Step 5: Delivered
    if (order.status === "delivered") {
      const deliverDate = new Date(createdDate.getTime() + 48 * 60 * 60 * 1000);
      steps.push({
        icon: CheckCircle,
        title: "Pesanan Diterima",
        description: "Pesanan telah sampai di tujuan",
        date: formatDate(deliverDate.toISOString()),
        completed: true,
        active: true,
      });
    } else if (order.status !== "cancelled") {
      steps.push({
        icon: MapPin,
        title: "Pesanan Diterima",
        description: "Pesanan akan diterima di alamat tujuan",
        date: "",
        completed: false,
        active: false,
      });
    }

    return steps;
  };

  const trackingSteps = getTrackingSteps();

  return (
    <div className="mobile-container">
      <div className="page-content pb-24">
        <PageHeader title="Lacak Pengiriman" />

        {/* Order Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4 p-4 bg-card rounded-xl border border-border/50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                {order.id}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDate(order.createdAt)}
              </p>
            </div>
            <Link
              to={`/order/${order.id}`}
              className="text-xs text-primary font-medium"
            >
              Lihat Detail
            </Link>
          </div>
        </motion.div>

        {/* Tracking Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-4 mt-4 p-4 bg-card rounded-xl border border-border/50"
        >
          <h2 className="text-sm font-semibold text-foreground mb-4">
            Status Pengiriman
          </h2>

          <div className="space-y-0">
            {trackingSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isLast = index === trackingSteps.length - 1;
              const isCancelled = "cancelled" in step && step.cancelled;

              return (
                <div key={index} className="relative">
                  <div className="flex gap-4">
                    {/* Timeline line and dot */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                          isCancelled
                            ? "bg-red-100 dark:bg-red-900/30"
                            : step.active
                              ? "bg-primary"
                              : step.completed
                                ? "bg-primary/80"
                                : "bg-muted"
                        }`}
                      >
                        <StepIcon
                          size={18}
                          className={
                            isCancelled
                              ? "text-red-600 dark:text-red-400"
                              : step.active || step.completed
                                ? "text-primary-foreground"
                                : "text-muted-foreground"
                          }
                        />
                      </div>
                      {!isLast && (
                        <div
                          className={`w-0.5 h-full min-h-[40px] ${
                            step.completed
                              ? "bg-primary/50"
                              : "bg-muted-foreground/20"
                          }`}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className={`flex-1 pb-6 ${isLast ? "pb-0" : ""}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <p
                            className={`text-sm font-medium ${
                              isCancelled
                                ? "text-red-600 dark:text-red-400"
                                : step.active || step.completed
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                            }`}
                          >
                            {step.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {step.description}
                          </p>
                        </div>
                        {step.date && (
                          <p className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                            {step.date}
                          </p>
                        )}
                      </div>

                      {/* Shipping locations */}
                      {"locations" in step && step.locations && (
                        <div className="mt-3 space-y-2 pl-3 border-l-2 border-primary/20">
                          {step.locations.map(
                            (
                              loc: {
                                time: string;
                                location: string;
                                status: string;
                              },
                              locIndex: number
                            ) => (
                              <div key={locIndex} className="relative">
                                <div className="absolute -left-[13px] w-2 h-2 rounded-full bg-primary/50" />
                                <p className="text-xs font-medium text-foreground">
                                  {loc.status}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {loc.location} • {loc.time}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Shipping Info */}
        {order.status !== "cancelled" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-4 mt-4 p-4 bg-card rounded-xl border border-border/50"
          >
            <h2 className="text-sm font-semibold text-foreground mb-3">
              Informasi Pengiriman
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Kurir</span>
                <span className="text-foreground font-medium">
                  {order.shippingOption}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimasi Tiba</span>
                <span className="text-foreground font-medium">
                  {order.shippingOption === "Same Day"
                    ? "Hari ini"
                    : order.shippingOption === "Express"
                      ? "1-2 hari"
                      : "3-5 hari"}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Back to Order Detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-4 mt-4"
        >
          <Link
            to={`/order/${order.id}`}
            className="block w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium text-center hover:bg-primary/90 transition-colors"
          >
            Kembali ke Detail Pesanan
          </Link>
        </motion.div>
      </div>

      <NavLink />
    </div>
  );
};

export default TrackingPage;
