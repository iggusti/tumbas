import { z } from "zod";

// Address validation schema
export const addressSchema = z.object({
  label: z.string().min(1, "Label alamat wajib diisi").max(50, "Label maksimal 50 karakter"),
  name: z.string().min(2, "Nama minimal 2 karakter").max(100, "Nama maksimal 100 karakter"),
  phone: z.string()
    .min(10, "Nomor telepon minimal 10 digit")
    .max(15, "Nomor telepon maksimal 15 digit")
    .regex(/^[\d+\-\s]+$/, "Format nomor telepon tidak valid"),
  address: z.string().min(10, "Alamat minimal 10 karakter").max(500, "Alamat maksimal 500 karakter"),
  icon: z.enum(["home", "office", "other"]),
  isDefault: z.boolean(),
});

// Credit card validation schema
export const creditCardSchema = z.object({
  cardNumber: z.string()
    .min(19, "Nomor kartu harus 16 digit")
    .regex(/^[\d\s]+$/, "Nomor kartu hanya boleh berisi angka"),
  cardHolder: z.string()
    .min(2, "Nama pemegang kartu minimal 2 karakter")
    .max(100, "Nama pemegang kartu maksimal 100 karakter")
    .regex(/^[A-Z\s]+$/, "Nama harus huruf kapital"),
  expiry: z.string()
    .length(5, "Format masa berlaku: MM/YY")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format masa berlaku tidak valid"),
  cvv: z.string()
    .min(3, "CVV minimal 3 digit")
    .max(4, "CVV maksimal 4 digit")
    .regex(/^\d+$/, "CVV hanya boleh berisi angka"),
});

// Profile validation schema
export const profileSchema = z.object({
  fullName: z.string()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  email: z.string()
    .email("Format email tidak valid")
    .max(255, "Email maksimal 255 karakter"),
  phone: z.string()
    .min(10, "Nomor telepon minimal 10 digit")
    .max(15, "Nomor telepon maksimal 15 digit")
    .regex(/^[\d+\-\s]+$/, "Format nomor telepon tidak valid"),
});

// Password validation schema
export const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Password saat ini wajib diisi"),
  newPassword: z.string()
    .min(8, "Password baru minimal 8 karakter")
    .max(100, "Password maksimal 100 karakter"),
  confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Konfirmasi password tidak cocok",
  path: ["confirmPassword"],
});

// Seller message validation schema
export const sellerMessageSchema = z.object({
  message: z.string()
    .max(500, "Pesan maksimal 500 karakter")
    .optional(),
});

export type AddressFormData = z.infer<typeof addressSchema>;
export type CreditCardFormData = z.infer<typeof creditCardSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;
export type SellerMessageFormData = z.infer<typeof sellerMessageSchema>;
