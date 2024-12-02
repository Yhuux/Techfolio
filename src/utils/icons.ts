import { Brain, Lightbulb, Mail, Layout, Database, Cloud, Cpu, BarChart, Camera, MessageSquare, LineChart, Menu, X, ExternalLink, FolderGit2 } from 'lucide-react';
import type { IconMap, IconName } from '../types/icons';

export const iconMap: IconMap = {
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

export const getIcon = (name: string): IconMap[IconName] => {
  const iconName = name.toLowerCase() as IconName;
  const icon = iconMap[iconName];
  if (!icon) {
    console.warn(`Icon ${name} not found`);
    return Brain; // Default fallback icon
  }
  return icon;
};