import { motion } from "framer-motion";
import { SKILLS } from "../constants";
import SectionTitle from "./ui/SectionTitle";
import { memo } from "react";
import * as Icons from "lucide-react";
import { Lightbulb } from "lucide-react";
import { getIconColor } from "../utils/colors";

const SkillCard = memo(({ skill, index }: { skill: typeof SKILLS[0]; index: number }) => {
  const IconComponent = (Icons as any)[skill.icon.charAt(0).toUpperCase() + skill.icon.slice(1)];
  const iconColor = getIconColor(skill.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-soft hover:shadow-lg transition-all duration-300
        border-2 border-slate-700 hover:border-slate-600"
    >
      <div className={`p-3 ${iconColor.bgColor} rounded-xl w-fit mb-6 border ${iconColor.borderColor}`}>
        <div className={`${iconColor.textColor} ${iconColor.hoverColor} transition-colors duration-300`}>
          {IconComponent && <IconComponent className="w-6 h-6" />}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{skill.title}</h3>
      <p className="text-gray-300 leading-relaxed">{skill.description}</p>
    </motion.div>
  );
});

SkillCard.displayName = "SkillCard";

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Skills & Expertise"
          subtitle="Comprehensive machine learning capabilities"
          icon={Lightbulb}
          iconColor="text-amber-400"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {SKILLS.map((skill, index) => (
            <SkillCard key={skill.title} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}