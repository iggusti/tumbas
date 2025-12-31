export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  origin: string;
  material: string;
  isPremium?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Batik Motif Merak Ngibing",
    price: 850000,
    image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400&q=80",
    category: "Batik Tulis",
    description: "This motif depicts a dancing peacock or 'ngibing', a Javanese word that means dancing performed at traditional ceremonies.",
    origin: "Solo, Central Java",
    material: "Premium cotton, natural dye",
    isPremium: true,
  },
  {
    id: "2",
    name: "Batik Kawung Classic",
    price: 450000,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&q=80",
    category: "Batik Cap",
    description: "The kawung pattern represents the fruit of the aren palm, symbolizing hope and purity.",
    origin: "Yogyakarta",
    material: "Cotton, synthetic dye",
  },
  {
    id: "3",
    name: "Batik Parang Rusak",
    price: 1200000,
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80",
    category: "Batik Tulis",
    description: "One of the oldest batik patterns, Parang Rusak was once exclusive to Javanese royalty.",
    origin: "Surakarta",
    material: "Silk, natural dye",
    isPremium: true,
  },
  {
    id: "4",
    name: "Batik Mega Mendung",
    price: 650000,
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&q=80",
    category: "Batik Pesisir",
    description: "Cloud pattern from Cirebon representing calmness and patience.",
    origin: "Cirebon, West Java",
    material: "Cotton, natural dye",
  },
  {
    id: "5",
    name: "Batik Sogan Klasik",
    price: 780000,
    image: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=400&q=80",
    category: "Batik Tulis",
    description: "Traditional brown-toned batik representing wisdom and maturity.",
    origin: "Solo, Central Java",
    material: "Cotton, natural soga dye",
    isPremium: true,
  },
  {
    id: "6",
    name: "Batik Sekar Jagad",
    price: 520000,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    category: "Batik Cap",
    description: "Flower of the universe pattern symbolizing beauty and diversity.",
    origin: "Pekalongan",
    material: "Cotton, synthetic dye",
  },
];

export const categories = [
  "All",
  "Batik Tulis",
  "Batik Cap",
  "Batik Pesisir",
  "Premium",
  "Accessories",
];
