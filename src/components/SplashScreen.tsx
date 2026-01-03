import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  isVisible: boolean;
}

const SplashScreen = ({ isVisible }: SplashScreenProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <div className="flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              {/* Main T shape */}
              <svg
                width="80"
                height="100"
                viewBox="0 0 80 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Letter T stylized */}
                <path
                  d="M10 15 Q10 5, 25 5 L55 5 Q70 5, 70 15 L70 18 Q70 22, 55 22 L48 22 L48 85 Q48 95, 40 95 Q32 95, 32 85 L32 22 L25 22 Q10 22, 10 18 Z"
                  fill="hsl(195, 45%, 30%)"
                />
                {/* Decorative curl */}
                <path
                  d="M48 60 Q60 55, 62 70 Q64 82, 52 85"
                  stroke="hsl(195, 45%, 30%)"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              
              {/* Decorative star/flower */}
              <motion.div
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: 360, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute -top-2 -right-2"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="4" fill="hsl(40, 70%, 55%)" />
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <circle
                      key={i}
                      cx={12 + 7 * Math.cos((angle * Math.PI) / 180)}
                      cy={12 + 7 * Math.sin((angle * Math.PI) / 180)}
                      r="2"
                      fill="hsl(40, 70%, 55%)"
                    />
                  ))}
                </svg>
              </motion.div>
            </motion.div>

            {/* Brand name */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-6 font-display text-2xl font-semibold text-foreground tracking-wide"
            >
              tumbas.
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
