import Script from 'next/script';

interface StructuredDataScriptProps {
  data: Record<string, any> | Array<Record<string, any>>;
  id?: string;
}

/**
 * Component to inject structured data (JSON-LD) into pages
 * This ensures proper SEO structured data implementation
 */
export function StructuredDataScript({ data, id }: StructuredDataScriptProps) {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <Script
      id={id || 'structured-data'}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
