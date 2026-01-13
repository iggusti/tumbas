import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CreditCard, Plus, Trash2, Wallet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { creditCardSchema, CreditCardFormData } from "@/lib/validations";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NavLink from "@/components/NavLink";
import { useState } from "react";

interface PaymentCard {
  id: number;
  type: string;
  name: string;
  number: string;
  expiry: string;
  isDefault: boolean;
}

const PaymentMethodsPage = () => {
  const navigate = useNavigate();
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [cards, setCards] = useState<PaymentCard[]>([
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
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreditCardFormData>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      cardNumber: "",
      cardHolder: "",
      expiry: "",
      cvv: "",
    },
  });

  const cardNumber = watch("cardNumber");
  const expiry = watch("expiry");

  const detectCardType = (number: string): string => {
    const cleaned = number.replace(/\s/g, "");
    if (cleaned.startsWith("4")) return "Visa";
    if (cleaned.startsWith("5") || cleaned.startsWith("2")) return "Mastercard";
    if (cleaned.startsWith("3")) return "American Express";
    return "Card";
  };

  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(" ").slice(0, 19) : "";
  };

  const formatExpiry = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setValue("cardNumber", formatted, { shouldValidate: true });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setValue("expiry", formatted, { shouldValidate: true });
  };

  const handleCardHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("cardHolder", e.target.value.toUpperCase(), { shouldValidate: true });
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setValue("cvv", value, { shouldValidate: true });
  };

  const onSubmit = (data: CreditCardFormData) => {
    const maskedNumber =
      "**** **** **** " + data.cardNumber.replace(/\s/g, "").slice(-4);
    const cardType = detectCardType(data.cardNumber);

    const newCardData: PaymentCard = {
      id: Date.now(),
      type: "card",
      name: cardType,
      number: maskedNumber,
      expiry: data.expiry,
      isDefault: cards.length === 0,
    };

    setCards([...cards, newCardData]);
    reset();
    setIsAddCardOpen(false);
  };

  const handleDeleteCard = (id: number) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleCloseDialog = () => {
    reset();
    setIsAddCardOpen(false);
  };

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
        <Link
          to=""
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className="p-1"
        >
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
            <button
              onClick={() => setIsAddCardOpen(true)}
              className="text-primary text-sm font-medium flex items-center gap-1"
            >
              <Plus size={16} />
              Tambah
            </button>
          </div>
          <div className="space-y-3">
            <AnimatePresence>
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`bg-card rounded-xl border p-4 ${
                    card.isDefault ? "border-primary" : "border-border"
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
                            {card.name}
                          </p>
                          {card.isDefault && (
                            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {card.number}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Exp: {card.expiry}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteCard(card.id)}
                      className="p-2 hover:bg-destructive/10 rounded-full transition-colors"
                    >
                      <Trash2 size={16} className="text-destructive" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
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

      {/* Add Card Dialog */}
      <Dialog open={isAddCardOpen} onOpenChange={(open) => !open && handleCloseDialog()}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-[400px] rounded-xl">
          <DialogHeader>
            <DialogTitle>Tambah Kartu Baru</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Nomor Kartu</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength={19}
              />
              {errors.cardNumber && (
                <p className="text-xs text-destructive">{errors.cardNumber.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardHolder">Nama Pemegang Kartu</Label>
              <Input
                id="cardHolder"
                placeholder="JOHN DOE"
                {...register("cardHolder")}
                onChange={handleCardHolderChange}
              />
              {errors.cardHolder && (
                <p className="text-xs text-destructive">{errors.cardHolder.message}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="expiry">Masa Berlaku</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={handleExpiryChange}
                  maxLength={5}
                />
                {errors.expiry && (
                  <p className="text-xs text-destructive">{errors.expiry.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="password"
                  placeholder="***"
                  {...register("cvv")}
                  onChange={handleCvvChange}
                  maxLength={4}
                />
                {errors.cvv && (
                  <p className="text-xs text-destructive">{errors.cvv.message}</p>
                )}
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
            >
              Simpan Kartu
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <NavLink />
    </div>
  );
};

export default PaymentMethodsPage;
