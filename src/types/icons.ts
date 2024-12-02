import type { LucideIcon } from "lucide-react";

export interface IconProps {
  icon: LucideIcon;
  className?: string;
  size?: number;
  color?: string;
}

export type IconName =
  | "brain"
  | "lightbulb"
  | "mail"
  | "layout"
  | "database"
  | "cloud"
  | "cpu"
  | "barChart"
  | "camera"
  | "messageSquare"
  | "lineChart"
  | "menu"
  | "x"
  | "externalLink"
  | "folderGit2";

export type IconMap = {
  [K in IconName]: LucideIcon;
} & {
  [key: string]: LucideIcon | undefined;
};
