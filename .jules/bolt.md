## 2025-02-18 - [Broken Tests and TSConfig Exclusion]
**Learning:** The `tsconfig.json` in `apps/web` excludes test files (`**/*.test.ts`), which prevents type checking in tests. This caused `cart-store.test.ts` to rot, expecting `items` to be strings while the implementation was updated to `CartItem` objects.
**Action:** When working on tests, always check if they are included in `tsconfig.json`. If tests are broken and out of scope, document them but do not let them block unrelated optimizations if they were already broken.

## 2025-02-18 - [Expensive Intl Objects]
**Learning:** `Intl.NumberFormat` instantiation is expensive. Creating it inside render loops (like in `CartDrawer`) or frequently re-rendered components (`ProductCard`) is a common performance anti-pattern.
**Action:** Always extract formatters to a shared utility or module scope to reuse the instance.
