'use client';

import { webEnv } from '@repo/env/web';
import { sanitizeJsonLd } from '@repo/utils';
import type { Product } from '@/services/products';

type Props = {
  product: Product;
  locale: string;
};

export default function ProductJsonLd({ product, locale }: Props) {
  const baseUrl = webEnv.NEXT_PUBLIC_SITE_URL;
  const productUrl = `${baseUrl}/${locale}/product/${product.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image:
      product.images && product.images.length > 0
        ? product.images
        : [product.image],
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: product.seller || 'The IDEA',
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'IQD',
      price: product.price,
      availability:
        product.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      itemCondition:
        product.condition === 'new'
          ? 'https://schema.org/NewCondition'
          : 'https://schema.org/UsedCondition',
    },
    aggregateRating:
      product.reviewCount && product.reviewCount > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          }
        : undefined,
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is sanitized
      dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(jsonLd) }}
    />
  );
}
