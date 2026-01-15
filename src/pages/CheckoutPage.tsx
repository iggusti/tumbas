import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  HandCoins,
  MapPin,
  MessageSquare,
  Tag,
  Truck,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAddressIcon, useAddress } from "@/contexts/AddressContext";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import NavLink from "@/components/NavLink";
import PageHeader from "@/components/PageHeader";
import PaymentMethodSelector from "@/components/PaymentMethodSelector";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/formatters";
import { products } from "@/data/products";
import { sellerMessageSchema } from "@/lib/validations";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { useVoucher } from "@/contexts/VoucherContext";

interface CheckoutItem {
  productId: string;
  quantity: number;
}

const SHIPPING_OPTIONS = [
  { id: "regular", name: "Regular", price: 18000, eta: "3-5 hari" },
  { id: "express", name: "Express", price: 35000, eta: "1-2 hari" },
  { id: "same-day", name: "Same Day", price: 50000, eta: "Hari ini" },
];

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const checkoutItems: CheckoutItem[] = location.state?.items || [];
  const { addresses, selectedAddressId, selectAddress, getSelectedAddress } =
    useAddress();
  const { vouchers, selectedVoucher, selectVoucher, calculateDiscount } =
    useVoucher();
  const { clearCart } = useCart();

  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [isVoucherDialogOpen, setIsVoucherDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isShippingDialogOpen, setIsShippingDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [sellerMessage, setSellerMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [selectedShipping, setSelectedShipping] = useState(SHIPPING_OPTIONS[0]);

  const selectedAddress = getSelectedAddress();

  const getProduct = (productId: string) => {
    return products.find((p) => p.id === productId);
  };

  const subtotal = checkoutItems.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const discount = calculateDiscount(subtotal);
  const shippingCost = selectedShipping.price;
  const total = subtotal - discount + shippingCost;

  const handleSelectAddress = (id: string) => {
    selectAddress(id);
    setIsAddressDialogOpen(false);
  };

  const handleSelectVoucher = (voucher: typeof selectedVoucher) => {
    if (selectedVoucher?.id === voucher?.id) {
      selectVoucher(null);
    } else {
      selectVoucher(voucher);
    }
    setIsVoucherDialogOpen(false);
  };

  const handleSaveMessage = () => {
    const result = sellerMessageSchema.safeParse({ message: sellerMessage });
    if (!result.success) {
      setMessageError(result.error.errors[0].message);
      return;
    }
    setMessageError("");
    setIsMessageDialogOpen(false);
  };

  const handleSelectShipping = (option: typeof selectedShipping) => {
    setSelectedShipping(option);
    setIsShippingDialogOpen(false);
  };

  const handleBuyNow = () => {
    if (!selectedAddress) {
      toast.error("Pilih alamat pengiriman terlebih dahulu");
      return;
    }

    if (checkoutItems.length === 0) {
      toast.error("Tidak ada produk yang dibeli");
      return;
    }

    // Open payment method dialog
    setIsPaymentDialogOpen(true);
  };

  const handleConfirmPayment = () => {
    if (!selectedPaymentMethod) {
      toast.error("Pilih metode pembayaran terlebih dahulu");
      return;
    }

    // Close dialog and process order
    setIsPaymentDialogOpen(false);

    // Clear checked items from cart
    clearCart();

    // Navigate to success/orders page
    toast.success("Pesanan berhasil dibuat!");
    navigate("/my-orders");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PageHeader title="Checkout" />

      <main className="px-4 pb-[11rem]">
        {/* Delivery Address */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => setIsAddressDialogOpen(true)}
          className="w-full bg-card rounded-xl p-4 mb-4 border border-border/50 text-left"
        >
          <div className="flex items-start gap-3">
            {selectedAddress ? (
              <>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {(() => {
                    const Icon = getAddressIcon(selectedAddress.icon);
                    return <Icon size={16} className="text-primary" />;
                  })()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                      {selectedAddress.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground text-sm">
                      {selectedAddress.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {selectedAddress.phone}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                    {selectedAddress.address}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    Pilih alamat pengiriman
                  </p>
                </div>
              </>
            )}
            <ChevronRight size={18} className="text-muted-foreground" />
          </div>
        </motion.button>

        {/* Products */}
        {checkoutItems.map((item, index) => {
          const product = getProduct(item.productId);
          if (!product) return null;

          return (
            <motion.div
              key={item.productId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-card rounded-xl p-4 mb-4 border border-border/50"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground">
                    t.
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  tumbas.
                </span>
              </div>
              <Link to={`/product/${item.productId}`} className="flex gap-3">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground text-sm line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-through mt-1">
                    {formatPrice(product.price * 1.2)}
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    {formatPrice(product.price)}
                  </p>
                  {item.quantity > 1 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Qty: {item.quantity}
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}

        {/* Shipping */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => setIsShippingDialogOpen(true)}
          className="w-full bg-card rounded-xl p-4 mb-4 border border-border/50 text-left"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <Truck size={16} className="text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground text-sm">
                {selectedShipping.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Estimasi tiba: {selectedShipping.eta}
              </p>
            </div>
            <div className="text-right flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">
                {formatPrice(selectedShipping.price)}
              </span>
              <ChevronRight size={16} className="text-muted-foreground" />
            </div>
          </div>
        </motion.button>

        {/* Voucher & Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-xl p-4 mb-4 border border-border/50 space-y-3"
        >
          <button
            onClick={() => setIsVoucherDialogOpen(true)}
            className="w-full flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Voucher Produk</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {selectedVoucher ? (
                  <span className="text-primary font-medium">
                    {selectedVoucher.code}
                  </span>
                ) : (
                  "Gunakan Voucher kode"
                )}
              </span>
              <ChevronRight size={16} className="text-muted-foreground" />
            </div>
          </button>
          <div className="border-t border-border" />
          <button
            onClick={() => setIsMessageDialogOpen(true)}
            className="w-full flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">
                Pesan untuk Penjual
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground line-clamp-1 max-w-[120px]">
                {sellerMessage || "-"}
              </span>
              <ChevronRight size={16} className="text-muted-foreground" />
            </div>
          </button>
          <div className="border-t border-border" />
          <button
            onClick={() => setIsShippingDialogOpen(true)}
            className="w-full flex items-center justify-between py-2"
          >
            <span className="text-sm text-foreground">Opsi Pengiriman</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {selectedShipping.name}
              </span>
              <ChevronRight size={16} className="text-muted-foreground" />
            </div>
          </button>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-xl p-4 mb-4 border border-border/50"
        >
          <h3 className="font-medium text-foreground text-sm mb-3">
            Ringkasan Pesanan
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Subtotal ({checkoutItems.length} item)
              </span>
              <span className="text-foreground">{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Diskon ({selectedVoucher?.code})</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pengiriman</span>
              <span className="text-foreground">
                {formatPrice(shippingCost)}
              </span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Address Selection Dialog */}
      <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-[400px] rounded-xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Pilih Alamat Pengiriman</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            {addresses.map((address) => {
              const Icon = getAddressIcon(address.icon);
              const isSelected = address.id === selectedAddressId;

              return (
                <button
                  key={address.id}
                  onClick={() => handleSelectAddress(address.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isSelected ? "bg-primary/10" : "bg-muted"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={
                          isSelected ? "text-primary" : "text-muted-foreground"
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground text-sm">
                          {address.label}
                        </span>
                        {address.isDefault && (
                          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                            Default
                          </span>
                        )}
                      </div>
                      <h3 className="font-medium text-foreground text-sm">
                        {address.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {address.phone}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                        {address.address}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check size={14} className="text-primary-foreground" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}

            <Link
              to="/my-address"
              className="block w-full text-center py-3 text-primary text-sm font-medium hover:underline"
            >
              + Tambah Alamat Baru
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      {/* Voucher Selection Dialog */}
      <Dialog open={isVoucherDialogOpen} onOpenChange={setIsVoucherDialogOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-[400px] rounded-xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Pilih Voucher</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <AnimatePresence>
              {vouchers.map((voucher) => {
                const isSelected = selectedVoucher?.id === voucher.id;
                const isEligible = subtotal >= voucher.minPurchase;

                return (
                  <motion.button
                    key={voucher.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => isEligible && handleSelectVoucher(voucher)}
                    disabled={!isEligible}
                    className={`w-full text-left p-4 rounded-xl border transition-colors ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : isEligible
                        ? "border-border hover:border-primary/50"
                        : "border-border opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded font-mono font-medium">
                            {voucher.code}
                          </span>
                          {isSelected && (
                            <Check size={16} className="text-primary" />
                          )}
                        </div>
                        <h4 className="font-medium text-foreground text-sm mt-2">
                          {voucher.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {voucher.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Min. pembelian {formatPrice(voucher.minPurchase)}
                        </p>
                        {!isEligible && (
                          <p className="text-xs text-destructive mt-1">
                            Belanja lagi{" "}
                            {formatPrice(voucher.minPurchase - subtotal)} untuk
                            menggunakan voucher ini
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>

            {selectedVoucher && (
              <button
                onClick={() => handleSelectVoucher(null)}
                className="w-full py-3 text-center text-destructive text-sm font-medium hover:underline"
              >
                Hapus Voucher
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>

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
                placeholder="Tulis pesan untuk penjual, misal: 'Tolong packing dengan bubble wrap'"
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
                type="button"
                variant="outline"
                onClick={() => {
                  setIsMessageDialogOpen(false);
                  setMessageError("");
                }}
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
              const isSelected = selectedShipping.id === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectShipping(option)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isSelected ? "bg-primary/10" : "bg-muted"
                        }`}
                      >
                        <Truck
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
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {formatPrice(option.price)}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <Check
                            size={12}
                            className="text-primary-foreground"
                          />
                        </div>
                      )}
                    </div>
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
        selectedMethod={selectedPaymentMethod}
        onSelectMethod={setSelectedPaymentMethod}
        onConfirm={handleConfirmPayment}
      />

      {/* Bottom Total & Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-[5rem] left-0 right-0 max-w-[480px] mx-auto bg-card border-t border-border p-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground">Total</span>
            <p className="text-lg font-bold text-primary">
              {formatPrice(total)}
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleBuyNow}
            className="w-50 rounded-sm btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HandCoins
              size={22}
              className="transform scale-y-[-1] -rotate-[50deg]"
            />
            Beli Sekarang
          </motion.button>
        </div>
      </motion.div>

      <NavLink />
    </div>
  );
};

export default CheckoutPage;
