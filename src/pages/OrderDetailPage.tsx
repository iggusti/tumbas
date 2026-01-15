import { CheckCircle, Clock, Copy, MapPin, Package, Truck, XCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import NavLink from "@/components/NavLink";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import { useOrder } from "@/contexts/OrderContext";
import { useAddress } from "@/contexts/AddressContext";
import { formatPrice } from "@/lib/formatters";

const statusConfig = {
  pending: {
    label: "Menunggu Pembayaran",
    icon: Clock,
    color: "text-amber-600 bg-amber-100",
  },
  processing: {
    label: "Sedang Diproses",
    icon: Clock,
    color: "text-amber-600 bg-amber-100",
  },
  shipped: {
    label: "Dalam Pengiriman",
    icon: Truck,
    color: "text-blue-600 bg-blue-100",
  },
  delivered: {
    label: "Diterima",
    icon: CheckCircle,
    color: "text-green-600 bg-green-100",
  },
  cancelled: {
    label: "Dibatalkan",
    icon: XCircle,
    color: "text-red-600 bg-red-100",
  },
};

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const { toast } = useToast();
  const { getOrder } = useOrder();
  const { addresses } = useAddress();

  const order = getOrder(orderId || "");

  const getProduct = (productId: string) => {
    return products.find((p) => p.id === productId);
  };

  const getAddress = (addressId: string) => {
    return addresses.find((a) => a.id === addressId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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

  const status = statusConfig[order.status];
  const StatusIcon = status.icon;
  const shippingAddress = getAddress(order.addressId);

  const timeline = [
    { status: "Pesanan dibuat", date: formatDate(order.createdAt), completed: true },
    { status: "Pembayaran dikonfirmasi", date: order.status !== "pending" ? formatDate(order.createdAt) : "", completed: order.status !== "pending" },
    { status: "Pesanan diproses", date: order.status === "processing" || order.status === "shipped" || order.status === "delivered" ? formatDate(order.createdAt) : "", completed: order.status === "processing" || order.status === "shipped" || order.status === "delivered" },
    { status: "Pesanan dikirim", date: order.status === "shipped" || order.status === "delivered" ? formatDate(order.createdAt) : "", completed: order.status === "shipped" || order.status === "delivered" },
    { status: "Pesanan diterima", date: order.status === "delivered" ? formatDate(order.createdAt) : "", completed: order.status === "delivered" },
  ];

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    toast({
      title: "Berhasil disalin",
      description: "ID pesanan berhasil disalin ke clipboard",
    });
  };

  return (
    <div className="mobile-container">
      <div className="page-content pb-24">
        {/* Header */}
        <PageHeader title="Detail Pesanan" />

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
              <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
            </div>
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${status.color}`}
            >
              <StatusIcon size={14} />
              <span className="text-xs font-medium">{status.label}</span>
            </div>
          </div>

          {/* Copy Order ID */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="text-xs text-muted-foreground">ID Pesanan</p>
              <p className="text-sm font-semibold text-foreground">
                {order.id}
              </p>
            </div>
            <button
              onClick={copyOrderId}
              className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              <Copy size={18} />
            </button>
          </div>
        </motion.div>

        {/* Order Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-4 mt-4 p-4 bg-card rounded-xl border border-border/50"
        >
          <h2 className="text-sm font-semibold text-foreground mb-4">
            Status Pesanan
          </h2>
          <div className="space-y-4">
            {timeline.map((step, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      step.completed ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  />
                  {index < timeline.length - 1 && (
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
            {order.items.map((item, index) => {
              const product = getProduct(item.productId);
              if (!product) return null;
              return (
                <Link
                  key={index}
                  to={`/product/${product.id}`}
                  className="flex gap-3 p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.quantity}x @ {formatPrice(item.price)}
                    </p>
                    <p className="text-sm font-semibold text-primary mt-1">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Shipping Address */}
        {shippingAddress && (
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
                  {shippingAddress.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {shippingAddress.phone}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {shippingAddress.address}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Seller Message */}
        {order.sellerMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mx-4 mt-4 p-4 bg-card rounded-xl border border-border/50"
          >
            <h2 className="text-sm font-semibold text-foreground mb-3">
              Catatan untuk Penjual
            </h2>
            <p className="text-sm text-muted-foreground">{order.sellerMessage}</p>
          </motion.div>
        )}

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
              <span className="text-muted-foreground">Pengiriman</span>
              <span className="text-foreground">{order.shippingOption}</span>
            </div>
            {order.voucherCode && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Voucher</span>
                <span className="text-foreground">{order.voucherCode}</span>
              </div>
            )}
            <div className="border-t border-border/50 my-2 pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">
                  {formatPrice(order.subtotal)}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-muted-foreground">Diskon</span>
                  <span className="text-green-600">
                    -{formatPrice(order.discount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm mt-1">
                <span className="text-muted-foreground">Ongkos Kirim</span>
                <span className="text-foreground">
                  {formatPrice(order.shippingCost)}
                </span>
              </div>
            </div>
            <div className="flex justify-between text-sm font-semibold pt-2 border-t border-border/50">
              <span className="text-foreground">Total</span>
              <span className="text-primary">
                {formatPrice(order.total)}
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
