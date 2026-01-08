import { AnimatePresence, motion } from "framer-motion";
import { Eraser, Search, ShoppingCart, X } from "lucide-react";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import NavLink from "@/components/NavLink";
import { products, ProductTag } from "@/data/products";

const categories: { id: number; name: ProductTag }[] = [
  { id: 1, name: "Man" },
  { id: 2, name: "Woman" },
  { id: 3, name: "Batik Fabric" },
  { id: 4, name: "Accessories" },
];

const SearchPage = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProductTag | null>(null);

  const popularProducts = products.slice(0, 4);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const categoryResults = useMemo(() => {
    if (!selectedCategory) return [];
    return products.filter((product) => product.tags.includes(selectedCategory));
  }, [selectedCategory]);

  const handleCategoryClick = (categoryName: ProductTag) => {
    setSelectedCategory(categoryName);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
  };

  return (
    <div className="mobile-container">
      <div className="page-content pb-24">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2 gap-3">
          <AnimatePresence mode="wait">
            {isSearching ? (
              <motion.div
                key="search-input"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1 relative"
              >
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="pl-10 pr-10 bg-card border-border/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    <Eraser size={18} />
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.h1
                key="title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-2xl font-display font-bold text-foreground"
              >
                Search
              </motion.h1>
            )}
          </AnimatePresence>
          <button
            onClick={() =>
              isSearching ? handleClearSearch() : setIsSearching(true)
            }
            className="p-2 text-muted-foreground shrink-0"
          >
            {isSearching ? <X size={20} /> : <Search size={20} />}
          </button>
        </div>

        {/* Search Results */}
        <AnimatePresence mode="wait">
          {searchQuery.trim() ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="px-4 mt-4"
            >
              <p className="text-sm text-muted-foreground mb-4">
                {searchResults.length} results for "{searchQuery}"
              </p>
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {searchResults.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link to={`/product/${product.id}`}>
                        <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium text-foreground line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Rp {product.price.toLocaleString("id-ID")}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search
                    size={48}
                    className="mx-auto text-muted-foreground/50 mb-4"
                  />
                  <p className="text-muted-foreground">No products found</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {selectedCategory ? (
                /* Category Results */
                <div className="px-4 mt-4">
                  <div className="flex items-center gap-2 mb-4">
                    <button
                      onClick={handleBackToCategories}
                      className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X size={20} />
                    </button>
                    <h2 className="text-lg font-semibold text-foreground">
                      {selectedCategory}
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      ({categoryResults.length} products)
                    </span>
                  </div>
                  {categoryResults.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {categoryResults.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link to={`/product/${product.id}`}>
                            <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="mt-2">
                              <p className="text-sm font-medium text-foreground line-clamp-1">
                                {product.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Rp {product.price.toLocaleString("id-ID")}
                              </p>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Search
                        size={48}
                        className="mx-auto text-muted-foreground/50 mb-4"
                      />
                      <p className="text-muted-foreground">No products in this category</p>
                    </div>
                  )}
                </div>
              ) : (
                <>
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
                          onClick={() => handleCategoryClick(category.name)}
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
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <NavLink />
    </div>
  );
};

export default SearchPage;
