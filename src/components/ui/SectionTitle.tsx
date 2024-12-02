import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SectionTitleProps {
  title: string;
  subtitle: string;
  icon?: LucideIcon;
  iconColor?: string;
}

export default function SectionTitle({ title, subtitle, icon: Icon, iconColor = "text-primary-400" }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="text-center mb-12 md:mb-16"
    >
      {Icon && (
        <div className="flex justify-center mb-4">
          <Icon className={`w-10 h-10 ${iconColor}`} />
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
        {title}
      </h2>
      <p className="text-lg md:text-xl text-gray-300">{subtitle}</p>
    </motion.div>
  );
}