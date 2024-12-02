import { ReactNode, memo } from 'react';
import { motion } from 'framer-motion';
import { useViewportEntry } from '../../hooks/useViewportEntry';

interface LazyMotionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale';
  delay?: number;
}

const animations = {
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  },
  fadeRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
};

export const LazyMotion = memo(function LazyMotion({
  children,
  className = '',
  animation = 'fadeUp',
  delay = 0,
}: LazyMotionProps) {
  const { ref, isInView } = useViewportEntry();

  return (
    <motion.div
      ref={ref}
      initial={animations[animation].initial}
      animate={isInView ? animations[animation].animate : animations[animation].initial}
      transition={{ duration: 0.5, delay }}
      className={`contain-content ${className}`}
    >
      {children}
    </motion.div>
  );
});