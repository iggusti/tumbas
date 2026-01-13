import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Copy,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import NavLink from "@/components/NavLink";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

const orders = [
  {
    id: "ORD-2024-001",
    date: "5 Jan 2024",
    status: "delivered",
    items: [
      { product: products[0], quantity: 1 },
      { product: products[1], quantity: 1 },
    ],
    shippingAddress: {
      name: "Sarah Wijaya",
      phone: "081234567890",
      address: "Jl. Sudirman No. 123, Indramayu, Jawa Barat, 45212",
    },
    paymentMethod: "Bank Transfer - BCA",
    shippingMethod: "JNE Regular",
    trackingNumber: "JNE123456789",
    timeline: [
      { status: "Pesanan dibuat", date: "5 Jan 2024, 10:00", completed: true },
      {
        status: "Pembayaran dikonfirmasi",
        date: "5 Jan 2024, 10:30",
        completed: true,
      },
      {
        status: "Pesanan diproses",
        date: "5 Jan 2024, 14:00",
        completed: true,
      },
      { status: "Pesanan dikirim", date: "6 Jan 2024, 09:00", completed: true },
      {
        status: "Pesanan diterima",
        date: "8 Jan 2024, 15:00",
        completed: true,
      },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "3 Jan 2024",
    status: "shipping",
    items: [{ product: products[2], quantity: 2 }],
    shippingAddress: {
      name: "Sarah Wijaya",
      phone: "081234567890",
      address: "Jl. Gatot Subroto No. 456, Jakarta Selatan, DKI Jakarta, 12190",
    },
    paymentMethod: "Bank Transfer - Mandiri",
    shippingMethod: "SiCepat Express",
    trackingNumber: "SCP987654321",
    timeline: [
      { status: "Pesanan dibuat", date: "3 Jan 2024, 08:00", completed: true },
      {
        status: "Pembayaran dikonfirmasi",
        date: "3 Jan 2024, 08:45",
        completed: true,
      },
      {
        status: "Pesanan diproses",
        date: "3 Jan 2024, 11:00",
        completed: true,
      },
      { status: "Pesanan dikirim", date: "4 Jan 2024, 10:00", completed: true },
      { status: "Pesanan diterima", date: "", completed: false },
    ],
  },
  {
    id: "ORD-2024-003",
    date: "1 Jan 2024",
    status: "processing",
    items: [
      { product: products[3], quantity: 1 },
      { product: products[4], quantity: 1 },
    ],
    shippingAddress: {
      name: "Sarah Wijaya",
      phone: "081234567890",
      address: "Jl. Sudirman No. 123, Indramayu, Jawa Barat, 45212",
    },
    paymentMethod: "COD",
    shippingMethod: "J&T Express",
    trackingNumber: "-",
    timeline: [
      { status: "Pesanan dibuat", date: "1 Jan 2024, 12:00", completed: true },
      {
        status: "Pembayaran dikonfirmasi",
        date: "1 Jan 2024, 12:00",
        completed: true,
      },
      { status: "Pesanan diproses", date: "", completed: false },
      { status: "Pesanan dikirim", date: "", completed: false },
      { status: "Pesanan diterima", date: "", completed: false },
    ],
  },
];

const statusConfig = {
  processing: {
    label: "Sedang Diproses",
    icon: Clock,
    color: "text-amber-600 bg-amber-100",
  },
  shipping: {
    label: "Dalam Pengiriman",
    icon: Truck,
    color: "text-blue-600 bg-blue-100",
  },
  delivered: {
    label: "Diterima",
    icon: CheckCircle,
    color: "text-green-600 bg-green-100",
  },
};

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const order = orders.find((o) => o.id === orderId);

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

  const status = statusConfig[order.status as keyof typeof statusConfig];
  const StatusIcon = status.icon;

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingCost = 25000;
  const total = subtotal + shippingCost;

  const copyTrackingNumber = () => {
    if (order.trackingNumber !== "-") {
      navigator.clipboard.writeText(order.trackingNumber);
      toast({
        title: "Berhasil disalin",
        description: "Nomor resi berhasil disalin ke clipboard",
      });
    }
  };

  return (
    <div className="mobile-container">
      <div className="page-content pb-24">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-50 bg-background px-4 py-3 flex items-center gap-3"
        >
          <Link
            to=""
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="p-1"
          >
            <ArrowLeft size={20} className="text-foreground" />
          </Link>
          <div>
            <span className="text-muted-foreground text-sm">tumbas.</span>
            <h1 className="font-display text-lg font-semibold text-foreground -mt-1">
              Detail Pesanan
            </h1>
          </div>
        </motion.header>

        {/* Order Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4 p-4 bg-card rounded-xl border border-border/50"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-foreground">
                {order.id}
              </p>
              <p className="text-xs text-muted-foreground">{order.date}</p>
            </div>
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${status.color}`}
            >
              <StatusIcon size={14} />
              <span className="text-xs font-medium">{status.label}</span>
            </div>
          </div>

          {/* Tracking Number */}
          {order.trackingNumber !== "-" && (
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">No. Resi</p>
                <p className="text-sm font-semibold text-foreground">
                  {order.trackingNumber}
                </p>
              </div>
              <button
                onClick={copyTrackingNumber}
                className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
              >
                <Copy size={18} />
              </button>
            </div>
          )}
        </motion.div>

        {/* Order Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-4 mt-4 p-4 bg-card rounded-xl border border-border/50"
        >
          <h2 className="text-sm font-semibold text-foreground mb-4">
            Status Pengiriman
          </h2>
          <div className="space-y-4">
            {order.timeline.map((step, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      step.completed ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  />
                  {index < order.timeline.length - 1 && (
                    <div
                      className={`w-0.5 h-8 ${
                        step.completed ? "bg-primary" : "bg-muted-foreground/30"
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1 -mt-0.5">
                  <p
                    className={`text-sm font-medium ${
                      step.completed
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.status}
                  </p>
                  {step.date && (
                    <p className="text-xs text-muted-foreground">{step.date}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-4 mt-4 p-4 bg-card rounded-xl border border-border/50"
        >
          <h2 className="text-sm font-semibold text-foreground mb-4">
            Produk yang Dipesan
          </h2>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <Link
                key={index}
                to={`/product/${item.product.id}`}
                className="flex gap-3 p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground line-clamp-1">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.quantity}x @ Rp{" "}
                    {item.product.price.toLocaleString("id-ID")}
                  </p>
                  <p className="text-sm font-semibold text-primary mt-1">
                    Rp{" "}
                    {(item.product.price * item.quantity).toLocaleString(
                      "id-ID"
                    )}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Shipping Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-4 mt-4 p-4 bg-card rounded-xl border border-border/50"
        >
          <h2 className="text-sm font-semibold text-foreground mb-3">
            Alamat Pengiriman
          </h2>
          <div className="flex gap-3">
            <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">
                {order.shippingAddress.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {order.shippingAddress.phone}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {order.shippingAddress.address}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Payment Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mx-4 mt-4 p-4 bg-card rounded-xl border border-border/50"
        >
          <h2 className="text-sm font-semibold text-foreground mb-3">
            Ringkasan Pembayaran
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Metode Pembayaran</span>
              <span className="text-foreground">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Pengiriman</span>
              <span className="text-foreground">{order.shippingMethod}</span>
            </div>
            <div className="border-t border-border/50 my-2 pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">
                  Rp {subtotal.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-muted-foreground">Ongkos Kirim</span>
                <span className="text-foreground">
                  Rp {shippingCost.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
            <div className="flex justify-between text-sm font-semibold pt-2 border-t border-border/50">
              <span className="text-foreground">Total</span>
              <span className="text-primary">
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Help Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mx-4 mt-4"
        >
          <Link
            to="/customer-service"
            className="block w-full py-3 bg-primary/10 text-primary rounded-xl text-sm font-medium text-center hover:bg-primary/20 transition-colors"
          >
            Butuh Bantuan?
          </Link>
        </motion.div>
      </div>

      <NavLink />
    </div>
  );
};

export default OrderDetailPage;
