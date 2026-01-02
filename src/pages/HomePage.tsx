import { Grid2X2, List, Menu, ShoppingCart } from "lucide-react";

import { Link } from "react-router-dom";
import NavLink from "@/components/NavLink";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useState } from "react";

const HomePage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const sellingFast = products.slice(0, 3);
  const premiumProducts = products.filter((p) => p.isPremium);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-3"
      >
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold text-foreground">
            tumbas.
          </h1>
          <div className="flex items-center gap-0.25">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart size={22} className="text-foreground" />
            </Link>
            <button className="relative p-2">
              <Menu size={20} className="text-foreground" />
            </button>
          </div>
        </div>
      </motion.header>

      <main className="px-4 pb-24">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden mb-4"
        >
          <div className="aspect-[16/10] relative">
            <img
              src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
              alt="Batik Collection 2025"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <p className="text-white/80 text-center text-sm font-medium">
                new era 2025
              </p>
              <h2 className="font-display text-center text-2xl font-bold text-white mb-3">
                collection.
              </h2>
              <button className="self-center px-6 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-sm text-white text-sm font-medium hover:bg-white/30 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </motion.div>

        {/* Category Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3 mb-6"
        >
          <Link
            to="/about-shop"
            className="flex-1 py-3 px-4 bg-card border border-border rounded-sm text-sm font-medium text-foreground hover:bg-accent/10 transition-colors flex items-center justify-center text-center bg-primary text-primary-foreground"
          >
            About Shop
          </Link>
          <Link
            to="/about-batik-indramayu"
            className="flex-1 py-3 px-4 bg-card border border-border rounded-sm text-sm font-medium text-foreground hover:bg-accent/10 transition-colors flex items-center justify-center text-center bg-primary text-primary-foreground"
          >
            About Batik Indramayu
          </Link>
        </motion.div>

        {/* Selling Fast Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">
                Selling fast
              </h2>
              <div className="flex items-center gap-1">
                <button className="text-sm size-[28px] rounded bg-primary text-primary-foreground">
                  12
                </button>
                :
                <button className="text-sm size-[28px] rounded bg-primary text-primary-foreground">
                  12
                </button>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded ${
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <Grid2X2 size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded ${
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-3 gap-3" : "space-y-3"
            }
          >
            {sellingFast.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link to={`/product/${product.id}`}>
                  <div className="bg-card rounded-xl overflow-hidden shadow-soft">
                    <div className="aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <h3 className="text-xs font-medium text-foreground line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="mt-1">
                        <span className="text-[10px] text-muted-foreground line-through">
                          Rp {(product.price * 1.2).toLocaleString("id-ID")}
                        </span>
                        <span className="text-xs font-semibold text-primary ml-1">
                          Rp {product.price.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Premium Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Premium</h2>
            <button className="text-sm text-primary font-medium">
              See all
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
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
      </main>

      <NavLink />
    </div>
  );
};

export default HomePage;
