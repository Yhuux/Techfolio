import { memo } from 'react';
import { ExternalLink } from 'lucide-react';
import { getIcon } from '../utils/icons';
import type { Project } from '../types';
import { LazyMotion } from './ui/LazyMotion';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = memo(function ProjectCard({ project, index }: ProjectCardProps) {
  const IconComponent = getIcon(project.icon);

  return (
    <LazyMotion
      animation="fadeUp"
      delay={index * 0.1}
      className="group card-base"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="icon-container text-primary-400 group-hover:text-secondary-400 transition-colors duration-300">
          <IconComponent className="w-6 h-6" />
        </div>
        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary-400 transition-colors duration-300" />
      </div>
      <h3 className="text-xl font-semibold mb-4 text-white">
        {project.title}
      </h3>
      <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </LazyMotion>
  );
});