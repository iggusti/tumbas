import { Link, useNavigate } from "react-router-dom";

import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  isAboutPage?: boolean;
}

const PageHeader = ({ title, isAboutPage = false }: PageHeaderProps) => {
  const navigate = useNavigate();

  if (isAboutPage) {
    return (
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 px-4 py-4"
      >
        <Link
          to=""
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className="p-1"
        >
          <ArrowLeft size={20} className="text-white" />
        </Link>
        <span className="text-white/80 text-sm">tumbas.</span>
      </motion.header>
    );
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 bg-background px-4 py-3 flex items-center gap-3"
    >
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
      <div>
        <span className="text-muted-foreground text-sm">tumbas.</span>
        <h1 className="font-display text-lg font-semibold text-foreground -mt-1">
          {title}
        </h1>
      </div>
    </motion.header>
  );
};

export default PageHeader;
