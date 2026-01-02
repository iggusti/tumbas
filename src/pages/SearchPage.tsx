import { Search, ShoppingCart } from "lucide-react";

import { Link } from "react-router-dom";
import NavLink from "@/components/NavLink";
import { motion } from "framer-motion";
import { products } from "@/data/products";

const categories = [
  { id: 1, name: "Man" },
  { id: 2, name: "Woman" },
  { id: 3, name: "Batik Fabric" },
  { id: 4, name: "Accessories" },
];

const SearchPage = () => {
  const popularProducts = products.slice(0, 4);

  return (
    <div className="mobile-container">
      <div className="page-content pb-24">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <h1 className="text-2xl font-display font-bold text-foreground">
            Search
          </h1>
          <button className="p-2 text-muted-foreground">
            <Search size={20} />
          </button>
        </div>

        {/* Categories */}
        <div className="px-4 mt-4">
          <h2 className="text-sm font-semibold text-foreground mb-3">
            Categories
          </h2>
          <div className="space-y-2">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full p-4 bg-card rounded-xl text-left text-foreground font-medium hover:bg-accent/10 transition-colors border border-border/50"
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Popular Products */}
        <div className="px-4 mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Popular Product
            </h2>
            <Link to="/cart" className="p-2 text-muted-foreground">
              <ShoppingCart
                size={22}
                className="text-foreground transform scale-x-[-1]"
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {popularProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <NavLink />
    </div>
  );
};

export default SearchPage;
