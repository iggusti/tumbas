import { ChevronLeft, ChevronRight, Menu, ShoppingCart } from "lucide-react";

import { Link } from "react-router-dom";
import NavLink from "@/components/NavLink";
import ProductCard from "@/components/ProductCard";
import heroBanner from "@/assets/hero-banner.png";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useState } from "react";

const ITEMS_PER_PAGE = 4;

const PremiumSection = ({
  products,
}: {
  products: typeof import("@/data/products").products;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Premium</h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {currentProducts.map((product, index) => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-secondary text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-secondary text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </motion.section>
  );
};

const HomePage = () => {
  const sellingFast = products.slice(0, 4);
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
          <h1 className="font-display text-2xl font-bold text-[#9d3530]">
            tumbas.
          </h1>
          <div className="flex items-center gap-0.25">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart
                size={22}
                className="text-foreground transform scale-x-[-1]"
              />
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
              src={heroBanner}
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
            className="flex-1 py-3 px-4 rounded-sm text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center text-center"
          >
            About Shop
          </Link>

          <Link
            to="/about-batik-indramayu"
            className="flex-1 py-3 px-4 rounded-sm text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center text-center"
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
            <h2 className="text-lg font-semibold text-foreground">
              Selling fast
            </h2>
            <div className="flex items-center gap-1">
              <span className="text-sm size-[28px] rounded bg-primary text-primary-foreground flex items-center justify-center">
                12
              </span>
              <span className="text-foreground">:</span>
              <span className="text-sm size-[28px] rounded bg-primary text-primary-foreground flex items-center justify-center">
                12
              </span>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {sellingFast.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex-shrink-0 w-[120px]"
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
                        <br />
                        <span className="text-xs font-semibold text-primary block">
                          Rp {product.price.toLocaleString("id-ID")}
                        </span>
                        <span className="text-[8px] font-semibold text-primary block -mt-[2px]">
                          limited offer
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
        <PremiumSection products={premiumProducts} />
      </main>

      <NavLink />
    </div>
  );
};

export default HomePage;
