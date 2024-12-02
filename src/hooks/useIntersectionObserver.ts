import { useEffect, useRef, useState, useCallback } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
  once?: boolean;
}

export const useIntersectionObserver = ({
  threshold = 0.1,
  rootMargin = '-100px',
  root = null,
  once = true
}: UseIntersectionObserverProps = {}) => {
  const ref = useRef<Element | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasTriggered = useRef(false);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      if (entry?.isIntersecting) {
        setIsVisible(true);
        if (once && !hasTriggered.current) {
          hasTriggered.current = true;
          // Disconnect observer if we only need to trigger once
          observer.current?.disconnect();
        }
      } else if (!once) {
        setIsVisible(false);
      }
    },
    [once]
  );

  // Store observer in ref to prevent recreation on every render
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Only create the observer once
    if (!observer.current) {
      observer.current = new IntersectionObserver(callback, {
        threshold,
        rootMargin,
        root
      });
    }

    const currentRef = ref.current;
    const currentObserver = observer.current;

    if (currentRef) {
      currentObserver.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        currentObserver.unobserve(currentRef);
      }
    };
  }, [callback, root, rootMargin, threshold]);

  return { ref, isVisible };
};