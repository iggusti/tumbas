import {
  Bell,
  ChevronRight,
  ClipboardList,
  Clock4,
  CreditCard,
  Headphones,
  Heart,
  MapPin,
  Percent,
  Phone,
  User,
} from "lucide-react";

import { Link } from "react-router-dom";
import NavLink from "@/components/NavLink";
import { motion } from "framer-motion";
import profilePhoto from "@/assets/profile-photo.jpg";

const quickActions = [
  {
    icon: ClipboardList,
    label: "My Orders",
    color: "bg-amber-100 text-amber-600",
    route: "/my-orders",
  },
  {
    icon: Percent,
    label: "Promo Code",
    color: "bg-orange-100 text-orange-600",
    route: "/promo-code",
  },
  {
    icon: Headphones,
    label: "Customer Service",
    color: "bg-primary/10 text-primary",
    route: "/customer-service",
  },
];

const generalSettings = [
  { icon: User, label: "My account" },
  { icon: CreditCard, label: "Payment methods" },
  { icon: MapPin, label: "My Address" },
  { icon: Bell, label: "Notification" },
];

const activities = [
  { icon: Heart, label: "Favorit", color: "bg-muted" },
  { icon: Clock4, label: "Terakhir Dilihat", color: "bg-red-50" },
];

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-3"
      >
        <h1 className="font-display text-2xl font-bold text-foreground">
          tumbas.
        </h1>
      </motion.header>

      <main className="px-4 pb-24">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mt-1.5 mb-3 gap-5"
        >
          <div className="w-20 h-20 rounded-full bg-muted overflow-hidden mb-3">
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-left mb-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Fatiha Barkah Mubyara
            </h2>
            <p className="text-sm text-primary mt-1">fbmubyara@gmail.com</p>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-6 mb-8"
        >
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link key={action.label} to={action.route}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={`w-20 h-20 rounded-sm ${action.color}
                        flex flex-col items-center justify-start p-3 gap-1 transition-shadow hover:shadow-md`}
                  >
                    <Icon size={22} />
                    <span className="text-xs text-muted-foreground font-medium text-center max-w-[70px] leading-tight">
                      {action.label}
                    </span>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>

        {/* General Setting */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="font-semibold text-foreground mb-3">
            General Setting
          </h3>
          <div className="space-y-1">
            {generalSettings.map((item) => {
              const Icon = item.icon;

              const content = (
                <>
                  <Icon size={18} className="text-muted-foreground" />
                  <span className="flex-1 text-left text-sm text-foreground">
                    {item.label}
                  </span>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </>
              );

              const routes: Record<string, string> = {
                "My account": "/my-account",
                "Payment methods": "/payment-methods",
                "My Address": "/my-address",
                "Notification": "/notification",
              };

              const route = routes[item.label];

              if (route) {
                return (
                  <Link
                    key={item.label}
                    to={route}
                    className="w-full flex items-center gap-3 py-3 hover:bg-accent/5 transition-colors"
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 py-3 hover:bg-accent/5 transition-colors"
                >
                  {content}
                </button>
              );
            })}
          </div>
        </motion.section>

        {/* Aktivitas Saya */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h3 className="font-semibold text-foreground mb-3">Aktivitas Saya</h3>

          <div className="flex gap-4">
            {activities.map((activity) => {
              const Icon = activity.icon;

              return (
                <motion.button
                  key={activity.label}
                  whileHover={{ y: -4, scale: 1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-xl
                      ${activity.color}
                      transition-shadow hover:shadow-md`}
                >
                  <Icon
                    size={20}
                    className={
                      activity.label === "Terakhir Dilihat"
                        ? "text-red-500"
                        : "text-foreground"
                    }
                  />
                  <span className="text-xs font-medium text-foreground">
                    {activity.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.section>

        {/* Other */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-semibold text-foreground mb-3">Other</h3>
          <Link
            to="/contact"
            className="w-full flex items-center gap-3 py-3 hover:bg-accent/5 transition-colors"
          >
            <Phone size={18} className="text-muted-foreground" />
            <span className="flex-1 text-left text-sm text-foreground">
              Contact
            </span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </Link>
        </motion.section>
      </main>

      <NavLink />
    </div>
  );
};

export default ProfilePage;
