# Pixel's Journal

## 2025-05-27 - Initial Setup
**Learning:** Establishing the Pixel journal to track UI/System consistency and visual polish learnings.
**Action:** Use this file to record critical design system insights, recurring visual bugs, and layout patterns.

## 2025-05-27 - Button Size Standardization
**Learning:** Hardcoded button sizes (`h-14`, `text-lg`) were scattered across Hero and CTA sections because the design system lacked an extra-large button variant.
**Action:** Introduced `xl` size variant to `Button` component in `@repo/ui` to standardize large call-to-action buttons and eliminate magic numbers.
