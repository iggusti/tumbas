import { motion } from "framer-motion";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header title="tumbas." showBack />

      <main className="page-container">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-4xl font-bold text-foreground leading-tight mb-2">
            About<br />Shop
          </h1>
          <div className="w-12 h-1 bg-primary rounded-full" />
        </motion.section>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <p className="text-muted-foreground leading-relaxed">
            Tumbas adalah marketplace batik premium yang menghubungkan pengrajin 
            batik tradisional Indonesia dengan pecinta seni batik di seluruh dunia. 
            Kami berkomitmen melestarikan warisan budaya Indonesia melalui batik 
            berkualitas tinggi.
          </p>

          <div className="bg-card rounded-2xl p-6 shadow-soft">
            <h3 className="font-display text-lg font-semibold text-foreground mb-3">
              Our Mission
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Memberdayakan pengrajin batik lokal dengan menyediakan platform untuk 
              menjangkau pasar yang lebih luas, sambil memastikan keaslian dan 
              kualitas setiap produk batik yang kami tawarkan.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-secondary rounded-2xl p-4 text-center"
            >
              <div className="text-3xl font-display font-bold text-primary mb-1">
                500+
              </div>
              <div className="text-sm text-muted-foreground">
                Artisan Partners
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
              className="bg-secondary rounded-2xl p-4 text-center"
            >
              <div className="text-3xl font-display font-bold text-primary mb-1">
                50K+
              </div>
              <div className="text-sm text-muted-foreground">
                Happy Customers
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-secondary rounded-2xl p-4 text-center"
            >
              <div className="text-3xl font-display font-bold text-primary mb-1">
                15+
              </div>
              <div className="text-sm text-muted-foreground">
                Regions Covered
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 }}
              className="bg-secondary rounded-2xl p-4 text-center"
            >
              <div className="text-3xl font-display font-bold text-primary mb-1">
                100%
              </div>
              <div className="text-sm text-muted-foreground">
                Authentic Batik
              </div>
            </motion.div>
          </div>

          {/* About Batik Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              About Batik<br />
              <span className="text-primary italic">Lestamaya</span>
            </h2>
            
            <div className="bg-card rounded-2xl p-6 shadow-soft space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Batik Indonesia
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Batik adalah teknik pewarnaan kain dengan menggunakan lilin 
                  (malam) sebagai penutup untuk menghasilkan motif tertentu. 
                  UNESCO telah mengakui batik Indonesia sebagai Warisan Budaya 
                  Tak Benda sejak tahun 2009.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Jenis-jenis Batik
                </h4>
                <ul className="text-muted-foreground text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>
                      <strong>Batik Tulis:</strong> Dibuat dengan tangan menggunakan 
                      canting, proses bisa memakan waktu berminggu-minggu.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>
                      <strong>Batik Cap:</strong> Menggunakan cap tembaga untuk 
                      menciptakan motif, lebih cepat dari batik tulis.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>
                      <strong>Batik Pesisir:</strong> Batik dari daerah pesisir 
                      dengan warna-warna cerah dan pengaruh budaya asing.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default AboutPage;
