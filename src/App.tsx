import { Suspense, useEffect } from 'react';
import './index.css';
import Head from './components/Head';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { ErrorBoundary } from './components/ErrorBoundary';
import Loading from './components/Loading';
import { startPerformanceMonitoring, addResourceHint, prioritizeResources } from './utils/performance';

function App() {
  useEffect(() => {
    // Start performance monitoring
    startPerformanceMonitoring();

    // Add resource hints with enhanced options
    addResourceHint('https://fonts.googleapis.com', 'preconnect', undefined, { importance: 'high' });
    addResourceHint('https://fonts.gstatic.com', 'preconnect', undefined, { crossorigin: true, importance: 'high' });
    
    // DNS prefetch for external resources
    addResourceHint('https://analytics.datamind.ai', 'dns-prefetch');
    
    // Preload critical assets
    addResourceHint('/logo.png', 'preload', 'image', { importance: 'high' });
    addResourceHint('/hero-image.jpg', 'preload', 'image', { importance: 'high' });

    // Prioritize critical resources
    prioritizeResources();
  }, []);

  return (
    <ErrorBoundary>
      <Head />
      <div className="min-h-screen bg-slate-900">
        <main id="main-content" className="relative" role="main">
          <Navbar />
          <Hero />
          <Suspense 
            fallback={
              <Loading 
                size="lg" 
                text="Loading skills..." 
                aria-label="Loading skills section"
              />
            }
          >
            <Skills />
          </Suspense>
          <Suspense 
            fallback={
              <Loading 
                size="lg" 
                text="Loading projects..." 
                aria-label="Loading projects section"
              />
            }
          >
            <Projects />
          </Suspense>
          <Suspense 
            fallback={
              <Loading 
                size="lg" 
                text="Loading contact..." 
                aria-label="Loading contact section"
              />
            }
          >
            <Contact />
          </Suspense>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;