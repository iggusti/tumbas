import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BottomNavigation from "@/components/BottomNavigation";

const AboutShopPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero with Background */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
            alt="Batik Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex items-center gap-3 px-4 py-4"
        >
          <Link to="/" className="p-1">
            <ArrowLeft size={20} className="text-white" />
          </Link>
          <span className="text-white/80 text-sm">tumbas.</span>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 px-6 pt-4 pb-24"
        >
          <h1 className="font-display text-4xl font-bold text-white mb-6">
            About<br />Shop
          </h1>

          <div className="space-y-4 text-white/90 text-sm leading-relaxed">
            <p>
              <strong>Tumbas</strong> adalah platform digital yang hadir sebagai 
              jembatan modern untuk memadukan dan melestarikan batik 
              khas kekayaan. Nama Tumbas, yang dalam Bahasa 
              Jawa berarti "membeli," diolah untuk menggambarkan 
              semangat dalam mendukung produk lokal sekaligus 
              mempromosikan aksesi masyarakat terhadap salah satu 
              budaya Indonesia, khususnya batik pesisir (batanogan).
            </p>

            <p>
              Berbeda dari diajarkan oleh banyak kalangan pada sisi 
              skill, Tumbas juga didedikasikan untuk tidak sekedar 
              berfokus membuat budaya yang berkembang dalam 
              setiap daerah lokal. Tumbas memungkinkan dan 
              pengrajin batik lokal dari berbagai desa di Indonesia 
              untuk mengenalkan produk-produk terbaik tanpa perlu 
              akses internet tradisional, mulai dari pengendalian hingga 
              pemasaran darat.
            </p>

            <p>
              Melalui Tumbas, pengguna tidak hanya bisa membeli 
              batik dengan aman, praktis, tetapi juga dapat memahami 
              filosofi motif, mengenal asal daerah, serta melalui proses 
              pembuatannya secara transparan. Kami percaya bahwa 
              batik bukan sekadar kain, melainkan warisan budaya 
              yang perlu dijaga, dan melalui pendekatan berbasis 
              Tumbas ingin berkontribusi agar pelestarian batik menjadi 
              mudah dan inklusif.
            </p>

            <p>
              Dengan mengusung prinsip keberlanjutan dan 
              pemberdayaan UMKM, Tumbas berkomitmen menjadi 
              rumah digital bagi pengrajin batik di seluruh Indonesia.
            </p>
          </div>
        </motion.div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default AboutShopPage;
