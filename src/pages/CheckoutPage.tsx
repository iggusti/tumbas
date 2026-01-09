import { useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  HandCoins,
  MapPin,
  Tag,
  Truck,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import NavLink from "@/components/NavLink";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import { useAddress, getAddressIcon } from "@/contexts/AddressContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CheckoutItem {
  productId: string;
  quantity: number;
}

const CheckoutPage = () => {
  const location = useLocation();
  const checkoutItems: CheckoutItem[] = location.state?.items || [];
  const { addresses, selectedAddressId, selectAddress, getSelectedAddress } =
    useAddress();
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);

  const selectedAddress = getSelectedAddress();

  const getProduct = (productId: string) => {
    return products.find((p) => p.id === productId);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = checkoutItems.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const shippingCost = 18000;
  const total = subtotal + shippingCost;

  const handleSelectAddress = (id: string) => {
    selectAddress(id);
    setIsAddressDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-background px-4 py-3 flex items-center gap-3"
      >
        <Link to="/cart" className="p-1">
          <ArrowLeft size={20} className="text-foreground" />
        </Link>
        <div>
          <span className="text-muted-foreground text-sm">tumbas.</span>
          <h1 className="font-display text-lg font-semibold text-foreground -mt-1">
            Checkout
          </h1>
        </div>
      </motion.header>

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
              <div className="flex gap-3">
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
              </div>
            </motion.div>
          );
        })}

        {/* Shipping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl p-4 mb-4 border border-border/50"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <Truck size={16} className="text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground text-sm">
                Promosi Pengiriman
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Nikmati promo gratis pengiriman hingga Rp10.000 untuk
                <br />
                pesanan Toko lain - Pelayan
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold text-foreground">
                {formatPrice(shippingCost)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Voucher & Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-xl p-4 mb-4 border border-border/50 space-y-3"
        >
          <button className="w-full flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Voucher Produk</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                Gunakan Voucher kode
              </span>
              <ChevronRight size={16} className="text-muted-foreground" />
            </div>
          </button>
          <div className="border-t border-border" />
          <button className="w-full flex items-center justify-between py-2">
            <span className="text-sm text-foreground">Pesan untuk Penjual</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">-</span>
              <ChevronRight size={16} className="text-muted-foreground" />
            </div>
          </button>
          <div className="border-t border-border" />
          <button className="w-full flex items-center justify-between py-2">
            <span className="text-sm text-foreground">Opsi Pengiriman</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Lihat semua</span>
              <ChevronRight size={16} className="text-muted-foreground" />
            </div>
          </button>
        </motion.div>
      </main>

      {/* Address Selection Dialog */}
      <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
        <DialogContent className="max-w-[90%] rounded-xl max-h-[80vh] overflow-y-auto">
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
