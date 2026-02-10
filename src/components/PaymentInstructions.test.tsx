import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import PaymentInstructions from "./PaymentInstructions";

// Mock QRISPayment component
vi.mock("./QRISPayment", () => ({
  default: ({ orderId, total }: { orderId: string; total: number }) => (
    <div data-testid="qris-payment">QRIS: {orderId} - {total}</div>
  ),
}));

// Mock hooks
vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

// Mock utilities
vi.mock("@/lib/formatters", () => ({
  formatPrice: (price: number) => `Rp ${price.toLocaleString("id-ID")}`,
}));

// Mock lucide-react
vi.mock("lucide-react", () => {
  const icon = (props: any) => <svg {...props} />;
  return {
    Building2: icon,
    Clock: icon,
    Copy: icon,
    CreditCard: icon,
    QrCode: icon,
    Wallet: icon,
  };
});

describe("PaymentInstructions", () => {
  const defaultProps = {
    paymentMethod: "bca",
    total: 150000,
    createdAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour in the future
    orderId: "ORDER123",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it("should render payment instructions for BCA", () => {
    render(<PaymentInstructions {...defaultProps} />);

    expect(screen.getByText("Transfer Bank BCA")).toBeInTheDocument();
    expect(screen.getByText("1234567890")).toBeInTheDocument();
    expect(screen.getByText("PT Batik Indramayu")).toBeInTheDocument();
  });

  it("should render QRIS payment component for qris method", () => {
    render(<PaymentInstructions {...defaultProps} paymentMethod="qris" />);

    expect(screen.getByTestId("qris-payment")).toBeInTheDocument();
  });

  it("should render e-wallet payment for GoPay", () => {
    render(<PaymentInstructions {...defaultProps} paymentMethod="gopay" />);

    expect(screen.getByText("GoPay")).toBeInTheDocument();
    expect(screen.getByText("081234567890")).toBeInTheDocument();
  });

  it("should display formatted total amount", () => {
    render(<PaymentInstructions {...defaultProps} />);

    expect(screen.getByText("Rp 150.000")).toBeInTheDocument();
  });

  it("should show countdown timer label", () => {
    render(<PaymentInstructions {...defaultProps} />);

    expect(screen.getByText("Selesaikan pembayaran sebelum")).toBeInTheDocument();
  });

  it("should render different payment method types", () => {
    const { rerender } = render(<PaymentInstructions {...defaultProps} paymentMethod="mastercard" />);

    expect(screen.getByText("Mastercard")).toBeInTheDocument();
    expect(screen.getByText("Kartu Kredit/Debit")).toBeInTheDocument();
  });

  it("should render Virtual Account label for bank transfer", () => {
    render(<PaymentInstructions {...defaultProps} />);

    expect(screen.getByText("Virtual Account")).toBeInTheDocument();
  });

  it("should render E-Wallet label for e-wallet", () => {
    render(<PaymentInstructions {...defaultProps} paymentMethod="ovo" />);

    expect(screen.getByText("E-Wallet")).toBeInTheDocument();
  });

  it("should handle invalid payment method gracefully", () => {
    render(<PaymentInstructions {...defaultProps} paymentMethod="invalid" />);

    // Should return null, so nothing rendered
    const container = document.querySelector(".space-y-4");
    expect(container).not.toBeInTheDocument();
  });

  it("should render bank payment instructions", () => {
    render(<PaymentInstructions {...defaultProps} />);

    expect(screen.getByText("Cara Pembayaran:")).toBeInTheDocument();
    expect(screen.getByText(/Nomor Virtual Account/)).toBeInTheDocument();
  });

  it("should render e-wallet payment instructions", () => {
    render(<PaymentInstructions {...defaultProps} paymentMethod="gopay" />);

    expect(screen.getByText("Cara Pembayaran:")).toBeInTheDocument();
    expect(screen.getByText(/Nomor GoPay/)).toBeInTheDocument();
  });

  it("should render card payment info", () => {
    render(<PaymentInstructions {...defaultProps} paymentMethod="visa" />);

    expect(screen.getByText("Visa")).toBeInTheDocument();
    expect(screen.getByText("Informasi:")).toBeInTheDocument();
  });
});
