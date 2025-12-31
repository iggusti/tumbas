import { motion } from "framer-motion";

interface CategoryChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const CategoryChip = ({ label, isActive, onClick }: CategoryChipProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`category-chip whitespace-nowrap ${isActive ? "active" : ""}`}
    >
      {label}
    </motion.button>
  );
};

export default CategoryChip;
