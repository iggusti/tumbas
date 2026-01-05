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
      "Premium quality fabric that is soft and comfortable. This motif depicts a dancing peacock or 'ngibing', a Javanese word that means dancing performed at traditional ceremonies. The intricate details showcase the masterful craftsmanship of Indramayu artisans who have passed down their skills through generations.",
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
    category: "Batik Pesisir",
    description:
      "Cloud pattern from Cirebon representing calmness and patience.",
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
    category: "Batik Cap",
    description:
      "The kawung pattern represents the fruit of the aren palm, symbolizing hope and purity.",
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
    category: "Batik Tulis",
    description:
      "One of the oldest batik patterns, Parang Rusak was once exclusive to Javanese royalty. The diagonal lines represent waves crashing against rocks, symbolizing power and perseverance.",
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
      "Truntum means to bloom again. This pattern symbolizes eternal love and guidance, traditionally worn by parents during wedding ceremonies.",
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
    category: "Batik Tulis",
    description:
      "Traditional brown-toned batik representing wisdom and maturity.",
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
      "Sidomukti represents prosperity and noble status. Often worn during important ceremonies.",
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
    category: "Batik Tulis",
    description:
      "The diagonal rain pattern symbolizes fertility and continuous blessings from above.",
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
      "Featuring the mythical Garuda bird, symbolizing strength, courage, and noble values.",
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
    category: "Batik Tulis",
    description:
      "Double ikat batik from Bali, believed to protect the wearer from evil and illness. Extremely rare and valuable.",
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
      "Royal palace batik featuring exclusive motifs once reserved only for the Sultan and his family.",
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
    category: "Batik Tulis",
    description:
      "Named after the legendary warrior, this pattern symbolizes bravery and heroism.",
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
      "Featuring wings of Garuda, this pattern was exclusive to Javanese royalty in ancient times.",
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
    category: "Batik Tulis",
    description:
      "The largest parang pattern, reserved for royalty. Represents immense power and leadership.",
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
