import { ArrowLeft, Check, Home, MapPin, Plus } from "lucide-react";

import { Link } from "react-router-dom";
import NavLink from "@/components/NavLink";
import { motion } from "framer-motion";

interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  isDefault: boolean;
  icon: typeof Home | typeof MapPin;
}

const addresses: Address[] = [
  {
    id: "1",
    label: "Rumah",
    name: "Fatiha Barkah Mubyara",
    phone: "+62 812-3456-7890",
    address:
      "Jln. Siliwangi, Blok Kluwut, No.50, RT 03, RW 01, Desa Haurkolot, Kec. Haurgeulis, Kab. Indramayu",
    isDefault: true,
    icon: Home,
  },
];

const MyAddressPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-background px-4 py-3 flex items-center gap-3"
      >
        <Link to="/profile" className="p-1">
          <ArrowLeft size={20} className="text-foreground" />
        </Link>
        <div>
          <span className="text-muted-foreground text-sm">tumbas.</span>
          <h1 className="font-display text-lg font-semibold text-foreground -mt-1">
            My Address
          </h1>
        </div>
      </motion.header>

      <main className="px-4 pb-24">
        {/* Add New Address Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 py-4 mb-4 border-2 border-dashed border-primary/30 rounded-xl text-primary hover:bg-primary/5 transition-colors"
        >
          <Plus size={20} />
          <span className="font-medium">Tambah Alamat Baru</span>
        </motion.button>

        {/* Address List */}
        <div className="space-y-3">
          {addresses.map((address, index) => {
            const Icon = address.icon;

            return (
              <motion.div
                key={address.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`bg-card rounded-xl p-4 border ${
                  address.isDefault
                    ? "border-primary/50 shadow-sm"
                    : "border-border/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      address.isDefault ? "bg-primary/10" : "bg-muted"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={
                        address.isDefault
                          ? "text-primary"
                          : "text-muted-foreground"
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-foreground text-sm">
                        {address.label}
                      </span>
                      {address.isDefault && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                          Default
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium text-foreground text-sm">
                      {address.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {address.phone}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      {address.address}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50">
                      <button className="text-xs text-primary font-medium hover:underline">
                        Edit
                      </button>
                      {!address.isDefault && (
                        <>
                          <button className="text-xs text-muted-foreground hover:text-foreground">
                            Jadikan Default
                          </button>
                          <button className="text-xs text-red-500 hover:underline">
                            Hapus
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  {address.isDefault && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check size={14} className="text-primary-foreground" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State (hidden when addresses exist) */}
        {addresses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <MapPin size={32} className="text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">
              Belum Ada Alamat
            </h3>
            <p className="text-sm text-muted-foreground">
              Tambahkan alamat pengiriman untuk memudahkan checkout
            </p>
          </motion.div>
        )}
      </main>

      <NavLink />
    </div>
  );
};

export default MyAddressPage;
