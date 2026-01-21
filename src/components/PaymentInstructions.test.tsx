import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PaymentInstructions from "./PaymentInstructions";

// Mock components
vi.mock("./QRISPayment", () => ({
  default: ({ amount }: { amount: number }) => (
    <div data-testid="qris-payment">QRIS: {amount}</div>
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

// Mock Date
const mockDate = new Date("2025-01-21T10:00:00Z");
vi.useFakeTimers();
vi.setSystemTime(mockDate);

describe("PaymentInstructions", () => {
  const defaultProps = {
    paymentMethod: "bca",
    total: 150000,
    createdAt: "2025-01-21T09:00:00Z", // 1 hour before current time
    orderId: "ORDER123",
  };

  beforeEach(() => {
    vi.clearAllMocks();
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
    expect(screen.getByText("QRIS: 150000")).toBeInTheDocument();
  });

  it("should render e-wallet payment for GoPay", () => {
    render(<PaymentInstructions {...defaultProps} paymentMethod="gopay" />);

    expect(screen.getByText("GoPay")).toBeInTheDocument();
    expect(screen.getByText("081234567890")).toBeInTheDocument();
  });

  it("should display order ID", () => {
    render(<PaymentInstructions {...defaultProps} />);

    expect(screen.getByText("ORDER123")).toBeInTheDocument();
  });

  it("should display formatted total amount", () => {
    render(<PaymentInstructions {...defaultProps} />);

    expect(screen.getByText("Rp 150.000")).toBeInTheDocument();
  });

  it("should show countdown timer", () => {
    render(<PaymentInstructions {...defaultProps} />);

    // Should show time remaining (1 hour from created time)
    expect(screen.getByText(/59:\d{2}/)).toBeInTheDocument(); // Around 59 minutes
  });

  it("should handle expired payment", async () => {
    const onExpired = vi.fn();

    // Set time to after expiry
    const expiredTime = new Date("2025-01-21T10:30:00Z"); // 30 minutes after expiry
    vi.setSystemTime(expiredTime);

    render(<PaymentInstructions {...defaultProps} onExpired={onExpired} />);

    await waitFor(() => {
      expect(onExpired).toHaveBeenCalled();
    });
  });

  it("should allow copying account number", () => {
    // Mock clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });

    render(<PaymentInstructions {...defaultProps} />);

    const copyButton = screen.getByRole("button", { name: /copy/i });
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("1234567890");
  });

  it("should show payment expiry warning", () => {
    render(<PaymentInstructions {...defaultProps} />);

    expect(
      screen.getByText(/Complete your payment within/),
    ).toBeInTheDocument();
  });

  it("should render different icons for different payment methods", () => {
    render(<PaymentInstructions {...defaultProps} />);

    const icon = document.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("should handle invalid payment method gracefully", () => {
    render(<PaymentInstructions {...defaultProps} paymentMethod="invalid" />);

    // Should not crash and show some default content
    expect(screen.getByText("ORDER123")).toBeInTheDocument();
  });

  it("should update timer every second", async () => {
    render(<PaymentInstructions {...defaultProps} />);

    const initialTime = screen.getByText(/59:\d{2}/).textContent;

    // Advance time by 1 second
    vi.advanceTimersByTime(1000);

    await waitFor(() => {
      const updatedTime = screen.getByText(/59:\d{2}/).textContent;
      expect(updatedTime).not.toBe(initialTime);
    });
  });
});
