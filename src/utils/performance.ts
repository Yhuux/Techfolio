export const startPerformanceMonitoring = (): void => {
  if ("performance" in window) {
    // First Input Delay
    try {
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry instanceof PerformanceEventTiming) {
            const fid = entry.processingStart! - entry.startTime;
            console.info("FID:", fid);
          }
        }
      }).observe({ entryTypes: ["first-input"] });

      // Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          console.info("LCP:", entry.startTime);
        }
      }).observe({ entryTypes: ["largest-contentful-paint"] });

      // Cumulative Layout Shift
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if ("hadRecentInput" in entry && !(entry as any).hadRecentInput) {
            console.info("CLS:", (entry as any).value);
          }
        }
      }).observe({ entryTypes: ["layout-shift"] });
    } catch (error) {
      console.warn("PerformanceObserver error:", error);
    }
  }
};

export const addResourceHint = (
  url: string,
  type: "preload" | "preconnect" | "dns-prefetch",
  as?: string,
  options: { importance?: "high" | "low"; crossorigin?: boolean } = {}
): void => {
  const link = document.createElement("link");
  link.rel = type;
  link.href = url;

  if (as) link.as = as;
  if (options.crossorigin) link.crossOrigin = "anonymous";
  // Use setAttribute for experimental attributes
  if (options.importance) {
    link.setAttribute("importance", options.importance);
  }

  document.head.appendChild(link);
};

export const prioritizeResources = (): void => {
  // Add priority hints to critical resources
  const stylesheets = document.querySelectorAll<HTMLLinkElement>(
    'link[rel="stylesheet"]'
  );
  stylesheets.forEach((link) => {
    // Type safety is now handled by the HTMLLinkElement type
    if (link.href && link.href.includes("critical")) {
      link.setAttribute("importance", "high");
    }
  });

  // Defer non-critical images
  const images =
    document.querySelectorAll<HTMLImageElement>("img:not([loading])");
  images.forEach((img) => {
    const inCriticalSection = img.closest("header, nav") !== null;
    if (!inCriticalSection) {
      img.loading = "lazy";
      img.decoding = "async";
    }
  });
};