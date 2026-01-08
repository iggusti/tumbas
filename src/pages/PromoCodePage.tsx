import { Check, ChevronLeft, Copy, Gift, Percent } from "lucide-react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const promoCodes = [
  {
    id: 1,
    code: "BATIK2024",
    discount: "20%",
    description: "Diskon 20% untuk semua produk Batik Tulis",
    validUntil: "31 Jan 2024",
    minPurchase: 500000,
    isActive: true,
  },
  {
    id: 2,
    code: "NEWYEAR25",
    discount: "25%",
    description: "Promo Tahun Baru! Diskon 25% untuk pembelian pertama",
    validUntil: "15 Jan 2024",
    minPurchase: 300000,
    isActive: true,
  },
  {
    id: 3,
    code: "FREESHIP",
    discount: "Free",
    description: "Gratis ongkir untuk seluruh Indonesia",
    validUntil: "28 Feb 2024",
    minPurchase: 200000,
    isActive: true,
  },
  {
    id: 4,
    code: "MEMBER10",
    discount: "10%",
    description: "Diskon khusus member setia",
    validUntil: "31 Dec 2023",
    minPurchase: 100000,
    isActive: false,
  },
];

const PromoCodePage = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="mobile-container">
      <div className="page-content pb-24">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-2">
          <Link to="/profile" className="p-2 -ml-2">
            <ChevronLeft size={24} className="text-foreground" />
          </Link>
          <h1 className="text-xl font-display font-bold text-foreground">
            Promo Code
          </h1>
        </div>

        {/* Promo Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4 p-4 bg-gradient-to-r from-primary to-primary/80 rounded-xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Gift size={24} className="text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-primary-foreground font-semibold">
                Promo Spesial!
              </h2>
              <p className="text-primary-foreground/80 text-sm">
                Gunakan kode promo untuk diskon menarik
              </p>
            </div>
          </div>
        </motion.div>

        {/* Active Promos */}
        <div className="px-4 mt-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Promo Aktif
          </h3>
          <div className="space-y-3">
            {promoCodes
              .filter((promo) => promo.isActive)
              .map((promo, index) => (
                <motion.div
                  key={promo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl border border-border/50 overflow-hidden"
                >
                  <div className="flex">
                    {/* Discount Badge */}
                    <div className="w-20 bg-primary/10 flex flex-col items-center justify-center p-3">
                      <Percent size={20} className="text-primary mb-1" />
                      <span className="text-lg font-bold text-primary">
                        {promo.discount}
                      </span>
                    </div>

                    {/* Promo Details */}
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground">
                            {promo.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Min. pembelian Rp{" "}
                            {promo.minPurchase.toLocaleString("id-ID")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Berlaku hingga {promo.validUntil}
                          </p>
                        </div>
                      </div>

                      {/* Code & Copy */}
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex-1 bg-muted rounded-lg px-3 py-2">
                          <span className="text-sm font-mono font-semibold text-foreground">
                            {promo.code}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopyCode(promo.id, promo.code)}
                          className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          {copiedId === promo.id ? (
                            <Check size={18} />
                          ) : (
                            <Copy size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Expired Promos */}
        <div className="px-4 mt-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">
            Kadaluarsa
          </h3>
          <div className="space-y-3">
            {promoCodes
              .filter((promo) => !promo.isActive)
              .map((promo) => (
                <div
                  key={promo.id}
                  className="bg-muted/50 rounded-xl border border-border/30 p-4 opacity-60"
                >
                  <div className="flex items-center gap-3">
                    <Percent size={18} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground line-through">
                        {promo.code}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Berakhir {promo.validUntil}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoCodePage;
