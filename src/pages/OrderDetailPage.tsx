import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Copy,
  CreditCard,
  MessageSquare,
  MapPin,
  Package,
  Truck,
  XCircle,
  Zap,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link, useParams } from "react-router-dom";
import PaymentMethodSelector, {
  paymentMethods,
} from "@/components/PaymentMethodSelector";
import { getAddressIcon, useAddress } from "@/contexts/AddressContext";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import NavLink from "@/components/NavLink";
import PageHeader from "@/components/PageHeader";
import PaymentInstructions from "@/components/PaymentInstructions";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/formatters";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { sellerMessageSchema } from "@/lib/validations";
import { useNotification } from "@/contexts/NotificationContext";
import { useOrder } from "@/contexts/OrderContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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

const SHIPPING_OPTIONS = [
  {
    id: "regular",
    name: "Regular",
    price: 18000,
    eta: "3-5 hari",
    icon: Package,
  },
  {
    id: "express",
    name: "Express",
    price: 35000,
    eta: "1-2 hari",
    icon: Truck,
  },
  {
    id: "same-day",
    name: "Same Day",
    price: 50000,
    eta: "Hari ini",
    icon: Zap,
  },
];

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const { toast } = useToast();
  const { getOrder, updateOrder, cancelOrder } = useOrder();
  const { addresses } = useAddress();

  const order = getOrder(orderId || "");

  const { addNotification } = useNotification();
  const [isShippingDialogOpen, setIsShippingDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [sellerMessage, setSellerMessage] = useState(
    order?.sellerMessage || "",
  );
  const [messageError, setMessageError] = useState("");

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

  const handleSelectShipping = (option: (typeof SHIPPING_OPTIONS)[0]) => {
    if (order) {
      const newTotal = order.subtotal - order.discount + option.price;
      updateOrder(order.id, {
        shippingOption: option.name,
        shippingCost: option.price,
        total: newTotal,
      });
      toast({ title: "Opsi pengiriman diperbarui" });
    }
    setIsShippingDialogOpen(false);
  };

  const handleSelectPayment = (methodId: string) => {
    if (order) {
      updateOrder(order.id, { paymentMethod: methodId });
      toast({ title: "Metode pembayaran diperbarui" });
    }
    setIsPaymentDialogOpen(false);
  };

  const handleSaveMessage = () => {
    const result = sellerMessageSchema.safeParse({ message: sellerMessage });
    if (!result.success) {
      setMessageError(result.error.errors[0].message);
      return;
    }
    if (order) {
      updateOrder(order.id, { sellerMessage: sellerMessage || undefined });
      toast({ title: "Pesan untuk penjual diperbarui" });
    }
    setMessageError("");
    setIsMessageDialogOpen(false);
  };

  const handlePaymentExpired = () => {
    if (order && order.status === "pending") {
      cancelOrder(order.id, "Pembayaran tidak dilakukan dalam 1 jam");
    }
  };

  const handleManualCancel = () => {
    if (order && order.status === "pending") {
      cancelOrder(order.id, "Dibatalkan oleh pembeli", true);
      addNotification({
        type: "order",
        title: "Pesanan Dibatalkan",
        description: `Pesanan ${order.id} telah dibatalkan oleh Anda.`,
        link: `/order/${order.id}`,
      });
      setIsCancelDialogOpen(false);
    }
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
  const isPending = order.status === "pending";
  const selectedPaymentMethod = paymentMethods.find(
    (m) => m.id === order.paymentMethod,
  );
  const currentShipping =
    SHIPPING_OPTIONS.find((s) => s.name === order.shippingOption) ||
    SHIPPING_OPTIONS[0];

  const timeline = [
    {
      status: "Pesanan dibuat",
      date: formatDate(order.createdAt),
      completed: true,
    },
    {
      status: "Pembayaran dikonfirmasi",
      date:
        order.status !== "pending" && order.status !== "cancelled"
          ? formatDate(order.createdAt)
          : "",
      completed: order.status !== "pending" && order.status !== "cancelled",
    },
    {
      status: "Pesanan diproses",
      date:
        order.status === "processing" ||
        order.status === "shipped" ||
        order.status === "delivered"
          ? formatDate(order.createdAt)
          : "",
      completed:
        order.status === "processing" ||
        order.status === "shipped" ||
        order.status === "delivered",
    },
    {
      status: "Pesanan dikirim",
      date:
        order.status === "shipped" || order.status === "delivered"
          ? formatDate(order.createdAt)
          : "",
      completed: order.status === "shipped" || order.status === "delivered",
    },
    {
      status: "Pesanan diterima",
      date: order.status === "delivered" ? formatDate(order.createdAt) : "",
      completed: order.status === "delivered",
    },
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
              <p className="text-xs text-muted-foreground">
                {formatDate(order.createdAt)}
              </p>
            </div>
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${status.color}`}
            >
              <StatusIcon size={14} />
              <span className="text-xs font-medium">{status.label}</span>
            </div>
          </div>

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

        {/* Cancelled Reason */}
        {order.status === "cancelled" && order.cancelledReason && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mx-4 mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800"
          >
            <p className="text-sm font-medium text-red-800 dark:text-red-200">
              Alasan Pembatalan
            </p>
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              {order.cancelledReason}
            </p>
          </motion.div>
        )}

        {/* Payment Instructions for Pending Orders */}
        {isPending && order.paymentMethod && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-4 mt-4"
          >
            <PaymentInstructions
              paymentMethod={order.paymentMethod}
              total={order.total}
              createdAt={order.createdAt}
              orderId={order.id}
              onExpired={handlePaymentExpired}
            />
          </motion.div>
        )}

        {/* Edit Options for Pending Orders */}
        {isPending && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mx-4 mt-4 p-4 bg-card rounded-xl border border-border/50"
          >
            <h2 className="text-sm font-semibold text-foreground mb-3">
              Edit Pesanan
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setIsShippingDialogOpen(true)}
                className="flex flex-col items-center gap-2 p-3 bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck size={18} className="text-primary" />
                </div>
                <span className="text-xs font-medium text-foreground text-center">
                  Pengiriman
                </span>
              </button>
              <button
                onClick={() => setIsPaymentDialogOpen(true)}
                className="flex flex-col items-center gap-2 p-3 bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard size={18} className="text-primary" />
                </div>
                <span className="text-xs font-medium text-foreground text-center">
                  Pembayaran
                </span>
              </button>
              <button
                onClick={() => {
                  setSellerMessage(order.sellerMessage || "");
                  setIsMessageDialogOpen(true);
                }}
                className="flex flex-col items-center gap-2 p-3 bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare size={18} className="text-primary" />
                </div>
                <span className="text-xs font-medium text-foreground text-center">
                  Pesan
                </span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Order Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-4 mt-4 p-4 bg-card rounded-xl border border-border/50"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">
              Status Pesanan
            </h2>
            {(order.status === "shipped" || order.status === "processing" || order.status === "delivered") && (
              <Link
                to={`/tracking/${order.id}`}
                className="flex items-center gap-1 text-xs text-primary font-medium hover:underline"
              >
                <MapPin size={14} />
                Lacak Pengiriman
              </Link>
            )}
          </div>
          <div className="space-y-4">
            {timeline.map((step, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 rounded-full ${step.completed ? "bg-primary" : "bg-muted-foreground/30"}`}
                  />
                  {index < timeline.length - 1 && (
                    <div
                      className={`w-0.5 h-8 ${step.completed ? "bg-primary" : "bg-muted-foreground/30"}`}
                    />
                  )}
                </div>
                <div className="flex-1 -mt-0.5">
                  <p
                    className={`text-sm font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}
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
          transition={{ delay: 0.3 }}
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
            transition={{ delay: 0.4 }}
            className="mx-4 mt-4 p-4 bg-card rounded-xl border border-border/50"
          >
            <h2 className="text-sm font-semibold text-foreground mb-3">
              Alamat Pengiriman
            </h2>
            <div className="flex gap-3">
              {(() => {
                const AddressIcon = getAddressIcon(shippingAddress.icon);
                return (
                  <AddressIcon
                    size={18}
                    className="text-primary flex-shrink-0 mt-0.5"
                  />
                );
              })()}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                    {shippingAddress.label}
                  </span>
                </div>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mx-4 mt-4 p-4 bg-card rounded-xl border border-border/50"
        >
          <h2 className="text-sm font-semibold text-foreground mb-3">
            Catatan untuk Penjual
          </h2>
          <p className="text-sm text-muted-foreground">
            {order.sellerMessage || "-"}
          </p>
        </motion.div>

        {/* Payment Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
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
            {selectedPaymentMethod && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Metode Pembayaran</span>
                <span className="text-foreground">
                  {selectedPaymentMethod.name}
                </span>
              </div>
            )}
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
              <span className="text-primary">{formatPrice(order.total)}</span>
            </div>
          </div>
        </motion.div>

        {/* Cancel Order Button for Pending */}
        {isPending && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mx-4 mt-4"
          >
            <Button
              variant="outline"
              onClick={() => setIsCancelDialogOpen(true)}
              className="w-full border-destructive text-destructive hover:bg-destructive/10"
            >
              <XCircle size={16} className="mr-2" />
              Batalkan Pesanan
            </Button>
          </motion.div>
        )}

        {/* Help Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
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

      {/* Cancel Order Confirmation Dialog */}
      <AlertDialog
        open={isCancelDialogOpen}
        onOpenChange={setIsCancelDialogOpen}
      >
        <AlertDialogContent className="w-[calc(100%-2rem)] max-w-[400px] rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="text-destructive" size={20} />
              Batalkan Pesanan?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin membatalkan pesanan ini? Tindakan ini
              tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Tidak, Kembali</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleManualCancel}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Ya, Batalkan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Shipping Options Dialog */}
      <Dialog
        open={isShippingDialogOpen}
        onOpenChange={setIsShippingDialogOpen}
      >
        <DialogContent className="w-[calc(100%-2rem)] max-w-[400px] rounded-xl">
          <DialogHeader>
            <DialogTitle>Pilih Opsi Pengiriman</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            {SHIPPING_OPTIONS.map((option) => {
              const isSelected = currentShipping.id === option.id;
              const ShippingIcon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectShipping(option)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors ${isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${isSelected ? "bg-primary/10" : "bg-muted"}`}
                      >
                        <ShippingIcon
                          size={18}
                          className={
                            isSelected
                              ? "text-primary"
                              : "text-muted-foreground"
                          }
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm">
                          {option.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Estimasi: {option.eta}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      {formatPrice(option.price)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Method Selector */}
      <PaymentMethodSelector
        open={isPaymentDialogOpen}
        onOpenChange={setIsPaymentDialogOpen}
        selectedMethod={order.paymentMethod || null}
        onSelectMethod={handleSelectPayment}
      />

      {/* Seller Message Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-[400px] rounded-xl">
          <DialogHeader>
            <DialogTitle>Pesan untuk Penjual</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="sellerMessage">Pesan (opsional)</Label>
              <Textarea
                id="sellerMessage"
                placeholder="Tulis pesan untuk penjual"
                value={sellerMessage}
                onChange={(e) => {
                  setSellerMessage(e.target.value);
                  setMessageError("");
                }}
                className="min-h-[100px]"
                maxLength={500}
              />
              {messageError && (
                <p className="text-xs text-destructive">{messageError}</p>
              )}
              <p className="text-xs text-muted-foreground text-right">
                {sellerMessage.length}/500
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsMessageDialogOpen(false)}
                className="flex-1"
              >
                Batal
              </Button>
              <Button onClick={handleSaveMessage} className="flex-1">
                Simpan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <NavLink />
    </div>
  );
};

export default OrderDetailPage;
