import { Brain, Lightbulb, Mail, Layout, Database, Cloud, Cpu, BarChart, Camera, MessageSquare, LineChart, Menu, X, ExternalLink, FolderGit2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const iconMap: Record<string, LucideIcon> = {
  brain: Brain,
  lightbulb: Lightbulb,
  mail: Mail,
  layout: Layout,
  database: Database,
  cloud: Cloud,
  cpu: Cpu,
  barChart: BarChart,
  camera: Camera,
  messageSquare: MessageSquare,
  lineChart: LineChart,
  menu: Menu,
  x: X,
  externalLink: ExternalLink,
  folderGit2: FolderGit2
};

export const getIcon = (name: string): LucideIcon => {
  const icon = iconMap[name.toLowerCase()];
  if (!icon) {
    console.warn(`Icon ${name} not found`);
    return Brain; // Default fallback icon
  }
  return icon;
};