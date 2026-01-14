import {
  ArrowLeft,
  Clock,
  Facebook,
  Globe,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";

const contactInfo = [
  {
    icon: MapPin,
    label: "Alamat",
    value: "Jl. Batik Indramayu No. 123, Indramayu, Jawa Barat 45212",
  },
  {
    icon: Phone,
    label: "Telepon",
    value: "+62 812-3456-7890",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@tumbas.id",
  },
  {
    icon: Clock,
    label: "Jam Operasional",
    value: "Senin - Minggu, 08:00 - 21:00 WIB",
  },
];

const socialMedia = [
  {
    icon: Instagram,
    label: "@tumbas.batik",
    url: "https://instagram.com/tumbas.batik",
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  {
    icon: Facebook,
    label: "Tumbas Batik",
    url: "https://facebook.com/tumbasbatik",
    color: "bg-blue-600",
  },
  {
    icon: Globe,
    label: "www.tumbas.id",
    url: "https://tumbas.id",
    color: "bg-primary",
  },
];

const ContactPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container">
      <div className="page-content pb-24">
        {/* Header */}
        <PageHeader title="Contact" />

        {/* Header Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4 p-5 bg-card rounded-xl border border-border/50 text-center"
        >
          <h2 className="text-2xl font-display font-bold text-foreground mb-1">
            tumbas.
          </h2>
          <p className="text-sm text-muted-foreground">
            Batik Indramayu Asli & Berkualitas
          </p>
        </motion.div>

        {/* Contact Info */}
        <div className="px-4 mt-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Informasi Kontak
          </h3>
          <div className="space-y-3">
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border/50"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-foreground mt-0.5">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Social Media */}
        <div className="px-4 mt-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Ikuti Kami
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {socialMedia.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl border border-border/50 hover:bg-accent/5 transition-colors"
                >
                  <div
                    className={`w-10 h-10 ${social.color} rounded-full flex items-center justify-center`}
                  >
                    <Icon size={18} className="text-white" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center truncate w-full">
                    {social.label}
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mx-4 mt-6"
        >
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Lokasi Kami
          </h3>
          <div className="aspect-video bg-muted rounded-xl flex items-center justify-center border border-border/50">
            <div className="text-center">
              <MapPin
                size={32}
                className="mx-auto text-muted-foreground/50 mb-2"
              />
              <p className="text-sm text-muted-foreground">Map Preview</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mx-4 mt-6"
        >
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
          >
            <Phone size={18} />
            Chat via WhatsApp
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
