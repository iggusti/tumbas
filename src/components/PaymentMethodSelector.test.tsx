import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import PaymentMethodSelector from "./PaymentMethodSelector";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, onClick, ...props }: any) => (
      <button onClick={onClick} {...props}>{children}</button>
    ),
  },
}));

describe("PaymentMethodSelector", () => {
  const defaultProps = {
    open: true,
    onOpenChange: vi.fn(),
    selectedMethod: null as string | null,
    onSelectMethod: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render dialog when open is true", () => {
    render(<PaymentMethodSelector {...defaultProps} />);

    expect(screen.getByText("Pilih Metode Pembayaran")).toBeInTheDocument();
  });

  it("should not render dialog content when open is false", () => {
    render(<PaymentMethodSelector {...defaultProps} open={false} />);

    expect(screen.queryByText("Pilih Metode Pembayaran")).not.toBeInTheDocument();
  });

  it("should render all payment method categories", () => {
    render(<PaymentMethodSelector {...defaultProps} />);

    expect(screen.getByText("QRIS (Recommended)")).toBeInTheDocument();
    expect(screen.getByText("Kartu Debit/Kredit")).toBeInTheDocument();
    expect(screen.getByText("E-Wallet")).toBeInTheDocument();
    expect(screen.getByText("Transfer Bank")).toBeInTheDocument();
  });

  it("should render payment methods", () => {
    render(<PaymentMethodSelector {...defaultProps} />);

    expect(screen.getByText("QRIS")).toBeInTheDocument();
    expect(screen.getByText("Mastercard")).toBeInTheDocument();
    expect(screen.getByText("Visa")).toBeInTheDocument();
    expect(screen.getByText("GoPay")).toBeInTheDocument();
    expect(screen.getByText("OVO")).toBeInTheDocument();
    expect(screen.getByText("Transfer Bank BCA")).toBeInTheDocument();
    expect(screen.getByText("Transfer Bank Mandiri")).toBeInTheDocument();
  });

  it("should call onSelectMethod and onOpenChange when method is selected", () => {
    render(<PaymentMethodSelector {...defaultProps} />);

    const gopayOption = screen.getByText("GoPay");
    fireEvent.click(gopayOption);

    expect(defaultProps.onSelectMethod).toHaveBeenCalledWith("gopay");
    expect(defaultProps.onOpenChange).toHaveBeenCalledWith(false);
  });

  it("should display subtitles for payment methods", () => {
    render(<PaymentMethodSelector {...defaultProps} />);

    expect(
      screen.getByText("Scan QR dengan aplikasi apapun"),
    ).toBeInTheDocument();
    expect(screen.getByText("Saldo: Rp 250.000")).toBeInTheDocument();
    expect(screen.getAllByText("Virtual Account").length).toBeGreaterThan(0);
  });

  it("should call onSelectMethod with correct id for QRIS", () => {
    render(<PaymentMethodSelector {...defaultProps} />);

    const qrisOption = screen.getByText("QRIS");
    fireEvent.click(qrisOption);

    expect(defaultProps.onSelectMethod).toHaveBeenCalledWith("qris");
  });

  it("should call onSelectMethod with correct id for BCA", () => {
    render(<PaymentMethodSelector {...defaultProps} />);

    const bcaOption = screen.getByText("Transfer Bank BCA");
    fireEvent.click(bcaOption);

    expect(defaultProps.onSelectMethod).toHaveBeenCalledWith("bca");
  });
});
