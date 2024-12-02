import { useEffect, useRef, useState, useCallback } from 'react';

interface ViewportOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export const useViewportEntry = ({
  threshold = 0.1,
  rootMargin = '-100px',
  once = true
}: ViewportOptions = {}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const hasTriggered = useRef(false);

  const callback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry?.isIntersecting) {
      setIsInView(true);
      if (once && ref.current && !hasTriggered.current) {
        hasTriggered.current = true;
      }
    } else if (!once) {
      setIsInView(false);
    }
  }, [once]);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      threshold,
      rootMargin,
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [callback, rootMargin, threshold]);

  return { ref, isInView };
};