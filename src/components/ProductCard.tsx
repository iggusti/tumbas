import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
}

const ProductCard = ({ id, name, price, image, category }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="product-card group"
    >
      <Link to={`/product/${id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm transition-colors hover:bg-card"
          >
            <Heart
              size={18}
              className={`transition-colors ${
                isLiked ? "fill-destructive text-destructive" : "text-muted-foreground"
              }`}
            />
          </button>
          {category && (
            <span className="absolute bottom-3 left-3 px-3 py-1 text-xs font-medium bg-card/80 backdrop-blur-sm rounded-full text-foreground">
              {category}
            </span>
          )}
        </div>
      </Link>
      <div className="p-3">
        <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-1">
          {name}
        </h3>
        <p className="font-display font-semibold text-primary">
          {formatPrice(price)}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
