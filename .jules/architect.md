## 2025-05-23 - Co-location of Unit Tests
Smell: Unit tests for shared packages (e.g., `@repo/utils`) located in consuming applications (e.g., `apps/web/src/lib`). This creates false dependencies and makes the package harder to maintain independently.
Standard: Unit tests must be co-located with the source code they test (e.g., `packages/utils/src/string.test.ts` alongside `string.ts`) and executed via the package's own test script.
