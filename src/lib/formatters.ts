export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatPriceShort = (price: number): string => {
  return `Rp ${price.toLocaleString("id-ID")}`;
};
