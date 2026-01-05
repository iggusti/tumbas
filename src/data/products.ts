import motifGodong from "@/assets/motif-godong.png";
import motifGodongCilik from "@/assets/motif-godong-cilik.png";
import motifGodongKembangTrompet from "@/assets/motif-godong-kembang-trompet.png";
import motifKapalSelam from "@/assets/motif-kapal-selam.png";
import motifManggaKapalIwakEtong from "@/assets/motif-mangga-kapal-iwak-etong.png";
import motifMerakMabur from "@/assets/motif-merak-mabur.png";
import motifMerakNgibing from "@/assets/motif-merak-ngibing.png";
import motifTapakSikilMerak from "@/assets/motif-tapak-sikil-merak.png";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  origin: string;
  material: string;
  dyeingProcess: string;
  isPremium?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Motif Kapal Selam",
    price: 2300000,
    originalPrice: 2450000,
    image: motifKapalSelam,
    category: "Batik Tulis",
    description:
      "A distinctive coastal motif inspired by maritime life, featuring stylized submarines and ocean elements. This design reflects the strong relationship between Indramayu society and the sea, expressed through detailed hand-drawn lines and refined craftsmanship.",
    origin: "Indramayu, West Java",
    material: "Premium cotton",
    dyeingProcess: "Natural Dye",
    isPremium: true,
  },
  {
    id: "2",
    name: "Motif Godong",
    price: 850000,
    originalPrice: 950000,
    image: motifGodong,
    category: "Batik Cap",
    description:
      "A simple yet meaningful leaf motif symbolizing growth, balance, and harmony with nature. Commonly found in Indramayu batik, this pattern represents everyday life and the closeness of the community to their natural surroundings.",
    origin: "Indramayu, West Java",
    material: "Cotton",
    dyeingProcess: "Natural Dye",
  },
  {
    id: "3",
    name: "Motif Merak Ngibing",
    price: 1450000,
    originalPrice: 1600000,
    image: motifMerakNgibing,
    category: "Batik Tulis",
    description:
      "Depicting a dancing peacock, this motif symbolizes beauty, confidence, and joy. The dynamic movement of the peacock reflects cultural celebrations and artistic expression rooted in Indramayu traditions.",
    origin: "Indramayu, West Java",
    material: "Cotton",
    dyeingProcess: "Synthetic Dye",
    isPremium: true,
  },
  {
    id: "4",
    name: "Motif Mangga, Kapal, Iwak Etong",
    price: 1200000,
    originalPrice: 1500000,
    image: motifManggaKapalIwakEtong,
    category: "Batik Cap",
    description:
      "A rich narrative motif combining mangoes, boats, and local fish, illustrating the agricultural and maritime identity of Indramayu. This design tells a story of livelihood, abundance, and coastal culture.",
    origin: "Indramayu, West Java",
    material: "Silk",
    dyeingProcess: "Natural Dye",
    isPremium: true,
  },
  {
    id: "5",
    name: "Motif Godong Cilik",
    price: 1890000,
    originalPrice: 2000000,
    image: motifGodongCilik,
    category: "Batik Tulis",
    description:
      "A delicate small-leaf pattern that conveys simplicity, refinement, and continuity. The repetitive leaf elements create a subtle elegance suitable for both formal and everyday wear.",
    origin: "Indramayu, West Java",
    material: "Premium cotton",
    dyeingProcess: "Natural Dye",
    isPremium: true,
  },
  {
    id: "6",
    name: "Motif Tapak Sikil Merak",
    price: 1100000,
    image: motifTapakSikilMerak,
    category: "Batik Cap",
    description:
      "Inspired by peacock footprints, this motif represents grace, direction, and life’s journey. Earthy tones enhance its traditional character while maintaining a strong visual identity.",
    origin: "Indramayu, West Java",
    material: "Cotton",
    dyeingProcess: "Natural Soga Dye",
    isPremium: true,
  },
  {
    id: "7",
    name: "Motif Godong Kembang Trompet",
    price: 1750000,
    image: motifGodongKembangTrompet,
    category: "Batik Tulis",
    description:
      "A harmonious combination of leaves and trumpet flowers symbolizing hope, vitality, and prosperity. This motif highlights the richness of coastal flora interpreted through expressive batik lines.",
    origin: "Indramayu, West Java",
    material: "Silk blend",
    dyeingProcess: "Natural Dye",
    isPremium: true,
  },
  {
    id: "8",
    name: "Motif Merak Mabur",
    price: 1950000,
    image: motifMerakMabur,
    category: "Batik Cap",
    description:
      "Featuring flying peacocks, this motif symbolizes freedom, ambition, and elegance. The composition reflects movement and openness, inspired by the vast coastal landscape of Indramayu.",
    origin: "Indramayu, West Java",
    material: "Silk",
    dyeingProcess: "Natural Dye",
    isPremium: true,
  },
  {
    id: "9",
    name: "Motif Kembang",
    price: 350000,
    image:
      "https://images.unsplash.com/photo-1543874835-ad7d64196a07?w=400&q=80",
    category: "Batik Tulis",
    description:
      "A floral motif representing beauty, freshness, and new beginnings. Flowers are a recurring element in Indramayu batik, symbolizing harmony between humans and nature.",
    origin: "Indramayu, West Java",
    material: "Silk",
    dyeingProcess: "Natural Dye",
  },
  {
    id: "10",
    name: "Motif Clengkuwek",
    price: 500000,
    image:
      "https://images.unsplash.com/photo-1761516659524-ca3a6a33f105?w=400&q=80",
    category: "Batik Cap",
    description:
      "An expressive motif inspired by local plants, reflecting resilience and adaptability. Its bold yet simple forms make it a distinctive representation of coastal batik aesthetics.",
    origin: "Indramayu, West Java",
    material: "Hand-spun cotton",
    dyeingProcess: "Natural Dye",
  },
  {
    id: "11",
    name: "Motif Bunder",
    price: 650000,
    image:
      "https://images.unsplash.com/photo-1761515315429-152455a20f21?w=400&q=80",
    category: "Batik Tulis",
    description:
      "A circular pattern symbolizing unity, continuity, and balance. The rounded shapes create a calm visual rhythm rooted in traditional Indramayu design philosophy.",
    origin: "Indramayu, West Java",
    material: "Fine silk",
    dyeingProcess: "Natural Dye",
  },
  {
    id: "12",
    name: "Motif Pringgondani",
    price: 870000,
    image:
      "https://images.unsplash.com/photo-1762111067760-1f0fc2aa2866?w=400&q=80",
    category: "Batik Cap",
    description:
      "A strong and bold motif inspired by folklore and heroic values. The pattern conveys courage, determination, and inner strength through firm and expressive lines.",
    origin: "Indramayu, West Java",
    material: "Cotton",
    dyeingProcess: "Natural Dye",
  },
  {
    id: "13",
    name: "Motif Sawat",
    price: 980000,
    image:
      "https://images.unsplash.com/photo-1761517099251-bc0e5963bf30?w=400&q=80",
    category: "Batik Tulis",
    description:
      "A dynamic wing-inspired motif symbolizing protection, power, and dignity. Its symmetrical form reflects authority while maintaining a graceful coastal batik character.",
    origin: "Indramayu, West Java",
    material: "Silk",
    dyeingProcess: "Natural Dye",
  },
  {
    id: "14",
    name: "Motif Totol Totol",
    price: 450000,
    image:
      "https://images.unsplash.com/photo-1762111067847-4d5bb602354e?w=400&q=80",
    category: "Batik Cap",
    description:
      "A dotted pattern that represents diversity, simplicity, and balance. The repeated dots create a timeless design commonly found in everyday Indramayu batik.",
    origin: "Indramayu, West Java",
    material: "Silk",
    dyeingProcess: "Natural Dye",
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
