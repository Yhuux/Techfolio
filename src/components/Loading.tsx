import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  'aria-label'?: string;
}

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12'
};

export default function Loading({ 
  size = 'md', 
  text, 
  'aria-label': ariaLabel 
}: LoadingProps) {
  return (
    <div 
      className="flex flex-col items-center justify-center p-4"
      role="status"
      aria-label={ariaLabel || 'Loading'}
      aria-live="polite"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 
          className={`${sizes[size]} text-primary-400`}
          aria-hidden="true"
        />
      </motion.div>
      {text && (
        <p className="mt-2 text-gray-400 text-sm" aria-live="polite">
          {text}
        </p>
      )}
    </div>
  );
}