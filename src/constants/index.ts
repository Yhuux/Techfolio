import type { MenuItem, Project, Skill } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  { title: "Home", to: "top", icon: "layout" },
  { title: "Skills", to: "skills", icon: "lightbulb" },
  { title: "Projects", to: "projects", icon: "brain" },
  { title: "Contact", to: "contact", icon: "mail" },
];

export const PROJECTS: Project[] = [
  {
    title: "Image Recognition AI",
    description: "Deep learning model for real-time image classification",
    tags: ["TensorFlow", "Computer Vision", "CNN"],
    icon: "camera",
  },
  {
    title: "NLP Chatbot",
    description: "Advanced natural language processing for customer service",
    tags: ["NLP", "BERT", "Python"],
    icon: "messageSquare",
  },
  {
    title: "Predictive Analytics",
    description: "Time series forecasting for business metrics",
    tags: ["Time Series", "Prophet", "Analytics"],
    icon: "lineChart",
  },
];

export const SKILLS: Skill[] = [
  {
    icon: "database",
    title: "Data Processing",
    description: "Expert in handling and processing large-scale datasets",
  },
  {
    icon: "cloud",
    title: "Cloud Computing",
    description: "Implementation of ML models in cloud environments",
  },
  {
    icon: "cpu",
    title: "Deep Learning",
    description: "Neural networks and advanced AI algorithms",
  },
  {
    icon: "barChart",
    title: "Data Visualization",
    description: "Creating meaningful insights through visualization",
  },
];