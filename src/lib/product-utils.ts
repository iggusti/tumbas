import { products, Product } from "@/data/products";

export const getProductById = (productId: string): Product | undefined => {
  return products.find((p) => p.id === productId);
};

export const getProductsByIds = (productIds: string[]): Product[] => {
  return productIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);
};
