import { motion } from "framer-motion";
import {
  ChevronRight,
  Bell,
  CreditCard,
  MapPin,
  HelpCircle,
  LogOut,
  Settings,
  Heart,
  Package,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";

const menuItems = [
  { icon: Package, label: "My Orders", description: "Track your orders" },
  { icon: Heart, label: "Wishlist", description: "Your favorite items" },
  { icon: MapPin, label: "Addresses", description: "Manage delivery addresses" },
  { icon: CreditCard, label: "Payment Methods", description: "Cards & wallets" },
];

const settingsItems = [
  { icon: Bell, label: "Notifications", description: "Manage alerts" },
  { icon: Settings, label: "Settings", description: "App preferences" },
  { icon: HelpCircle, label: "Help Center", description: "FAQs & support" },
];

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header title="tumbas." showBack />

      <main className="page-container">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 shadow-soft mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-2xl font-display font-bold text-primary">
                FB
              </span>
            </div>
            <div className="flex-1">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Fathia Berkah
              </h2>
              <p className="text-sm text-muted-foreground">
                fathia@email.com
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Member since 2024
              </p>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </div>
        </motion.div>

        {/* Account Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Account
          </h3>
          <div className="bg-card rounded-2xl overflow-hidden shadow-soft">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.label}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors ${
                    index !== menuItems.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-muted-foreground" />
                </motion.button>
              );
            })}
          </div>
        </motion.section>

        {/* General Settings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            General Setting
          </h3>
          <div className="bg-card rounded-2xl overflow-hidden shadow-soft">
            {settingsItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.label}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors ${
                    index !== settingsItems.length - 1
                      ? "border-b border-border"
                      : ""
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-muted-foreground" />
                </motion.button>
              );
            })}
          </div>
        </motion.section>

        {/* Other Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Other
          </h3>
          <div className="bg-card rounded-2xl overflow-hidden shadow-soft">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-4 p-4 hover:bg-destructive/5 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <LogOut size={18} className="text-destructive" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-destructive">Log Out</p>
                <p className="text-xs text-muted-foreground">
                  Sign out of your account
                </p>
              </div>
            </motion.button>
          </div>
        </motion.section>

        {/* App Version */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-muted-foreground mt-8"
        >
          tumbas. v1.0.0
        </motion.p>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default ProfilePage;
