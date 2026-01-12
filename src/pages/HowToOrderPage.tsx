import {
  CheckCircle,
  ChevronLeft,
  CreditCard,
  Package,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import NavLink from "@/components/NavLink";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    icon: ShoppingCart,
    title: "Pilih Produk",
    description:
      "Jelajahi katalog dan pilih produk batik yang Anda inginkan. Klik produk untuk melihat detail dan tambahkan ke keranjang.",
  },
  {
    id: 2,
    icon: CreditCard,
    title: "Checkout",
    description:
      "Setelah selesai memilih, buka keranjang dan klik 'Checkout'. Pilih alamat pengiriman dan metode pembayaran.",
  },
  {
    id: 3,
    icon: Package,
    title: "Konfirmasi Pesanan",
    description:
      "Periksa kembali pesanan Anda. Pastikan alamat dan produk sudah benar, lalu konfirmasi pesanan.",
  },
  {
    id: 4,
    icon: Truck,
    title: "Pengiriman",
    description:
      "Pesanan akan diproses dan dikirim ke alamat Anda. Anda dapat melacak status pengiriman di halaman pesanan.",
  },
  {
    id: 5,
    icon: CheckCircle,
    title: "Terima Pesanan",
    description:
      "Terima pesanan Anda dan berikan ulasan. Terima kasih sudah berbelanja di Tumbas!",
  },
];

const HowToOrderPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container">
      <div className="page-content pb-24">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-2">
          <Link
            to=""
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="p-2 -ml-2"
          >
            <ChevronLeft size={24} className="text-foreground" />
          </Link>
          <h1 className="text-xl font-display font-bold text-foreground">
            Cara Pemesanan
          </h1>
        </div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4 p-5 bg-card rounded-xl border border-border/50"
        >
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Panduan Pemesanan
          </h2>
          <p className="text-sm text-muted-foreground">
            Ikuti langkah-langkah berikut untuk memesan produk batik favorit
            Anda dengan mudah dan cepat.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="px-4 mt-6">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border" />

            <div className="space-y-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex gap-4"
                  >
                    {/* Step Number */}
                    <div className="relative z-10 w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Icon size={22} className="text-primary-foreground" />
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 pb-4">
                      <h3 className="text-base font-semibold text-foreground mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mx-4 mt-6 p-4 bg-muted/50 rounded-xl"
        >
          <h4 className="text-sm font-semibold text-foreground mb-2">
            💡 Tips Berbelanja
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Gunakan kode promo untuk mendapatkan diskon menarik</li>
            <li>• Cek ukuran produk dengan teliti sebelum memesan</li>
            <li>• Simpan produk ke favorit untuk dibeli nanti</li>
          </ul>
        </motion.div>
      </div>

      <NavLink />
    </div>
  );
};

export default HowToOrderPage;
