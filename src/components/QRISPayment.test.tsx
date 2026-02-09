import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import QRISPayment from "./QRISPayment";

// Mock QRCode library
vi.mock("qrcode", () => ({
  default: {
    toDataURL: vi.fn().mockResolvedValue("data:image/png;base64,mock-qr-code"),
  },
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

describe("QRISPayment", () => {
  const defaultProps = {
    orderId: "ORDER123",
    total: 150000,
    createdAt: "2025-01-21T10:00:00Z",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render QRIS payment header", () => {
    render(<QRISPayment {...defaultProps} />);

    expect(screen.getByText("Bayar dengan QRIS")).toBeInTheDocument();
  });

  it("should display order information", () => {
    render(<QRISPayment {...defaultProps} />);

    expect(screen.getByText("ORDER123")).toBeInTheDocument();
    expect(screen.getByText("Rp 150.000")).toBeInTheDocument();
  });

  it("should display payment instructions", () => {
    render(<QRISPayment {...defaultProps} />);

    expect(screen.getByText("Cara Pembayaran:")).toBeInTheDocument();
    expect(screen.getByText(/Buka aplikasi e-wallet/)).toBeInTheDocument();
    expect(screen.getByText(/Scan kode QR di atas/)).toBeInTheDocument();
  });

  it("should format date correctly", () => {
    render(<QRISPayment {...defaultProps} />);

    // Should show formatted date
    expect(screen.getByText(/21 Jan 2025/)).toBeInTheDocument();
  });

  it("should have download button", () => {
    render(<QRISPayment {...defaultProps} />);

    expect(screen.getByText("Unduh QRIS")).toBeInTheDocument();
  });

  it("should have correct container styling", () => {
    const { container } = render(<QRISPayment {...defaultProps} />);

    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass("space-y-4");
  });

  it("should show loading placeholder initially", () => {
    render(<QRISPayment {...defaultProps} />);

    // Check for loading state with animate-pulse
    const loadingPlaceholder = document.querySelector(".animate-pulse");
    expect(loadingPlaceholder).toBeInTheDocument();
  });

  it("should display ID Pesanan label", () => {
    render(<QRISPayment {...defaultProps} />);

    expect(screen.getByText("ID Pesanan")).toBeInTheDocument();
  });

  it("should display Total Pembayaran label", () => {
    render(<QRISPayment {...defaultProps} />);

    expect(screen.getByText("Total Pembayaran")).toBeInTheDocument();
  });
});
