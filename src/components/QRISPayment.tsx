import { Download, QrCode } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatters";
import { useToast } from "@/hooks/use-toast";

interface QRISPaymentProps {
  orderId: string;
  total: number;
  createdAt: string;
}

const QRISPayment = ({ orderId, total, createdAt }: QRISPaymentProps) => {
  const { toast } = useToast();
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate unique QRIS data based on order details
  const generateQRISData = () => {
    const orderDate = new Date(createdAt);
    const dateStr = orderDate.toISOString().split("T")[0].replace(/-/g, "");
    const timeStr = orderDate.toTimeString().split(" ")[0].replace(/:/g, "");
    
    // Create unique QRIS-like payload
    const payload = {
      orderId: orderId,
      amount: total,
      date: dateStr,
      time: timeStr,
      merchant: "TUMBAS-BATIK",
      timestamp: orderDate.getTime(),
    };

    // Create QRIS-compatible string (simplified format)
    const qrisString = `00020101021126570016ID.CO.TUMBAS.WWW0118${orderId}0215TUMBAS-BATIK52040000530336054${total.toString().length}${total}5802ID5913BATIK INDRMYU6013KOTA INDRMYU61054520462${dateStr}${timeStr}6304`;
    
    return qrisString;
  };

  useEffect(() => {
    const generateQR = async () => {
      try {
        const qrisData = generateQRISData();
        
        // Generate QR code as data URL
        const dataUrl = await QRCode.toDataURL(qrisData, {
          width: 280,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
          errorCorrectionLevel: "H",
        });
        
        setQrDataUrl(dataUrl);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQR();
  }, [orderId, total, createdAt]);

  const handleDownload = async () => {
    if (!qrDataUrl) return;

    try {
      // Create a canvas to add branding
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const qrImage = new Image();
      qrImage.onload = () => {
        // Set canvas size with padding for branding
        const padding = 40;
        const headerHeight = 60;
        const footerHeight = 80;
        canvas.width = qrImage.width + padding * 2;
        canvas.height = qrImage.height + padding * 2 + headerHeight + footerHeight;

        // White background
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Header - QRIS logo area
        ctx.fillStyle = "#8B4513";
        ctx.fillRect(0, 0, canvas.width, headerHeight);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 24px Arial";
        ctx.textAlign = "center";
        ctx.fillText("QRIS", canvas.width / 2, 40);

        // QR Code
        ctx.drawImage(qrImage, padding, headerHeight + padding / 2);

        // Footer - Order info
        const footerY = headerHeight + padding / 2 + qrImage.height + 20;
        ctx.fillStyle = "#333333";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        ctx.fillText("TUMBAS BATIK INDRAMAYU", canvas.width / 2, footerY);
        
        ctx.font = "12px Arial";
        ctx.fillStyle = "#666666";
        ctx.fillText(`Order: ${orderId}`, canvas.width / 2, footerY + 20);
        ctx.fillText(`Total: ${formatPrice(total)}`, canvas.width / 2, footerY + 38);

        // Download
        const link = document.createElement("a");
        link.download = `QRIS-${orderId}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();

        toast({
          title: "QRIS berhasil diunduh",
          description: "File QRIS telah tersimpan",
        });
      };
      qrImage.src = qrDataUrl;
    } catch (error) {
      console.error("Error downloading QR:", error);
      toast({
        title: "Gagal mengunduh",
        description: "Terjadi kesalahan saat mengunduh QRIS",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      {/* QRIS Header */}
      <div className="flex items-center justify-center gap-2 p-3 bg-primary/10 rounded-lg">
        <QrCode size={20} className="text-primary" />
        <span className="text-sm font-semibold text-primary">
          Bayar dengan QRIS
        </span>
      </div>

      {/* QR Code Display */}
      <div className="flex flex-col items-center">
        <div className="bg-white p-4 rounded-xl border border-border shadow-sm">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="QRIS Payment"
              className="w-56 h-56 object-contain"
            />
          ) : (
            <div className="w-56 h-56 bg-muted animate-pulse rounded-lg flex items-center justify-center">
              <QrCode size={48} className="text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Order Info */}
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">ID Pesanan</p>
          <p className="text-sm font-mono font-semibold text-foreground">
            {orderId}
          </p>
          <p className="text-xs text-muted-foreground mt-2">Tanggal Pesanan</p>
          <p className="text-sm font-medium text-foreground">
            {formatDate(createdAt)}
          </p>
          <p className="text-xs text-muted-foreground mt-2">Total Pembayaran</p>
          <p className="text-lg font-bold text-primary">{formatPrice(total)}</p>
        </div>

        {/* Download Button */}
        <Button
          onClick={handleDownload}
          className="mt-4 w-full"
          disabled={!qrDataUrl}
        >
          <Download size={16} className="mr-2" />
          Unduh QRIS
        </Button>
      </div>

      {/* Instructions */}
      <div className="text-xs text-muted-foreground space-y-1 p-3 bg-muted/50 rounded-lg">
        <p className="font-medium text-foreground">Cara Pembayaran:</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Buka aplikasi e-wallet atau mobile banking Anda</li>
          <li>Pilih menu Scan QR atau QRIS</li>
          <li>Scan kode QR di atas</li>
          <li>Periksa detail pembayaran dan nominal</li>
          <li>Konfirmasi dan masukkan PIN</li>
          <li>Simpan bukti pembayaran</li>
        </ol>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default QRISPayment;
