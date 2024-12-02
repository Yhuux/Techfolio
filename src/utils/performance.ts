import { useCallback, useEffect, useRef } from 'react';

// Web Vitals reporting with more metrics
export const reportWebVitals = (metric: any) => {
  const body = {
    name: metric.name,
    value: metric.value,
    id: metric.id,
    delta: metric.delta,
    navigationType: performance.getEntriesByType('navigation')[0]?.type
  };

  // Send to analytics (implement your analytics service here)
  console.info('Web Vital:', body);
};

// Enhanced lazy loading with Intersection Observer
export const useLazyLoad = (
  threshold = 0.1,
  rootMargin = '50px'
) => {
  const ref = useRef<HTMLElement | null>(null);
  const onScreen = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !onScreen.current) {
          onScreen.current = true;
          if (ref.current) {
            // Load images
            const images = ref.current.querySelectorAll('img[data-src]');
            images.forEach(img => {
              if (img instanceof HTMLImageElement) {
                img.src = img.dataset.src || '';
                img.removeAttribute('data-src');
                // Add loading="lazy" attribute
                img.loading = 'lazy';
                // Add decoding="async" attribute
                img.decoding = 'async';
              }
            });

            // Load background images
            const bgElements = ref.current.querySelectorAll('[data-bg]');
            bgElements.forEach(el => {
              const bg = el.getAttribute('data-bg');
              if (bg) {
                el.style.backgroundImage = `url(${bg})`;
                el.removeAttribute('data-bg');
              }
            });
          }
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin]);

  return ref;
};

// Enhanced resource hints for performance
export const addResourceHint = (
  url: string,
  type: 'preload' | 'prefetch' | 'preconnect' | 'dns-prefetch' = 'preload',
  as?: string,
  options: { crossorigin?: boolean; importance?: 'high' | 'low' } = {}
) => {
  const link = document.createElement('link');
  link.rel = type;
  link.href = url;
  if (as) link.as = as;
  if (options.crossorigin) link.crossOrigin = 'anonymous';
  if (options.importance) link.importance = options.importance;
  document.head.appendChild(link);
};

// Enhanced performance monitoring
export const startPerformanceMonitoring = () => {
  // First Input Delay
  new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      const fid = entry.processingStart! - entry.startTime;
      reportWebVitals({
        name: 'FID',
        value: fid,
        id: entry.id
      });
    });
  }).observe({ type: 'first-input', buffered: true });

  // Largest Contentful Paint
  new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      reportWebVitals({
        name: 'LCP',
        value: entry.startTime,
        id: entry.id
      });
    });
  }).observe({ type: 'largest-contentful-paint', buffered: true });

  // Cumulative Layout Shift
  let cumulativeCLS = 0;
  new PerformanceObserver((list) => {
    list.getEntries().forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        cumulativeCLS += entry.value;
        reportWebVitals({
          name: 'CLS',
          value: cumulativeCLS,
          id: entry.id
        });
      }
    });
  }).observe({ type: 'layout-shift', buffered: true });

  // Time to First Byte
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (navigation) {
    const ttfb = navigation.responseStart - navigation.requestStart;
    reportWebVitals({
      name: 'TTFB',
      value: ttfb,
      id: 'nav-ttfb'
    });
  }

  // Resource timing
  new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.initiatorType === 'resource') {
        reportWebVitals({
          name: 'ResourceTiming',
          value: entry.duration,
          id: entry.name
        });
      }
    });
  }).observe({ entryTypes: ['resource'] });
};

// Optimized image loading with modern formats support
export const optimizeImage = async (
  src: string, 
  options = { 
    quality: 0.7, 
    maxWidth: 1200,
    format: 'webp' 
  }
) => {
  const img = new Image();
  img.src = src;
  await img.decode();

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  // Calculate new dimensions maintaining aspect ratio
  let { width, height } = img;
  if (width > options.maxWidth) {
    height = (options.maxWidth / width) * height;
    width = options.maxWidth;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);

  return new Promise<string>((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob));
        }
      },
      `image/${options.format}`,
      options.quality
    );
  });
};

// Enhanced focus trap for modals with ARIA support
export const useFocusTrap = (isActive: boolean) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !ref.current) return;

    const focusableElements = ref.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Store last focused element
    const lastFocusedElement = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      } else if (e.key === 'Escape') {
        // Close modal functionality should be implemented here
        lastFocusedElement?.focus();
      }
    };

    // Set ARIA attributes
    ref.current.setAttribute('role', 'dialog');
    ref.current.setAttribute('aria-modal', 'true');

    document.addEventListener('keydown', handleKeyDown);
    firstFocusable.focus();

    // Prevent background scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      lastFocusedElement?.focus();
    };
  }, [isActive]);

  return ref;
};

// Resource prioritization
export const prioritizeResources = () => {
  // Add priority hints to critical resources
  document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
    if (link instanceof HTMLLinkElement) {
      link.importance = 'high';
    }
  });

  // Defer non-critical images
  document.querySelectorAll('img:not([loading])').forEach((img) => {
    if (img instanceof HTMLImageElement && !img.closest('header, nav')) {
      img.loading = 'lazy';
      img.decoding = 'async';
    }
  });
};