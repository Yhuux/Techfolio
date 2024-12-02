import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  title: string;
  to: string;
  icon: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  icon: string;
}

export interface Skill {
  icon: string;
  title: string;
  description: string;
}

export interface AnimationProps {
  initial?: Record<string, any>;
  animate?: Record<string, any>;
  transition?: Record<string, any>;
  className?: string;
}

export interface IconProps {
  icon: LucideIcon;
  className?: string;
  size?: number;
}

export type { LucideIcon };

// Export common types
export * from './components';