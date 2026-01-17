import { Building2, Clock, Copy, CreditCard, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

import { formatPrice } from "@/lib/formatters";
import { useToast } from "@/hooks/use-toast";

interface PaymentInstructionsProps {
  paymentMethod: string;
  total: number;
  createdAt: string;
  onExpired?: () => void;
}

const PAYMENT_DETAILS = {
  bca: {
    type: "bank",
    name: "Transfer Bank BCA",
    accountNumber: "1234567890",
    accountName: "PT Batik Indramayu",
    icon: Building2,
  },
  mandiri: {
    type: "bank",
    name: "Transfer Bank Mandiri",
    accountNumber: "0987654321",
    accountName: "PT Batik Indramayu",
    icon: Building2,
  },
  gopay: {
    type: "ewallet",
    name: "GoPay",
    phoneNumber: "081234567890",
    icon: Wallet,
  },
  ovo: {
    type: "ewallet",
    name: "OVO",
    phoneNumber: "081234567890",
    icon: Wallet,
  },
  mastercard: {
    type: "card",
    name: "Mastercard",
    icon: CreditCard,
  },
  visa: {
    type: "card",
    name: "Visa",
    icon: CreditCard,
  },
};

const PaymentInstructions = ({
  paymentMethod,
  total,
  createdAt,
  onExpired,
}: PaymentInstructionsProps) => {
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const paymentInfo =
    PAYMENT_DETAILS[paymentMethod as keyof typeof PAYMENT_DETAILS];

  useEffect(() => {
    const calculateTimeLeft = () => {
      const orderTime = new Date(createdAt).getTime();
      const expiryTime = orderTime + 60 * 60 * 1000; // 1 hour after order
      const now = new Date().getTime();
      const remaining = Math.max(0, expiryTime - now);

      if (remaining === 0 && onExpired) {
        onExpired();
      }

      return remaining;
    };

    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt, onExpired]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Berhasil disalin",
      description: `${label} berhasil disalin ke clipboard`,
    });
  };

  if (!paymentInfo) return null;

  const Icon = paymentInfo.icon;

  return (
    <div className="space-y-4">
      {/* Countdown Timer */}
      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center">
            <Clock size={20} className="text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
              Selesaikan pembayaran sebelum
            </p>
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {formatTime(timeLeft)}
            </p>
          </div>
        </div>
      </div>

      {/* Payment Method Info */}
      <div className="p-4 bg-card rounded-xl border border-border/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {paymentInfo.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {paymentInfo.type === "bank"
                ? "Virtual Account"
                : paymentInfo.type === "ewallet"
                  ? "E-Wallet"
                  : "Kartu Kredit/Debit"}
            </p>
          </div>
        </div>

        {/* Total Amount */}
        <div className="p-3 bg-muted/50 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total Pembayaran</p>
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold text-primary">
                {formatPrice(total)}
              </p>
              <button
                onClick={() => copyToClipboard(total.toString(), "Nominal")}
                className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors"
              >
                <Copy size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bank Transfer Instructions */}
        {paymentInfo.type === "bank" && (
          <div className="space-y-3">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">
                Nomor Virtual Account
              </p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-mono font-semibold text-foreground">
                  {(paymentInfo as { accountNumber: string }).accountNumber}
                </p>
                <button
                  onClick={() =>
                    copyToClipboard(
                      (paymentInfo as { accountNumber: string }).accountNumber,
                      "Nomor VA"
                    )
                  }
                  className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">
                Nama Penerima
              </p>
              <p className="text-sm font-semibold text-foreground">
                {(paymentInfo as { accountName: string }).accountName}
              </p>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">Cara Pembayaran:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  Buka aplikasi {paymentInfo.name.replace("Transfer Bank ", "")}
                </li>
                <li>Pilih menu Transfer → Virtual Account</li>
                <li>Masukkan nomor Virtual Account di atas</li>
                <li>Konfirmasi detail pembayaran dan nominal</li>
                <li>Masukkan PIN atau autentikasi</li>
                <li>Simpan bukti pembayaran</li>
              </ol>
            </div>
          </div>
        )}

        {/* E-Wallet Instructions */}
        {paymentInfo.type === "ewallet" && (
          <div className="space-y-3">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">
                Nomor {paymentInfo.name}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-mono font-semibold text-foreground">
                  {(paymentInfo as { phoneNumber: string }).phoneNumber}
                </p>
                <button
                  onClick={() =>
                    copyToClipboard(
                      (paymentInfo as { phoneNumber: string }).phoneNumber,
                      "Nomor telepon"
                    )
                  }
                  className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">Cara Pembayaran:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Buka aplikasi {paymentInfo.name}</li>
                <li>Pilih menu Transfer / Pay</li>
                <li>Masukkan nomor tujuan di atas</li>
                <li>Masukkan nominal pembayaran</li>
                <li>Konfirmasi dan masukkan PIN</li>
                <li>Simpan bukti pembayaran</li>
              </ol>
            </div>
          </div>
        )}

        {/* Card Instructions */}
        {paymentInfo.type === "card" && (
          <div className="text-xs text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">Informasi:</p>
            <p>
              Pembayaran dengan {paymentInfo.name} akan diproses secara
              otomatis. Silakan periksa notifikasi dari bank Anda untuk
              konfirmasi transaksi.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentInstructions;
