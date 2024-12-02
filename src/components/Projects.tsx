import { motion } from "framer-motion";
import { ExternalLink, FolderGit2 } from "lucide-react";
import { PROJECTS } from "../constants";
import SectionTitle from "./ui/SectionTitle";
import { memo } from "react";
import * as Icons from "lucide-react";
import { getIconColor } from "../utils/colors";

const ProjectCard = memo(({ project, index }: { project: typeof PROJECTS[0]; index: number }) => {
  const IconComponent = (Icons as any)[project.icon.charAt(0).toUpperCase() + project.icon.slice(1)];
  const iconColor = getIconColor(project.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-soft hover:shadow-lg transition-all duration-300 
        border-2 border-slate-700 hover:border-slate-600"
    >
      <div className="flex items-center justify-between mb-6">
        <div className={`p-3 ${iconColor.bgColor} rounded-xl border ${iconColor.borderColor}`}>
          <div className={`${iconColor.textColor} ${iconColor.hoverColor} transition-colors duration-300`}>
            {IconComponent && <IconComponent className="w-6 h-6" />}
          </div>
        </div>
        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary-400 transition-colors duration-300" />
      </div>
      <h3 className="text-xl font-semibold mb-4 text-white">
        {project.title}
      </h3>
      <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className={`px-4 py-1.5 ${iconColor.bgColor} ${iconColor.textColor} rounded-full text-sm font-medium
              border ${iconColor.borderColor}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Featured Projects"
          subtitle="Showcase of machine learning applications"
          icon={FolderGit2}
          iconColor="text-indigo-400"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}