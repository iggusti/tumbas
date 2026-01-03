import { ArrowLeft, Heart, Plus, Share2, ShoppingCart } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import NavLink from "@/components/NavLink";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [showMoreDetail, setShowMoreDetail] = useState(false);

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
    addToCart(product.id, 1);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const shortDescription =
    product.description.length > 80
      ? product.description.slice(0, 80) + "..."
      : product.description;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Fixed Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-[480px]"
      >
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="p-1">
              <ArrowLeft size={20} className="text-primary-foreground" />
            </Link>
            <span className="text-primary-foreground/80 text-sm font-medium">
              tumbas.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/cart">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-card/30 backdrop-blur-sm"
              >
                <ShoppingCart
                  size={18}
                  className="text-primary-foreground transform scale-x-[-1]"
                />
              </motion.button>
            </Link>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 rounded-full bg-card/30 backdrop-blur-sm"
            >
              <Heart
                size={18}
                className={`transition-colors ${
                  isLiked
                    ? "fill-destructive text-destructive"
                    : "text-primary-foreground"
                }`}
              />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-card/30 backdrop-blur-sm"
            >
              <Share2 size={18} className="text-primary-foreground" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Product Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative aspect-square"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Add Button on Image */}
        <motion.button
          whileHover={{
            scale: 1.05,
            y: -1,
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          onClick={handleAddToCart}
          className="absolute bottom-10 right-4 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-sm"
        >
          <Plus size={16} />
          <span className="text-sm font-medium">Add</span>
        </motion.button>
      </motion.div>

      {/* Product Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-t-3xl -mt-6 relative z-10 px-5 pt-6 pb-4"
      >
        {/* Title and Price Row */}
        <div className="flex items-start justify-between mb-1">
          <div className="flex-1">
            <h1 className="font-display text-xl font-bold text-foreground leading-tight">
              {product.name.split(" ").slice(0, 2).join(" ")}
              <br />
              {product.name.split(" ").slice(2).join(" ")}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">limited offer</p>
          </div>
          <div className="text-right">
            {product.originalPrice && (
              <p className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
            <p className="text-lg font-display font-bold text-primary">
              {formatPrice(product.price)}
            </p>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
          {showMoreDetail ? product.description : shortDescription}
        </p>

        {/* More Detail Toggle */}
        {product.description.length > 80 && (
          <button
            onClick={() => setShowMoreDetail(!showMoreDetail)}
            className="text-sm text-primary font-medium mt-2 hover:underline"
          >
            {showMoreDetail ? "Show less" : "More detail"}
          </button>
        )}

        {/* Product Info Card */}
        <div className="bg-secondary/50 rounded-2xl p-4 mt-6 space-y-3">
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
        <section className="mt-8">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">
            You May Also Like
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-5 px-5">
            {products
              .filter(
                (p) => p.id !== product.id && p.category === product.category
              )
              .slice(0, 4)
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

      <NavLink />
    </div>
  );
};

export default ProductDetailPage;
