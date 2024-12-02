type ColorType = {
  textColor: string;
  bgColor: string;
  hoverColor: string;
  borderColor: string;
};

type ColorMap = Record<string, ColorType>;

export const iconColors: ColorMap = {
  // Navigation & Structure
  layout: {
    textColor: 'text-pink-400',
    bgColor: 'bg-pink-400/10',
    hoverColor: 'group-hover:text-pink-300',
    borderColor: 'border-pink-400/20'
  },
  menu: {
    textColor: 'text-fuchsia-400',
    bgColor: 'bg-fuchsia-400/10',
    hoverColor: 'group-hover:text-fuchsia-300',
    borderColor: 'border-fuchsia-400/20'
  },
  
  // Data & Analytics
  database: {
    textColor: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10',
    hoverColor: 'group-hover:text-emerald-300',
    borderColor: 'border-emerald-400/20'
  },
  barChart: {
    textColor: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    hoverColor: 'group-hover:text-purple-300',
    borderColor: 'border-purple-400/20'
  },
  lineChart: {
    textColor: 'text-rose-400',
    bgColor: 'bg-rose-400/10',
    hoverColor: 'group-hover:text-rose-300',
    borderColor: 'border-rose-400/20'
  },
  pieChart: {
    textColor: 'text-lime-400',
    bgColor: 'bg-lime-400/10',
    hoverColor: 'group-hover:text-lime-300',
    borderColor: 'border-lime-400/20'
  },
  
  // AI & ML
  brain: {
    textColor: 'text-violet-400',
    bgColor: 'bg-violet-400/10',
    hoverColor: 'group-hover:text-violet-300',
    borderColor: 'border-violet-400/20'
  },
  cpu: {
    textColor: 'text-indigo-400',
    bgColor: 'bg-indigo-400/10',
    hoverColor: 'group-hover:text-indigo-300',
    borderColor: 'border-indigo-400/20'
  },
  sparkles: {
    textColor: 'text-amber-400',
    bgColor: 'bg-amber-400/10',
    hoverColor: 'group-hover:text-amber-300',
    borderColor: 'border-amber-400/20'
  },
  
  // Communication & Media
  camera: {
    textColor: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10',
    hoverColor: 'group-hover:text-cyan-300',
    borderColor: 'border-cyan-400/20'
  },
  messageSquare: {
    textColor: 'text-teal-400',
    bgColor: 'bg-teal-400/10',
    hoverColor: 'group-hover:text-teal-300',
    borderColor: 'border-teal-400/20'
  },
  mail: {
    textColor: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    hoverColor: 'group-hover:text-orange-300',
    borderColor: 'border-orange-400/20'
  },
  
  // Infrastructure & Tools
  cloud: {
    textColor: 'text-sky-400',
    bgColor: 'bg-sky-400/10',
    hoverColor: 'group-hover:text-sky-300',
    borderColor: 'border-sky-400/20'
  },
  folderGit2: {
    textColor: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    hoverColor: 'group-hover:text-yellow-300',
    borderColor: 'border-yellow-400/20'
  },
  code: {
    textColor: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    hoverColor: 'group-hover:text-blue-300',
    borderColor: 'border-blue-400/20'
  },
  
  // Indicators & Actions
  lightbulb: {
    textColor: 'text-red-400',
    bgColor: 'bg-red-400/10',
    hoverColor: 'group-hover:text-red-300',
    borderColor: 'border-red-400/20'
  },
  externalLink: {
    textColor: 'text-green-400',
    bgColor: 'bg-green-400/10',
    hoverColor: 'group-hover:text-green-300',
    borderColor: 'border-green-400/20'
  },
  x: {
    textColor: 'text-stone-400',
    bgColor: 'bg-stone-400/10',
    hoverColor: 'group-hover:text-stone-300',
    borderColor: 'border-stone-400/20'
  },
  
  // Default fallback
  default: {
    textColor: 'text-slate-400',
    bgColor: 'bg-slate-400/10',
    hoverColor: 'group-hover:text-slate-300',
    borderColor: 'border-slate-400/20'
  }
};

export const getIconColor = (iconName: string): ColorType => {
  return iconColors[iconName.toLowerCase()] || iconColors.default;
};