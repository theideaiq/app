import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Homepage', () => {
  test('has title and key sections', async ({ page }) => {
    await page.goto('/');

    // Check title (approximate matching)
    await expect(page).toHaveTitle(/The Idea/i);

    // Check for main nav or hero presence
    // Assuming there's a header or main element
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('accessibility check', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // We might want to be strict, but for now let's just log violations if any
    // and fail if critical
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
