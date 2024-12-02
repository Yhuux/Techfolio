import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Performance monitoring
const reportWebVitals = () => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    // Core Web Vitals
    const cls = sessionStorage.getItem('CLS') || '0';
    const fid = sessionStorage.getItem('FID') || '0';
    const lcp = sessionStorage.getItem('LCP') || '0';

    // Report to analytics (implement your analytics service here)
    console.info('Web Vitals:', {
      cls: parseFloat(cls),
      fid: parseFloat(fid),
      lcp: parseFloat(lcp)
    });
  }
};

// Enable React concurrent features with error boundary
const root = createRoot(document.getElementById('root')!)

// Add error handling for root render
try {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )

  // Remove initial loader
  const loader = document.querySelector('.initial-loader');
  if (loader) {
    loader.remove();
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
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (entry.hadRecentInput) continue;
      const cls = (entry as any).value;
      sessionStorage.setItem('CLS', String(cls));
    }
  }).observe({ entryTypes: ['layout-shift'] });

  // First Input Delay
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      const fid = entry.processingStart! - entry.startTime;
      sessionStorage.setItem('FID', String(fid));
    }
  }).observe({ entryTypes: ['first-input'] });

  // Largest Contentful Paint
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      const lcp = entry.startTime;
      sessionStorage.setItem('LCP', String(lcp));
    }
  }).observe({ entryTypes: ['largest-contentful-paint'] });
}

// Report metrics after load
window.addEventListener('load', reportWebVitals)