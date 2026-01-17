import { Clock4 } from "lucide-react";
import EmptyState from "@/components/EmptyState";
import { Link } from "react-router-dom";
import NavLink from "@/components/NavLink";
import PageHeader from "@/components/PageHeader";
import { formatPrice } from "@/lib/formatters";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";

const RecentlyViewedPage = () => {
  const { recentlyViewed } = useRecentlyViewed();

  const recentProducts = recentlyViewed
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PageHeader title="Terakhir Dilihat" />

      <main className="px-4 pb-24">
        {recentProducts.length === 0 ? (
          /* Empty State */
          <EmptyState
            icon={Clock4}
            title="Belum ada produk yang dilihat"
            description="Produk yang Anda lihat akan muncul di sini"
          />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {recentProducts.map((product, index) => (
              <motion.div
                key={product!.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-card rounded-xl overflow-hidden shadow-soft"
              >
                <Link to={`/product/${product!.id}`}>
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product!.image}
                      alt={product!.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <div className="p-3">
                  <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-1">
                    {product!.name}
                  </h3>
                  {product!.originalPrice && (
                    <p className="text-[10px] text-muted-foreground line-through">
                      {formatPrice(product!.originalPrice)}
                    </p>
                  )}
                  <p className="font-display font-semibold text-primary">
                    {formatPrice(product!.price)}
                  </p>
                  {product!.originalPrice && (
                    <p className="text-[10px] text-muted-foreground -mt-[5px]">
                      limited offer
                    </p>
                  )}
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

export default RecentlyViewedPage;
