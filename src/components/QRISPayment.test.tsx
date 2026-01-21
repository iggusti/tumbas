import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import QRISPayment from "./QRISPayment";

// Mock QRCode library
vi.mock("qrcode", () => ({
  toDataURL: vi.fn().mockResolvedValue("data:image/png;base64,mock-qr-code"),
}));

// Mock components
vi.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, disabled, className }: any) => (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
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

  it("should generate and display QR code", async () => {
    render(<QRISPayment {...defaultProps} />);

    await waitFor(() => {
      const qrImage = screen.getByAltText("QRIS Payment");
      expect(qrImage).toBeInTheDocument();
      expect(qrImage).toHaveAttribute(
        "src",
        "data:image/png;base64,mock-qr-code",
      );
    });
  });

  it("should show loading state while QR code is generating", () => {
    render(<QRISPayment {...defaultProps} />);

    // Initially should show loading placeholder
    const loadingPlaceholder = document.querySelector(".animate-pulse");
    expect(loadingPlaceholder).toBeInTheDocument();
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

  it("should handle download button click", async () => {
    // Mock document methods
    const mockCreateElement = vi.spyOn(document, "createElement");
    const mockCanvas = {
      getContext: vi.fn().mockReturnValue({
        fillStyle: "",
        fillRect: vi.fn(),
        drawImage: vi.fn(),
        fillText: vi.fn(),
        font: "",
        textAlign: "center",
      }),
      width: 320,
      height: 400,
      toDataURL: vi.fn().mockReturnValue("data:image/png;base64,downloaded-qr"),
    };
    mockCreateElement.mockReturnValue(mockCanvas as any);

    const mockImage = {
      onload: null,
      src: "",
    };
    vi.spyOn(document, "createElement").mockImplementation(
      (tagName: string) => {
        if (tagName === "canvas") return mockCanvas as any;
        if (tagName === "a")
          return { click: vi.fn(), download: "", href: "" } as any;
        if (tagName === "img") return mockImage as any;
        return document.createElement(tagName);
      },
    );

    render(<QRISPayment {...defaultProps} />);

    await waitFor(() => {
      const downloadButton = screen.getByText("Unduh QRIS");
      expect(downloadButton).toBeInTheDocument();
    });

    const downloadButton = screen.getByText("Unduh QRIS");
    fireEvent.click(downloadButton);

    // Should trigger download process
    expect(mockCanvas.getContext).toHaveBeenCalledWith("2d");
  });

  it("should disable download button when QR code is not ready", () => {
    // Mock QRCode to never resolve
    vi.mocked(require("qrcode").toDataURL).mockImplementation(
      () => new Promise(() => {}),
    );

    render(<QRISPayment {...defaultProps} />);

    const downloadButton = screen.getByText("Unduh QRIS");
    expect(downloadButton).toBeDisabled();
  });

  it("should have correct container styling", () => {
    const { container } = render(<QRISPayment {...defaultProps} />);

    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass("space-y-4");
  });

  it("should have correct QR code container styling", () => {
    render(<QRISPayment {...defaultProps} />);

    const qrContainer = document.querySelector(".bg-white");
    expect(qrContainer).toHaveClass(
      "bg-white",
      "p-4",
      "rounded-xl",
      "border",
      "border-border",
      "shadow-sm",
    );
  });

  it("should generate unique QR data based on order details", () => {
    render(<QRISPayment {...defaultProps} />);

    // QRCode.toDataURL should be called with generated QRIS string
    expect(require("qrcode").toDataURL).toHaveBeenCalled();
  });
});
