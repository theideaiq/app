## 2024-05-22 - [Standardize Next.js Middleware]
Smell: Loose typing in middleware/proxy configuration.
Standard: Next.js 15+ uses `proxy.ts` (not `middleware.ts`). All requests must be typed as `NextRequest` from `next/server`.
