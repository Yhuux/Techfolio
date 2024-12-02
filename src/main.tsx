import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import App from "./App.tsx";
import "./index.css";

// Performance monitoring
const reportWebVitals = () => {
  if ("performance" in window && "getEntriesByType" in performance) {
    const navEntry = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;

    const metrics = {
      cls: parseFloat(sessionStorage.getItem("CLS") || "0"),
      fid: parseFloat(sessionStorage.getItem("FID") || "0"),
      lcp: parseFloat(sessionStorage.getItem("LCP") || "0"),
      fcp:
        performance
          .getEntriesByType("paint")
          .find((entry) => entry.name === "first-contentful-paint")
          ?.startTime || 0,
      ttfb: navEntry?.responseStart || 0,
    };

    // Report to analytics
    console.info("Web Vitals:", metrics);
  }
};

// Error boundaries for root render
const container = document.getElementById("root");
if (!container) {
  throw new Error("Failed to find root element");
}

const root = createRoot(container);

try {
  root.render(
    <StrictMode>
      <HelmetProvider>
        <App />
        <Analytics debug={false} />
      </HelmetProvider>
    </StrictMode>
  );

  // Remove loader with fade out
  const loader = document.querySelector(".initial-loader");
  if (loader && loader.parentNode) {
    loader.classList.add("fade-out");
    setTimeout(() => {
      if (loader && loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    }, 300);
  }
} catch (error) {
  console.error("Failed to render app:", error);
  root.render(
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-900 text-white"
      role="alert"
      aria-live="assertive"
    >
      <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
      <p className="text-gray-400">Please try refreshing the page</p>
    </div>
  );
}

// Enhanced performance monitoring
if ("PerformanceObserver" in window) {
  // CLS
  try {
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!("hadRecentInput" in entry) || !(entry as any).hadRecentInput) {
          const cls = (entry as any).value;
          sessionStorage.setItem("CLS", String(cls));
        }
      }
    }).observe({ entryTypes: ["layout-shift"] });

    // FID
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry instanceof PerformanceEventTiming) {
          const fid = entry.processingStart! - entry.startTime;
          sessionStorage.setItem("FID", String(fid));
        }
      }
    }).observe({ entryTypes: ["first-input"] });

    // LCP
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        const lcp = entries[entries.length - 1];
        sessionStorage.setItem("LCP", String(lcp.startTime));
      }
    }).observe({ entryTypes: ["largest-contentful-paint"] });

    // Navigation and resource timing
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.entryType === "navigation") {
          const navEntry = entry as PerformanceNavigationTiming;
          sessionStorage.setItem("TTFB", String(navEntry.responseStart));
        }
      }
    }).observe({ entryTypes: ["navigation"] });
  } catch (error) {
    console.warn("PerformanceObserver error:", error);
  }
}

// Report metrics after load
window.addEventListener("load", reportWebVitals);

// Register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((error) => {
      console.warn("ServiceWorker registration failed:", error);
    });
  });
}
