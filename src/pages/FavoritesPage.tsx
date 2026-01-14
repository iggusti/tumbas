import EmptyState from "@/components/EmptyState";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import NavLink from "@/components/NavLink";
import PageHeader from "@/components/PageHeader";
import { formatPrice } from "@/lib/formatters";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useFavorites } from "@/contexts/FavoritesContext";

const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PageHeader title="Favorites" />

      <main className="px-4 pb-24">
        {favoriteProducts.length === 0 ? (
          /* Empty State */
          <EmptyState
            icon={Heart}
            title="Belum ada produk favorit"
            description="Tambahkan produk ke favorit untuk melihatnya di sini"
          />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {favoriteProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-card rounded-xl overflow-hidden shadow-soft"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(product.id);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm"
                    >
                      <Heart
                        size={18}
                        className="fill-destructive text-destructive"
                      />
                    </button>
                  </div>
                </Link>
                <div className="p-3">
                  <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  <p className="font-display font-semibold text-primary">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <NavLink />
    </div>
  );
};

export default FavoritesPage;
