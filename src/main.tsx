import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Performance monitoring
const reportWebVitals = () => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    // Core Web Vitals
    const cls = window.sessionStorage.getItem('CLS') || '0';
    const fid = window.sessionStorage.getItem('FID') || '0';
    const lcp = window.sessionStorage.getItem('LCP') || '0';

    // Report to analytics (implement your analytics service here)
    console.info('Web Vitals:', {
      cls: parseFloat(cls),
      fid: parseFloat(fid),
      lcp: parseFloat(lcp)
    });
  }
};

// Enable React concurrent features with error boundary
const container = document.getElementById('root');
if (!container) {
  throw new Error('Failed to find root element');
}

const root = createRoot(container);

// Add error handling for root render
try {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )

  // Remove initial loader
  const loader = document.querySelector('.initial-loader');
  if (loader && loader.parentNode) {
    loader.parentNode.removeChild(loader);
  }
} catch (error) {
  console.error('Failed to render app:', error)
  root.render(
    <div 
      className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-900 text-white"
      role="alert"
      aria-live="assertive"
    >
      <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
      <p className="text-gray-400">Please try refreshing the page</p>
    </div>
  )
}

// Performance monitoring
if ('PerformanceObserver' in window) {
  // Cumulative Layout Shift
  try {
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if ('hadRecentInput' in entry && !(entry as any).hadRecentInput) {
          const cls = (entry as any).value;
          window.sessionStorage.setItem('CLS', String(cls));
        }
      }
    }).observe({ entryTypes: ['layout-shift'] });

    // First Input Delay
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry instanceof PerformanceEventTiming) {
          const fid = entry.processingStart! - entry.startTime;
          window.sessionStorage.setItem('FID', String(fid));
        }
      }
    }).observe({ entryTypes: ['first-input'] });

    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry instanceof PerformanceEntry) {
          const lcp = entry.startTime;
          window.sessionStorage.setItem('LCP', String(lcp));
        }
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (error) {
    console.warn('PerformanceObserver error:', error);
  }
}

// Report metrics after load
window.addEventListener('load', reportWebVitals);