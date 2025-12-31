import { Heart, MapPin, Minus, Plus, Share2, ShoppingCart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "@/components/Header";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${quantity}x ${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header showBack transparent />

      {/* Product Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative aspect-[4/5] -mt-14"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Action Buttons */}
        <div className="absolute top-20 right-4 flex flex-col gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className="p-3 rounded-full bg-card/80 backdrop-blur-sm shadow-soft"
          >
            <Heart
              size={20}
              className={`transition-colors ${
                isLiked
                  ? "fill-destructive text-destructive"
                  : "text-foreground"
              }`}
            />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full bg-card/80 backdrop-blur-sm shadow-soft"
          >
            <Share2 size={20} className="text-foreground" />
          </motion.button>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-6 left-4">
          <span className="px-4 py-1.5 text-sm font-medium bg-card/90 backdrop-blur-sm rounded-full text-foreground">
            {product.category}
          </span>
        </div>
      </motion.div>

      {/* Product Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-4 -mt-2"
      >
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">
          {product.name}
        </h1>

        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <MapPin size={14} />
          <span className="text-sm">{product.origin}</span>
        </div>

        <p className="text-2xl font-display font-bold text-primary mb-6">
          {formatPrice(product.price)}
        </p>

        <p className="text-muted-foreground leading-relaxed mb-6">
          {product.description}
        </p>

        {/* Product Info */}
        <div className="bg-card rounded-2xl p-4 shadow-soft space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-muted-foreground text-sm">Material</span>
            <span className="text-foreground text-sm font-medium">
              {product.material}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground text-sm">Origin</span>
            <span className="text-foreground text-sm font-medium">
              {product.origin}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground text-sm">Type</span>
            <span className="text-foreground text-sm font-medium">
              {product.category}
            </span>
          </div>
        </div>

        {/* Related Products */}
        <section>
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">
            You May Also Like
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4">
            {products
              .filter(
                (p) => p.id !== product.id && p.category === product.category
              )
              .slice(0, 3)
              .map((relatedProduct) => (
                <motion.button
                  key={relatedProduct.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  className="min-w-[120px] max-w-[120px]"
                >
                  <div className="aspect-square rounded-xl overflow-hidden mb-2">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-foreground line-clamp-2">
                    {relatedProduct.name}
                  </p>
                </motion.button>
              ))}
          </div>
        </section>
      </motion.div>

      {/* Bottom Action Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-card border-t border-border p-4"
      >
        <div className="flex items-center gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center gap-3 bg-secondary rounded-full px-4 py-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 hover:bg-muted rounded-full transition-colors"
            >
              <Minus size={16} className="text-foreground" />
            </button>
            <span className="font-medium text-foreground w-6 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 hover:bg-muted rounded-full transition-colors"
            >
              <Plus size={16} className="text-foreground" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetailPage;
