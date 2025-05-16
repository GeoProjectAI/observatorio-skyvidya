import { Helmet } from "react-helmet";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
}

export function SEO({
  title = "SKYVIDYA GeoIntelligence Platform",
  description = "Advanced geospatial intelligence for planetary resilience and environmental monitoring.",
  keywords = "geospatial, intelligence, environmental monitoring, GIS, mapping, analytics",
  ogImage = "https://skyvidya.com/og-image.jpg",
  ogUrl = "https://skyvidya.com",
  twitterCard = "summary_large_image",
}: SEOProps) {
  const fullTitle = `${title} | SKYVIDYA`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={ogUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
