import {
  ArrowLeft,
  ChevronRight,
  Coins,
  Minus,
  Plus,
  Tag,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Checkbox } from "@/components/ui/checkbox";
import NavLink from "@/components/NavLink";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeItem, toggleCheck } = useCart();

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

  const checkedItems = cartItems.filter((item) => item.checked);

  const subtotal = checkedItems.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const shippingCost = checkedItems.length > 0 ? 25000 : 0;
  const total = subtotal + shippingCost;

  const handleCheckout = () => {
    const checkoutItems = checkedItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));
    navigate("/checkout", { state: { items: checkoutItems } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-background px-4 py-3 flex items-center gap-3"
      >
        <Link to="/" className="p-1">
          <ArrowLeft size={20} className="text-foreground" />
        </Link>
        <div>
          <span className="text-muted-foreground text-sm">tumbas.</span>
          <h1 className="font-display text-lg font-semibold text-foreground -mt-1">
            Keranjang Saya
          </h1>
        </div>
      </motion.header>

      <main className="page-container pb-64">
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-4">
              <span className="text-4xl">🛒</span>
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground text-center">
              Add some beautiful batik to your cart!
            </p>
          </motion.div>
        ) : (
          <>
            {/* Cart Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {cartItems.map((item, index) => {
                const product = getProduct(item.productId);
                if (!product) return null;

                return (
                  <motion.div
                    key={item.productId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className="bg-card rounded-2xl p-4 shadow-soft"
                  >
                    {/* Store Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={item.checked}
                          onCheckedChange={() => toggleCheck(item.productId)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-[10px] font-bold text-primary-foreground">
                              t.
                            </span>
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            tumbas.
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                      >
                        Ubah
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="flex gap-3 ml-7">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground text-sm line-clamp-2 mb-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-muted-foreground line-through">
                          {formatPrice(product.price * 1.2)}
                        </p>
                        <p className="font-display font-semibold text-primary text-sm">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-end">
                        <div className="flex items-center gap-2 bg-secondary rounded-full px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.productId, -1)}
                            className="p-1"
                          >
                            <Minus size={12} className="text-foreground" />
                          </button>
                          <span className="text-xs font-medium text-foreground w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, 1)}
                            className="p-1"
                          >
                            <Plus size={12} className="text-foreground" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Voucher Produk */}
                    <div className="flex items-center justify-between mt-3 ml-7 pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Tag size={14} className="text-muted-foreground" />
                        <span className="text-xs text-foreground">
                          Voucher Produk
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">
                          Gunakan Maksimal kode
                        </span>
                        <ChevronRight
                          size={14}
                          className="text-muted-foreground"
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 bg-card rounded-2xl p-6 shadow-soft"
            >
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Order Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({checkedItems.length} item)
                  </span>
                  <span className="text-foreground font-medium">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground font-medium">
                    {formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="h-px bg-border my-3" />
                <div className="flex justify-between text-base">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-display font-bold text-primary">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </main>

      {/* Checkout Button */}
      {cartItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-20 w-full max-w-[480px] p-4 bg-background"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCheckout}
            disabled={checkedItems.length === 0}
            className="w-full rounded-sm btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Coins size={22} />
            Proceed to Checkout
          </motion.button>
        </motion.div>
      )}

      <NavLink />
    </div>
  );
};

export default CartPage;
