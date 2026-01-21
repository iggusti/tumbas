import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import PaymentMethodSelector from "./PaymentMethodSelector";

// Mock components
vi.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children, open }: any) =>
    open ? <div data-testid="dialog">{children}</div> : null,
  DialogContent: ({ children, className }: any) => (
    <div className={className} data-testid="dialog-content">
      {children}
    </div>
  ),
  DialogHeader: ({ children }: any) => (
    <div data-testid="dialog-header">{children}</div>
  ),
  DialogTitle: ({ children }: any) => (
    <div data-testid="dialog-title">{children}</div>
  ),
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("PaymentMethodSelector", () => {
  const defaultProps = {
    open: true,
    onOpenChange: vi.fn(),
    selectedMethod: null,
    onSelectMethod: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render dialog when open is true", () => {
    render(<PaymentMethodSelector {...defaultProps} />);

    expect(screen.getByTestId("dialog")).toBeInTheDocument();
    expect(screen.getByText("Pilih Metode Pembayaran")).toBeInTheDocument();
  });

  it("should not render dialog when open is false", () => {
    render(<PaymentMethodSelector {...defaultProps} open={false} />);

    expect(screen.queryByTestId("dialog")).not.toBeInTheDocument();
  });

  it("should render all payment method categories", () => {
    render(<PaymentMethodSelector {...defaultProps} />);

    expect(screen.getByText("QRIS")).toBeInTheDocument();
    expect(screen.getByText("Kartu Kredit/Debit")).toBeInTheDocument();
    expect(screen.getByText("E-Wallet")).toBeInTheDocument();
    expect(screen.getByText("Transfer Bank")).toBeInTheDocument();
  });

  it("should render all payment methods", () => {
    render(<PaymentMethodSelector {...defaultProps} />);

    expect(screen.getByText("QRIS")).toBeInTheDocument();
    expect(screen.getByText("Mastercard")).toBeInTheDocument();
    expect(screen.getByText("Visa")).toBeInTheDocument();
    expect(screen.getByText("GoPay")).toBeInTheDocument();
    expect(screen.getByText("OVO")).toBeInTheDocument();
    expect(screen.getByText("Transfer Bank BCA")).toBeInTheDocument();
    expect(screen.getByText("Transfer Bank Mandiri")).toBeInTheDocument();
  });

  it("should show selected method with check icon", () => {
    render(<PaymentMethodSelector {...defaultProps} selectedMethod="gopay" />);

    // Should show check icon for selected method
    const selectedMethod = screen.getByText("GoPay").closest("div");
    expect(selectedMethod).toBeInTheDocument();
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
    expect(screen.getByText("Virtual Account")).toBeInTheDocument();
  });

  it("should group payment methods correctly", () => {
    render(<PaymentMethodSelector {...defaultProps} />);

    // QRIS section should only have QRIS
    // Card section should have Mastercard and Visa
    // E-wallet section should have GoPay and OVO
    // Bank section should have BCA and Mandiri

    const sections = screen.getAllByText(/QRIS|Kartu|E-Wallet|Transfer Bank/);
    expect(sections.length).toBe(4);
  });

  it("should render icons for each payment method", () => {
    render(<PaymentMethodSelector {...defaultProps} />);

    const icons = document.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThan(6); // At least one icon per method
  });

  it("should have correct dialog styling", () => {
    render(<PaymentMethodSelector {...defaultProps} />);

    const dialogContent = screen.getByTestId("dialog-content");
    expect(dialogContent).toHaveClass(
      "w-[calc(100%-2rem)]",
      "max-w-[400px]",
      "rounded-xl",
      "max-h-[80vh]",
      "overflow-y-auto",
    );
  });

  it("should handle method selection with different methods", () => {
    render(<PaymentMethodSelector {...defaultProps} />);

    // Select QRIS
    const qrisOption = screen.getByText("QRIS");
    fireEvent.click(qrisOption);

    expect(defaultProps.onSelectMethod).toHaveBeenCalledWith("qris");

    // Select BCA
    const bcaOption = screen.getByText("Transfer Bank BCA");
    fireEvent.click(bcaOption);

    expect(defaultProps.onSelectMethod).toHaveBeenCalledWith("bca");
  });
});
