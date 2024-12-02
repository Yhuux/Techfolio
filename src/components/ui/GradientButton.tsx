import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GradientButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function GradientButton({ children, className = "", onClick }: GradientButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex items-center gap-3 px-10 py-5 rounded-xl font-medium text-white text-lg
        bg-gradient-to-r from-primary-600 to-secondary-600 shadow-soft hover:shadow-lg 
        transition-all duration-200 border border-primary-500/20 ${className}`}
    >
      {children}
    </motion.button>
  );
}