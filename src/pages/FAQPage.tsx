import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Link } from "react-router-dom";
import NavLink from "@/components/NavLink";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";

const faqCategories = [
  {
    category: "Pemesanan",
    items: [
      {
        question: "Bagaimana cara memesan produk?",
        answer:
          "Pilih produk yang diinginkan, tambahkan ke keranjang, lalu lakukan checkout. Anda dapat memilih alamat pengiriman dan metode pembayaran sebelum menyelesaikan pesanan.",
      },
      {
        question: "Apakah bisa memesan dalam jumlah besar (grosir)?",
        answer:
          "Ya, kami menerima pesanan dalam jumlah besar. Silakan hubungi customer service kami melalui WhatsApp untuk mendapatkan penawaran khusus.",
      },
      {
        question: "Apakah bisa custom desain batik?",
        answer:
          "Ya, kami menerima pesanan custom untuk desain batik. Silakan hubungi kami untuk konsultasi lebih lanjut mengenai desain, harga, dan waktu pengerjaan.",
      },
    ],
  },
  {
    category: "Pembayaran",
    items: [
      {
        question: "Metode pembayaran apa saja yang tersedia?",
        answer:
          "Kami menerima pembayaran melalui transfer bank, kartu kredit/debit, e-wallet (GoPay, OVO, Dana), dan COD untuk area tertentu.",
      },
      {
        question: "Apakah pembayaran aman?",
        answer:
          "Ya, semua transaksi pembayaran di platform kami dienkripsi dan aman. Kami tidak menyimpan data kartu kredit Anda.",
      },
      {
        question: "Bagaimana cara menggunakan kode promo?",
        answer:
          "Masukkan kode promo pada halaman checkout sebelum melakukan pembayaran. Diskon akan otomatis teraplikasi jika kode valid.",
      },
    ],
  },
  {
    category: "Pengiriman",
    items: [
      {
        question: "Berapa lama waktu pengiriman?",
        answer:
          "Waktu pengiriman tergantung lokasi: Pulau Jawa 2-4 hari kerja, luar Pulau Jawa 4-7 hari kerja. Untuk produk custom, waktu pengerjaan ditambah 7-14 hari kerja.",
      },
      {
        question: "Apakah bisa melacak pesanan?",
        answer:
          "Ya, Anda dapat melacak status pesanan di halaman 'My Orders'. Nomor resi akan dikirimkan melalui notifikasi setelah pesanan dikirim.",
      },
      {
        question: "Apakah ada gratis ongkir?",
        answer:
          "Ya, kami sering mengadakan promo gratis ongkir. Cek halaman promo code untuk penawaran terbaru.",
      },
    ],
  },
  {
    category: "Produk",
    items: [
      {
        question: "Apakah semua produk adalah batik asli?",
        answer:
          "Ya, semua produk kami adalah batik tulis dan cap asli dari Indramayu yang dibuat oleh pengrajin lokal dengan teknik tradisional.",
      },
      {
        question: "Bagaimana cara merawat batik?",
        answer:
          "Cuci dengan tangan menggunakan deterjen lembut, jangan diperas, keringkan di tempat teduh, dan setrika dengan suhu sedang. Simpan dengan baik agar warna tetap awet.",
      },
      {
        question: "Apakah warna batik bisa luntur?",
        answer:
          "Batik tulis asli menggunakan pewarna berkualitas tinggi yang tahan lama. Namun, disarankan untuk mencuci terpisah pada pencucian pertama.",
      },
    ],
  },
];

const FAQPage = () => {
  return (
    <div className="mobile-container">
      <div className="page-content pb-24">
        {/* Header */}
        <PageHeader title="FAQ" />

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4 p-5 bg-card rounded-xl border border-border/50"
        >
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Pertanyaan Umum
          </h2>
          <p className="text-sm text-muted-foreground">
            Temukan jawaban untuk pertanyaan yang sering diajukan. Jika tidak
            menemukan jawaban yang Anda cari, silakan hubungi customer service
            kami.
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="px-4 mt-6 space-y-6">
          {faqCategories.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
            >
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {category.category}
              </h3>
              <Accordion type="single" collapsible className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <AccordionItem
                    key={itemIndex}
                    value={`${category.category}-${itemIndex}`}
                    className="bg-card rounded-xl border border-border/50 px-4"
                  >
                    <AccordionTrigger className="text-sm text-left font-medium text-foreground hover:no-underline py-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mx-4 mt-6 p-4 bg-primary/10 rounded-xl text-center"
        >
          <p className="text-sm text-foreground mb-2">
            Masih punya pertanyaan?
          </p>
          <Link
            to="/customer-service"
            className="text-sm font-medium text-primary hover:underline"
          >
            Hubungi Customer Service →
          </Link>
        </motion.div>
      </div>

      <NavLink />
    </div>
  );
};

export default FAQPage;
