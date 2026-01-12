import {
  ChevronLeft,
  ChevronRight,
  FileText,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import NavLink from "@/components/NavLink";

const helpTopics = [
  {
    id: 1,
    icon: FileText,
    title: "Cara Pemesanan",
    description: "Panduan lengkap untuk memesan produk",
    route: "/how-to-order",
  },
  {
    id: 2,
    icon: HelpCircle,
    title: "FAQ",
    description: "Pertanyaan yang sering diajukan",
    route: "/faq",
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: "Kebijakan Pengembalian",
    description: "Syarat dan ketentuan retur produk",
    route: "/return-policy",
  },
];

const contactMethods = [
  {
    id: 1,
    icon: MessageCircle,
    title: "Live Chat",
    subtitle: "Chat dengan CS kami",
    action: "Mulai Chat",
    color: "bg-green-100 text-green-600",
    href: "https://wa.me/6281234567890?text=Halo,%20saya%20butuh%20bantuan",
  },
  {
    id: 2,
    icon: Phone,
    title: "Telepon",
    subtitle: "+62 812-3456-7890",
    action: "Hubungi",
    color: "bg-blue-100 text-blue-600",
    href: "tel:+6281234567890",
  },
  {
    id: 3,
    icon: Mail,
    title: "Email",
    subtitle: "cs@tumbas.id",
    action: "Kirim Email",
    color: "bg-purple-100 text-purple-600",
    href: "mailto:cs@tumbas.id",
  },
];

const CustomerServicePage = () => {
  return (
    <div className="mobile-container">
      <div className="page-content pb-24">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-2">
          <Link to="/profile" className="p-2 -ml-2">
            <ChevronLeft size={24} className="text-foreground" />
          </Link>
          <h1 className="text-xl font-display font-bold text-foreground">
            Customer Service
          </h1>
        </div>

        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4 p-5 bg-card rounded-xl border border-border/50"
        >
          <h2 className="text-lg font-semibold text-foreground mb-1">
            Halo, ada yang bisa kami bantu?
          </h2>
          <p className="text-sm text-muted-foreground">
            Tim customer service kami siap membantu Anda 24/7
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="px-4 mt-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Hubungi Kami
          </h3>
          <div className="space-y-3">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={method.id}
                  href={method.href}
                  target={method.id === 1 ? "_blank" : undefined}
                  rel={method.id === 1 ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50 hover:bg-accent/5 transition-colors"
                >
                  <div
                    className={`w-12 h-12 rounded-full ${method.color} flex items-center justify-center`}
                  >
                    <Icon size={22} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-foreground">
                      {method.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {method.subtitle}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-primary">
                    {method.action}
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Help Topics */}
        <div className="px-4 mt-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Pusat Bantuan
          </h3>
          <div className="space-y-2">
            {helpTopics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <Link key={topic.id} to={topic.route}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="w-full flex items-center gap-3 p-4 bg-card rounded-xl border border-border/50 hover:bg-accent/5 transition-colors"
                  >
                    <Icon size={20} className="text-muted-foreground" />
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-foreground">
                        {topic.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {topic.description}
                      </p>
                    </div>
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Operating Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mx-4 mt-6 p-4 bg-muted/50 rounded-xl"
        >
          <h4 className="text-sm font-semibold text-foreground mb-2">
            Jam Operasional
          </h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>Senin - Jumat: 08:00 - 21:00 WIB</p>
            <p>Sabtu - Minggu: 09:00 - 18:00 WIB</p>
          </div>
        </motion.div>
      </div>

      <NavLink />
    </div>
  );
};

export default CustomerServicePage;
