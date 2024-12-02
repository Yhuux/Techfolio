import { ReactNode } from 'react';

export interface BaseProps {
  children?: ReactNode;
  className?: string;
}

export interface ButtonProps extends BaseProps {
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export interface CardProps extends BaseProps {
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
  hover?: boolean;
}

export interface IconButtonProps extends ButtonProps {
  icon: ReactNode;
  label?: string;
}

export interface SectionProps extends BaseProps {
  id?: string;
  title?: string;
  subtitle?: string;
}