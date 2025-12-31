import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Bell } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import CategoryChip from "@/components/CategoryChip";
import SearchBar from "@/components/SearchBar";
import BottomNavigation from "@/components/BottomNavigation";
import { products, categories } from "@/data/products";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" ||
      product.category === activeCategory ||
      (activeCategory === "Premium" && product.isPremium);
    return matchesSearch && matchesCategory;
  });

  const premiumProducts = products.filter((p) => p.isPremium);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-md px-4 py-3"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              tumbas.
            </h1>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MapPin size={14} />
              <span>Jakarta, Indonesia</span>
            </div>
          </div>
          <button className="relative p-2 rounded-full bg-secondary">
            <Bell size={20} className="text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </button>
        </div>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </motion.header>

      <main className="page-container pt-4">
        {/* Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
        >
          {categories.map((category) => (
            <CategoryChip
              key={category}
              label={category}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </motion.div>

        {/* Selling Fast Section */}
        {activeCategory === "All" && !searchQuery && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title mb-0">Selling Fast 🔥</h2>
              <button className="text-sm text-primary font-medium">
                See all
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4">
              {products.slice(0, 3).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="min-w-[200px] max-w-[200px]"
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Premium Section */}
        {activeCategory === "All" && !searchQuery && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title mb-0">Premium ✨</h2>
              <button className="text-sm text-primary font-medium">
                See all
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {premiumProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* All Products / Filtered */}
        {(activeCategory !== "All" || searchQuery) && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="section-title">
              {searchQuery
                ? `Results for "${searchQuery}"`
                : activeCategory}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found</p>
              </div>
            )}
          </motion.section>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default HomePage;
