import { ArrowLeft } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AboutBatikIndramayuPage = () => {
  return (
    <div className="min-h-screen bg-background max-w-[480px] mx-auto relative">
      {/* Hero with Background - Fixed */}
      <div className="fixed inset-0 z-0 max-w-[480px] mx-auto left-0 right-0">
        <img
          src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
          alt="Batik Indramayu Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Container */}
      <div className="fixed inset-x-0 top-0 z-20 mx-auto w-full max-w-[480px]">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-4"
        >
          <Link to="/" className="p-1">
            <ArrowLeft size={20} className="text-white" />
          </Link>
          <span className="text-white/80 text-sm">tumbas.</span>
        </motion.header>

        {/* Title */}
        <div className="px-6 pt-4">
          <h1 className="font-display text-4xl font-bold text-white leading-tight">
            About
            <br />
            Batik
            <br />
            Indramayu
          </h1>
        </div>
      </div>

      {/* Draggable Content Sheet */}
      <motion.div
        initial={{ y: "60%" }}
        animate={{ y: "45%" }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 300 }}
        dragElastic={0.1}
        className="fixed inset-x-0 bottom-0 z-40 bg-card rounded-t-3xl min-h-[70vh] shadow-2xl max-w-[480px] mx-auto"
        style={{ touchAction: "none" }}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-4">
          <div className="w-12 h-1 bg-muted-foreground/30 rounded-full cursor-pointer" />
        </div>

        {/* Content */}
        <div className="px-6 pb-32 overflow-y-auto max-h-[60vh]">
          <div className="space-y-4 text-foreground/80 text-sm leading-relaxed">
            <p>
              <strong className="text-foreground">Batik Indramayu</strong> juga
              dikenal dengan nama Batik Pesisiran, merupakan salah satu kekhasan
              budaya pesisir utara Pulau Jawa yang lahir dari seni batik
              tersendiri. Berkat asal Kabupaten Indramayu, batik ini terkenal
              dengan coraknya yang lugas, penuh warna, dan menggambarkan
              kehidupan masyarakat pesisir, alam sekitar, serta nilai-nilai kota
              yang diwariskan turun temurun.
            </p>

            <p>
              Salah satu{" "}
              <strong className="text-foreground">
                keunikan Batik Indramayu
              </strong>{" "}
              terletak pada proses pembuatannya yang dikerjakan secara manual
              (batik tulis), dengan gaya yang lebih bebas dan ekspresif
              dibandingkan batik dari daerah lain. Motif-motifnya banyak
              terinspirasi dari unsur laut, tumbuhan, keseluruhan, hingga cerita
              rakyat. Beberapa motif ikonik antara lain Kapal Kandas, Khupu
              Sewu, Karang Jahe, dan Kembang Gunda, yang masing-masing memiliki
              makna filosofi dan sejarah mendalam.
            </p>

            <p>
              Tidak hanya kaya secara visual, Batik Indramayu juga
              merepresentasikan kreativitas masyarakat pesisir yang tangguh,
              terbuka, dan berkarakter. Corak warna yang berani dan garis-garis
              yang tegas menunjukkan keberanian berekspresi yang menjadi
              karakter utama batik ini. Keaslian dan nilai budaya itulah yang
              menjadikan batik.
            </p>

            <p>
              Melalui Tumbas, kami berkomitmen untuk terus melestarikan dan
              memperkenalkan keindahan Batik Indramayu ke seluruh Indonesia dan
              dunia. Setiap helai kain yang kami hadirkan adalah hasil karya
              pengrajin lokal yang penuh dedikasi.
            </p>
          </div>
        </div>
      </motion.div>

      <BottomNavigation />
    </div>
  );
};

export default AboutBatikIndramayuPage;
