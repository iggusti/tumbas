import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  Clock,
  Package,
  XCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import NavLink from "@/components/NavLink";
import { motion } from "framer-motion";

const acceptedReasons = [
  "Produk cacat atau rusak saat diterima",
  "Produk tidak sesuai dengan deskripsi",
  "Produk berbeda dari yang dipesan",
  "Ukuran tidak sesuai (dengan bukti pengukuran)",
];

const rejectedReasons = [
  "Berubah pikiran atau tidak suka",
  "Sudah digunakan atau dicuci",
  "Tidak ada bukti pembelian",
  "Pengajuan lebih dari 7 hari",
  "Kerusakan akibat pemakaian",
];

const returnSteps = [
  {
    step: 1,
    title: "Ajukan Pengembalian",
    description:
      "Hubungi customer service melalui WhatsApp dan lampirkan foto produk serta bukti pembelian.",
  },
  {
    step: 2,
    title: "Verifikasi",
    description: "Tim kami akan memverifikasi pengajuan dalam 1-2 hari kerja.",
  },
  {
    step: 3,
    title: "Kirim Produk",
    description:
      "Kirim produk ke alamat kami dengan packing yang aman. Ongkir ditanggung pembeli untuk retur non-cacat.",
  },
  {
    step: 4,
    title: "Proses Refund",
    description:
      "Setelah produk diterima dan diverifikasi, refund akan diproses dalam 3-5 hari kerja.",
  },
];

const ReturnPolicyPage = () => {
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
            Kebijakan Pengembalian
          </h1>
        </div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3"
        >
          <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-amber-800 mb-1">
              Perhatian
            </h3>
            <p className="text-xs text-amber-700">
              Pengajuan pengembalian harus dilakukan maksimal 7 hari setelah
              produk diterima. Pastikan produk dalam kondisi asli dan belum
              digunakan.
            </p>
          </div>
        </motion.div>

        {/* Time Limit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-4 mt-4 p-4 bg-card rounded-xl border border-border/50 flex items-center gap-4"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <Clock size={28} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">7 Hari</h3>
            <p className="text-sm text-muted-foreground">
              Batas waktu pengajuan pengembalian
            </p>
          </div>
        </motion.div>

        {/* Accepted Reasons */}
        <div className="px-4 mt-6">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle size={16} className="text-green-600" />
            Alasan yang Diterima
          </h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-green-50 rounded-xl p-4 space-y-2"
          >
            {acceptedReasons.map((reason, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle
                  size={14}
                  className="text-green-600 shrink-0 mt-0.5"
                />
                <span className="text-sm text-green-800">{reason}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Rejected Reasons */}
        <div className="px-4 mt-4">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <XCircle size={16} className="text-red-600" />
            Alasan yang Ditolak
          </h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-red-50 rounded-xl p-4 space-y-2"
          >
            {rejectedReasons.map((reason, index) => (
              <div key={index} className="flex items-start gap-2">
                <XCircle size={14} className="text-red-600 shrink-0 mt-0.5" />
                <span className="text-sm text-red-800">{reason}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Return Steps */}
        <div className="px-4 mt-6">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Package size={16} className="text-primary" />
            Langkah Pengembalian
          </h3>
          <div className="space-y-3">
            {returnSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex gap-3 bg-card rounded-xl border border-border/50 p-4"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 text-sm font-bold">
                  {item.step}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mx-4 mt-6 p-4 bg-primary/10 rounded-xl text-center"
        >
          <p className="text-sm text-foreground mb-2">
            Butuh bantuan untuk pengembalian?
          </p>
          <a
            href="https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20mengajukan%20pengembalian%20produk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            Hubungi via WhatsApp →
          </a>
        </motion.div>
      </div>

      <NavLink />
    </div>
  );
};

export default ReturnPolicyPage;
