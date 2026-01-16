import { AnimatePresence, motion } from "framer-motion";
import { Check, CreditCard, Wallet, Building2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PaymentMethod {
  id: string;
  type: "card" | "ewallet" | "bank";
  name: string;
  subtitle?: string;
  icon: typeof CreditCard;
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: "mastercard",
    type: "card",
    name: "Mastercard",
    subtitle: "**** **** **** 4532",
    icon: CreditCard,
  },
  {
    id: "visa",
    type: "card",
    name: "Visa",
    subtitle: "**** **** **** 8901",
    icon: CreditCard,
  },
  {
    id: "gopay",
    type: "ewallet",
    name: "GoPay",
    subtitle: "Saldo: Rp 250.000",
    icon: Wallet,
  },
  {
    id: "ovo",
    type: "ewallet",
    name: "OVO",
    subtitle: "Saldo: Rp 100.000",
    icon: Wallet,
  },
  {
    id: "bca",
    type: "bank",
    name: "Transfer Bank BCA",
    subtitle: "Virtual Account",
    icon: Building2,
  },
  {
    id: "mandiri",
    type: "bank",
    name: "Transfer Bank Mandiri",
    subtitle: "Virtual Account",
    icon: Building2,
  },
];

interface PaymentMethodSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMethod: string | null;
  onSelectMethod: (methodId: string) => void;
}

const PaymentMethodSelector = ({
  open,
  onOpenChange,
  selectedMethod,
  onSelectMethod,
}: PaymentMethodSelectorProps) => {
  const groupedMethods = {
    card: paymentMethods.filter((m) => m.type === "card"),
    ewallet: paymentMethods.filter((m) => m.type === "ewallet"),
    bank: paymentMethods.filter((m) => m.type === "bank"),
  };

  const handleSelect = (methodId: string) => {
    onSelectMethod(methodId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[400px] rounded-xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Pilih Metode Pembayaran</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Kartu Debit/Kredit */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Kartu Debit/Kredit
            </h4>
            <div className="space-y-2">
              <AnimatePresence>
                {groupedMethods.card.map((method) => {
                  const isSelected = selectedMethod === method.id;
                  const Icon = method.icon;

                  return (
                    <motion.button
                      key={method.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => handleSelect(method.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-colors ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isSelected ? "bg-primary/10" : "bg-muted"
                          }`}
                        >
                          <Icon
                            size={18}
                            className={
                              isSelected
                                ? "text-primary"
                                : "text-muted-foreground"
                            }
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {method.name}
                          </p>
                          {method.subtitle && (
                            <p className="text-xs text-muted-foreground">
                              {method.subtitle}
                            </p>
                          )}
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <Check size={12} className="text-primary-foreground" />
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* E-Wallet */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              E-Wallet
            </h4>
            <div className="space-y-2">
              <AnimatePresence>
                {groupedMethods.ewallet.map((method) => {
                  const isSelected = selectedMethod === method.id;
                  const Icon = method.icon;

                  return (
                    <motion.button
                      key={method.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => handleSelect(method.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-colors ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isSelected ? "bg-primary/10" : "bg-muted"
                          }`}
                        >
                          <Icon
                            size={18}
                            className={
                              isSelected
                                ? "text-primary"
                                : "text-muted-foreground"
                            }
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {method.name}
                          </p>
                          {method.subtitle && (
                            <p className="text-xs text-muted-foreground">
                              {method.subtitle}
                            </p>
                          )}
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <Check size={12} className="text-primary-foreground" />
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Transfer Bank */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Transfer Bank
            </h4>
            <div className="space-y-2">
              <AnimatePresence>
                {groupedMethods.bank.map((method) => {
                  const isSelected = selectedMethod === method.id;
                  const Icon = method.icon;

                  return (
                    <motion.button
                      key={method.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => handleSelect(method.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-colors ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isSelected ? "bg-primary/10" : "bg-muted"
                          }`}
                        >
                          <Icon
                            size={18}
                            className={
                              isSelected
                                ? "text-primary"
                                : "text-muted-foreground"
                            }
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {method.name}
                          </p>
                          {method.subtitle && (
                            <p className="text-xs text-muted-foreground">
                              {method.subtitle}
                            </p>
                          )}
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <Check size={12} className="text-primary-foreground" />
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodSelector;
