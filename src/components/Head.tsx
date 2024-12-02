import { useEffect } from 'react';

interface HeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function Head({
  title = 'DataMind - AI Solutions',
  description = 'Advanced Machine Learning Solutions and AI Services',
  image = '/og-image.jpg',
  url = 'https://datamind.ai'
}: HeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    updateMetaTag('description', description);
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', url);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:card', 'summary_large_image');
    
    // Add additional SEO meta tags
    updateMetaTag('apple-mobile-web-app-title', 'DataMind');
    updateMetaTag('application-name', 'DataMind');
    updateMetaTag('msapplication-TileColor', '#0ea5e9');
    updateMetaTag('theme-color', '#0ea5e9');

    // Update language tag if needed
    document.documentElement.lang = 'en';

    // Add JSON-LD structured data
    const structuredData = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'DataMind',
        description,
        url,
        logo: `${url}/logo.png`,
        sameAs: [
          'https://twitter.com/datamind',
          'https://linkedin.com/company/datamind'
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'DataMind',
        url,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${url}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: url
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Skills',
            item: `${url}#skills`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Projects',
            item: `${url}#projects`
          }
        ]
      }
    ];

    let scriptTag = document.querySelector<HTMLScriptElement>('#structured-data');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'structured-data';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
  }, [title, description, image, url]);

  return null;
}

function updateMetaTag(name: string, content: string) {
  let meta = document.querySelector<HTMLMetaElement>(`meta[name="${name}"], meta[property="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(name.includes('og:') || name.includes('twitter:') ? 'property' : 'name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}