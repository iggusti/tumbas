import {
  ArrowLeft,
  Camera,
  ChevronRight,
  Mail,
  Phone,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NavLink from "@/components/NavLink";
import { motion } from "framer-motion";
import profilePhoto from "@/assets/profile-photo.jpg";

const MyAccountPage = () => {
  const accountDetails = [
    { icon: User, label: "Nama Lengkap", value: "Fatiha Barkah Mubyara" },
    { icon: Mail, label: "Email", value: "fbmubyara@gmail.com" },
    { icon: Phone, label: "No. Telepon", value: "+62 812 3456 7890" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm px-4 py-3 flex items-center gap-3 border-b border-border"
      >
        <Link to="/profile" className="p-1">
          <ArrowLeft size={20} className="text-foreground" />
        </Link>
        <h1 className="font-display text-lg font-semibold text-foreground">
          My Account
        </h1>
      </motion.header>

      <main className="px-4 py-6 pb-24">
        {/* Profile Photo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-muted overflow-hidden">
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md">
              <Camera size={16} className="text-primary-foreground" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Tap untuk ganti foto
          </p>
        </motion.div>

        {/* Account Details */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h3 className="font-semibold text-foreground mb-3">Informasi Akun</h3>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {accountDetails.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3 p-4 hover:bg-accent/5 transition-colors ${
                    index !== accountDetails.length - 1
                      ? "border-b border-border"
                      : ""
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {item.value}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </button>
              );
            })}
          </div>
        </motion.section>

        {/* Security Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="font-semibold text-foreground mb-3">Keamanan</h3>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <button className="w-full flex items-center gap-3 p-4 hover:bg-accent/5 transition-colors">
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-foreground">
                  Ubah Password
                </p>
                <p className="text-xs text-muted-foreground">
                  Terakhir diubah 3 bulan lalu
                </p>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
          </div>
        </motion.section>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="outline"
            className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            Keluar
          </Button>
        </motion.div>
      </main>

      <NavLink />
    </div>
  );
};

export default MyAccountPage;
