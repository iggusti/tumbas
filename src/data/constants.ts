import { CheckCircle, Clock, Package, Truck, XCircle, Zap } from "lucide-react";

export const SHIPPING_OPTIONS = [
  {
    id: "regular",
    name: "Regular",
    price: 18000,
    eta: "3-5 hari",
    icon: Package,
  },
  {
    id: "express",
    name: "Express",
    price: 35000,
    eta: "1-2 hari",
    icon: Truck,
  },
  {
    id: "same-day",
    name: "Same Day",
    price: 50000,
    eta: "Hari ini",
    icon: Zap,
  },
] as const;

export type ShippingOption = (typeof SHIPPING_OPTIONS)[number];

export const ORDER_STATUS_CONFIG = {
  pending: {
    label: "Menunggu Pembayaran",
    shortLabel: "Menunggu",
    icon: Clock,
    color: "text-amber-600 bg-amber-100",
  },
  processing: {
    label: "Sedang Diproses",
    shortLabel: "Diproses",
    icon: Clock,
    color: "text-amber-600 bg-amber-100",
  },
  shipped: {
    label: "Dalam Pengiriman",
    shortLabel: "Dikirim",
    icon: Truck,
    color: "text-blue-600 bg-blue-100",
  },
  delivered: {
    label: "Diterima",
    shortLabel: "Diterima",
    icon: CheckCircle,
    color: "text-green-600 bg-green-100",
  },
  cancelled: {
    label: "Dibatalkan",
    shortLabel: "Dibatalkan",
    icon: XCircle,
    color: "text-red-600 bg-red-100",
  },
} as const;

export type OrderStatus = keyof typeof ORDER_STATUS_CONFIG;
