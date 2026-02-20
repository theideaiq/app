## 2025-02-17 - Intl.NumberFormat Instantiation
**Learning:** Instantiating `Intl.NumberFormat` inside frequently rendered components (like `ProductCard` in a list) is a significant performance bottleneck. This codebase uses a custom locale `en-IQ` with decimal style for Iraqi Dinar.
**Action:** Always instantiate `Intl.NumberFormat` (and `DateTimeFormat`) as module-level constants, preferably in `@repo/utils/src/format.ts`, and export helper functions (e.g., `formatIQD`) to reuse the instance across the application.
