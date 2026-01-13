import { ReactNode, createContext, useContext, useState } from "react";

export interface Voucher {
  id: string;
  code: string;
  name: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase: number;
  maxDiscount?: number;
  expiryDate: string;
}

interface VoucherContextType {
  vouchers: Voucher[];
  selectedVoucher: Voucher | null;
  selectVoucher: (voucher: Voucher | null) => void;
  calculateDiscount: (subtotal: number) => number;
}

const VoucherContext = createContext<VoucherContextType | undefined>(undefined);

const DEFAULT_VOUCHERS: Voucher[] = [
  {
    id: "1",
    code: "BATIK10",
    name: "Diskon 10%",
    description: "Diskon 10% untuk semua produk batik",
    discountType: "percentage",
    discountValue: 10,
    minPurchase: 100000,
    maxDiscount: 50000,
    expiryDate: "2026-02-28",
  },
  {
    id: "2",
    code: "ONGKIR",
    name: "Gratis Ongkir",
    description: "Gratis ongkir hingga Rp25.000",
    discountType: "fixed",
    discountValue: 25000,
    minPurchase: 150000,
    expiryDate: "2026-01-31",
  },
  {
    id: "3",
    code: "HEMAT50K",
    name: "Potongan Rp50.000",
    description: "Potongan langsung Rp50.000",
    discountType: "fixed",
    discountValue: 50000,
    minPurchase: 300000,
    expiryDate: "2026-03-15",
  },
  {
    id: "4",
    code: "MEMBER15",
    name: "Diskon Member 15%",
    description: "Diskon 15% khusus member",
    discountType: "percentage",
    discountValue: 15,
    minPurchase: 200000,
    maxDiscount: 100000,
    expiryDate: "2026-02-15",
  },
];

export const VoucherProvider = ({ children }: { children: ReactNode }) => {
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  const selectVoucher = (voucher: Voucher | null) => {
    setSelectedVoucher(voucher);
  };

  const calculateDiscount = (subtotal: number): number => {
    if (!selectedVoucher) return 0;
    if (subtotal < selectedVoucher.minPurchase) return 0;

    if (selectedVoucher.discountType === "percentage") {
      const discount = (subtotal * selectedVoucher.discountValue) / 100;
      return selectedVoucher.maxDiscount
        ? Math.min(discount, selectedVoucher.maxDiscount)
        : discount;
    }
    return selectedVoucher.discountValue;
  };

  return (
    <VoucherContext.Provider
      value={{
        vouchers: DEFAULT_VOUCHERS,
        selectedVoucher,
        selectVoucher,
        calculateDiscount,
      }}
    >
      {children}
    </VoucherContext.Provider>
  );
};

export const useVoucher = () => {
  const context = useContext(VoucherContext);
  if (context === undefined) {
    throw new Error("useVoucher must be used within a VoucherProvider");
  }
  return context;
};
