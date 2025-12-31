import { ArrowLeft, Search, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showWishlist?: boolean;
  transparent?: boolean;
}

const Header = ({
  title,
  showBack = false,
  showSearch = false,
  showWishlist = false,
  transparent = false,
}: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`sticky top-0 z-50 flex items-center justify-between h-14 px-4 ${
        transparent ? "bg-transparent" : "bg-background/80 backdrop-blur-md"
      }`}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-secondary transition-colors"
          >
            <ArrowLeft size={20} className="text-foreground" />
          </button>
        )}
        {title && (
          <h1 className="font-display text-lg font-semibold text-foreground">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        {showSearch && (
          <button className="p-2 rounded-full hover:bg-secondary transition-colors">
            <Search size={20} className="text-foreground" />
          </button>
        )}
        {showWishlist && (
          <button className="p-2 rounded-full hover:bg-secondary transition-colors">
            <Heart size={20} className="text-foreground" />
          </button>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
