import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  showBrand?: boolean;
  showBackButton?: boolean;
  variant?: "default" | "simple";
}

const PageHeader = ({
  title,
  showBrand = true,
  showBackButton = true,
  variant = "default",
}: PageHeaderProps) => {
  const navigate = useNavigate();

  if (variant === "simple") {
    return (
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4"
      >
        <h1 className="font-display text-2xl font-bold text-foreground">
          {title}
        </h1>
      </motion.header>
    );
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 bg-background px-4 py-3 flex items-center gap-3"
    >
      {showBackButton && (
        <Link
          to=""
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className="p-1"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </Link>
      )}
      <div>
        {showBrand && (
          <span className="text-muted-foreground text-sm">tumbas.</span>
        )}
        <h1 className="font-display text-lg font-semibold text-foreground -mt-1">
          {title}
        </h1>
      </div>
    </motion.header>
  );
};

export default PageHeader;
