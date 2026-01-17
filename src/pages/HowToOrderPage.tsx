import {
  CheckCircle,
  Clock,
  CreditCard,
  Package,
  ShoppingCart,
  Truck,
} from "lucide-react";

import NavLink from "@/components/NavLink";
import PageHeader from "@/components/PageHeader";
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
    icon: Package,
    title: "Checkout",
    description:
      "Buka keranjang, centang produk yang ingin dibeli, lalu klik 'Checkout'. Pilih alamat pengiriman, opsi pengiriman, dan metode pembayaran.",
  },
  {
    id: 3,
    icon: CreditCard,
    title: "Buat Pesanan",
    description:
      "Periksa kembali pesanan Anda. Pastikan alamat dan produk sudah benar, lalu klik 'Beli Sekarang' untuk membuat pesanan.",
  },
  {
    id: 4,
    icon: Clock,
    title: "Lakukan Pembayaran",
    description:
      "Ikuti instruksi pembayaran di halaman detail pesanan. Selesaikan pembayaran dalam waktu 1 jam agar pesanan tidak dibatalkan otomatis.",
  },
  {
    id: 5,
    icon: Truck,
    title: "Pengiriman",
    description:
      "Setelah pembayaran dikonfirmasi, pesanan akan diproses dan dikirim ke alamat Anda. Lacak status pengiriman di halaman pesanan.",
  },
  {
    id: 6,
    icon: CheckCircle,
    title: "Terima Pesanan",
    description:
      "Terima pesanan Anda dan pastikan produk sesuai. Terima kasih sudah berbelanja di Tumbas!",
  },
];

const HowToOrderPage = () => {
  return (
    <div className="mobile-container">
      <div className="page-content pb-24">
        {/* Header */}
        <PageHeader title="Cara Pemesanan" />

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
