import { useEffect, useRef, useState, useCallback } from 'react';

interface ViewportOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  root?: Element | null;
}

export const useViewportEntry = ({
  threshold = 0.1,
  rootMargin = '-100px',
  once = true,
  root = null
}: ViewportOptions = {}) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const hasTriggered = useRef(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const callback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry?.isIntersecting) {
      setIsInView(true);
      if (once && elementRef.current && !hasTriggered.current) {
        hasTriggered.current = true;
        observer.current?.unobserve(elementRef.current);
      }
    } else if (!once) {
      setIsInView(false);
    }
  }, [once]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    observer.current = new IntersectionObserver(callback, {
      threshold,
      rootMargin,
      root
    });

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.current.observe(currentRef);
    }

    return () => {
      if (currentRef && observer.current) {
        observer.current.unobserve(currentRef);
      }
      observer.current?.disconnect();
    };
  }, [callback, root, rootMargin, threshold]);

  const ref = useCallback((node: HTMLElement | null) => {
    elementRef.current = node;
    if (node && observer.current) {
      observer.current.observe(node);
    }
  }, []);

  return { ref, isInView };
};