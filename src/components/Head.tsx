import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

interface HeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function Head({
  title = "DataMind - AI Solutions",
  description = "Advanced Machine Learning Solutions and AI Services",
  image = "/og-image.jpg",
  url = "https://datamind.ai",
  type = "website",
}: HeadProps) {
  useEffect(() => {
    // Structured data for organization
    const structuredData = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "DataMind",
        description,
        url,
        logo: {
          "@type": "ImageObject",
          url: `${url}/logo.png`,
          width: "180",
          height: "180",
        },
        sameAs: [
          "https://twitter.com/datamind",
          "https://linkedin.com/company/datamind",
          "https://github.com/datamind",
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "DataMind",
        url,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${url}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ];

    // Update structured data
    let scriptTag =
      document.querySelector<HTMLScriptElement>("#structured-data");
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "structured-data";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
  }, [description, url]);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* PWA Tags */}
      <meta name="theme-color" content="#0ea5e9" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="apple-mobile-web-app-title" content="DataMind" />

      {/* Performance & Security */}
      <meta http-equiv="X-DNS-Prefetch-Control" content="on" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="preconnect" href="//fonts.googleapis.com" />
      <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="" />

      {/* Security Headers */}
      <meta http-equiv="X-Content-Type-Options" content="nosniff" />
      <meta
        http-equiv="Referrer-Policy"
        content="strict-origin-when-cross-origin"
      />
      <meta
        http-equiv="Permissions-Policy"
        content="camera=(), microphone=(), geolocation=()"
      />

      {/* Accessibility */}
      <html lang="en" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
    </Helmet>
  );
}
