import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// Standard usage (Auto-detects i18n/request.ts)
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
