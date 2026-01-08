import { ArrowLeft, CreditCard, Plus, Trash2, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NavLink from "@/components/NavLink";
import { motion } from "framer-motion";

const PaymentMethodsPage = () => {
  const paymentMethods = [
    {
      id: 1,
      type: "card",
      name: "Mastercard",
      number: "**** **** **** 4532",
      expiry: "12/26",
      isDefault: true,
    },
    {
      id: 2,
      type: "card",
      name: "Visa",
      number: "**** **** **** 8901",
      expiry: "08/25",
      isDefault: false,
    },
  ];

  const eWallets = [
    { id: 1, name: "GoPay", balance: "Rp 250.000", connected: true },
    { id: 2, name: "OVO", balance: "Rp 100.000", connected: true },
    { id: 3, name: "DANA", balance: null, connected: false },
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
          Payment Methods
        </h1>
      </motion.header>

      <main className="px-4 py-6 pb-24">
        {/* Cards Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">
              Kartu Debit/Kredit
            </h3>
            <button className="text-primary text-sm font-medium flex items-center gap-1">
              <Plus size={16} />
              Tambah
            </button>
          </div>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`bg-card rounded-xl border p-4 ${
                  method.isDefault ? "border-primary" : "border-border"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-md flex items-center justify-center">
                      <CreditCard size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">
                          {method.name}
                        </p>
                        {method.isDefault && (
                          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {method.number}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Exp: {method.expiry}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-destructive/10 rounded-full transition-colors">
                    <Trash2 size={16} className="text-destructive" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* E-Wallets Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h3 className="font-semibold text-foreground mb-3">E-Wallet</h3>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {eWallets.map((wallet, index) => (
              <div
                key={wallet.id}
                className={`flex items-center gap-3 p-4 ${
                  index !== eWallets.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Wallet size={18} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {wallet.name}
                  </p>
                  {wallet.connected && wallet.balance && (
                    <p className="text-xs text-muted-foreground">
                      Saldo: {wallet.balance}
                    </p>
                  )}
                </div>
                {wallet.connected ? (
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    Terhubung
                  </span>
                ) : (
                  <Button size="sm" variant="outline" className="text-xs h-7">
                    Hubungkan
                  </Button>
                )}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Bank Transfer Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold text-foreground mb-3">Transfer Bank</h3>
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-sm text-muted-foreground text-center">
              Transfer bank tersedia saat checkout
            </p>
          </div>
        </motion.section>
      </main>

      <NavLink />
    </div>
  );
};

export default PaymentMethodsPage;
