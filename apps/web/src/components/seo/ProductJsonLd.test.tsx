import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductJsonLd from './ProductJsonLd';
import type { Product } from '@/services/products';

// Mock env
vi.mock('@repo/env/web', () => ({
  webEnv: {
    NEXT_PUBLIC_SITE_URL: 'https://theidea.iq',
  },
}));

const mockProduct: Product = {
  id: '123',
  title: 'Test Product',
  slug: 'test-product',
  description: 'Test Description',
  price: 1000,
  stock: 10,
  images: ['https://example.com/image.jpg'],
  image: 'https://example.com/image.jpg',
  seller: 'Test Seller',
  condition: 'new',
  rating: 4.5,
  reviewCount: 10,
  category: 'Test',
  isVerified: true,
  details: {},
  variants: [],
};

describe('ProductJsonLd', () => {
  it('renders correct JSON-LD', () => {
    const { container } = render(
      <ProductJsonLd product={mockProduct} locale="en" />,
    );
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).not.toBeNull();

    const content = JSON.parse(script!.innerHTML);

    expect(content['@context']).toBe('https://schema.org');
    expect(content['@type']).toBe('Product');
    expect(content.name).toBe('Test Product');
    expect(content.sku).toBe('123');
    expect(content.offers.price).toBe(1000);
    expect(content.offers.priceCurrency).toBe('IQD');
    expect(content.offers.availability).toBe('https://schema.org/InStock');
    expect(content.aggregateRating.ratingValue).toBe(4.5);
    expect(content.aggregateRating.reviewCount).toBe(10);
  });

  it('renders out of stock status correctly', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    const { container } = render(
      <ProductJsonLd product={outOfStockProduct} locale="en" />,
    );
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const content = JSON.parse(script!.innerHTML);

    expect(content.offers.availability).toBe('https://schema.org/OutOfStock');
  });

  it('omits aggregateRating if reviewCount is missing or 0', () => {
    const noReviewsProduct = { ...mockProduct, reviewCount: 0 };
    const { container } = render(
      <ProductJsonLd product={noReviewsProduct} locale="en" />,
    );
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const content = JSON.parse(script!.innerHTML);

    expect(content.aggregateRating).toBeUndefined();
  });
});
