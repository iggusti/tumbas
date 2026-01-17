import NavLink from "@/components/NavLink";
import PageHeader from "@/components/PageHeader";
import aboutShop from "@/assets/about-shop.png";
import { motion } from "framer-motion";

const AboutShopPage = () => {
  return (
    <div className="min-h-screen bg-background max-w-[480px] mx-auto relative">
      {/* Hero with Background - Fixed */}
      <div className="fixed inset-0 z-0 max-w-[480px] mx-auto left-0 right-0">
        <img
          src={aboutShop}
          alt="Batik Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" />
      </div>

      {/* Container */}
      <div className="fixed inset-x-0 top-0 z-20 mx-auto w-full max-w-[480px]">
        {/* Header */}
        <PageHeader title="About Shop" isAboutPage={true} />
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
              <strong className="text-foreground">Tumbas</strong> adalah
              platform digital yang hadir sebagai jembatan modern untuk
              memadukan dan melestarikan batik khas kekayaan. Nama Tumbas, yang
              dalam Bahasa Jawa berarti "membeli," diolah untuk menggambarkan
              semangat dalam mendukung produk lokal sekaligus mempromosikan
              aksesi masyarakat terhadap salah satu budaya Indonesia, khususnya
              batik pesisir (batanogan).
            </p>

            <p>
              Berbeda dari diajarkan oleh banyak kalangan pada sisi skill,
              Tumbas juga didedikasikan untuk tidak sekedar berfokus membuat
              budaya yang berkembang dalam setiap daerah lokal. Tumbas
              memungkinkan dan pengrajin batik lokal dari berbagai desa di
              Indonesia untuk mengenalkan produk-produk terbaik tanpa perlu
              akses internet tradisional, mulai dari pengendalian hingga
              pemasaran darat.
            </p>

            <p>
              Melalui Tumbas, pengguna tidak hanya bisa membeli batik dengan
              aman, praktis, tetapi juga dapat memahami filosofi motif, mengenal
              asal daerah, serta melalui proses pembuatannya secara transparan.
              Kami percaya bahwa batik bukan sekadar kain, melainkan warisan
              budaya yang perlu dijaga, dan melalui pendekatan berbasis Tumbas
              ingin berkontribusi agar pelestarian batik menjadi mudah dan
              inklusif.
            </p>

            <p>
              Dengan mengusung prinsip keberlanjutan dan pemberdayaan UMKM,
              Tumbas berkomitmen menjadi rumah digital bagi pengrajin batik di
              seluruh Indonesia.
            </p>
          </div>
        </div>
      </motion.div>

      <NavLink />
    </div>
  );
};

export default AboutShopPage;
