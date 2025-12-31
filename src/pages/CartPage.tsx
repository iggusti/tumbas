import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { products } from "@/data/products";

interface CartItem {
  productId: string;
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { productId: "1", quantity: 2 },
    { productId: "4", quantity: 1 },
  ]);

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

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((items) => items.filter((item) => item.productId !== productId));
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const shippingCost = 25000;
  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-background">
      <Header title="Cart" showBack />

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
                    className="bg-card rounded-2xl p-4 shadow-soft flex gap-4"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground line-clamp-2 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {product.category}
                      </p>
                      <p className="font-display font-semibold text-primary">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="p-2 rounded-full hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 size={16} className="text-destructive" />
                      </button>
                      <div className="flex items-center gap-2 bg-secondary rounded-full px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.productId, -1)}
                          className="p-1"
                        >
                          <Minus size={14} className="text-foreground" />
                        </button>
                        <span className="text-sm font-medium text-foreground w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, 1)}
                          className="p-1"
                        >
                          <Plus size={14} className="text-foreground" />
                        </button>
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
                  <span className="text-muted-foreground">Subtotal</span>
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
          className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-4 bg-background"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full btn-primary text-center"
          >
            Proceed to Checkout
          </motion.button>
        </motion.div>
      )}

      <BottomNavigation />
    </div>
  );
};

export default CartPage;
