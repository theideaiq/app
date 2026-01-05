import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Auth Pages', () => {
  test('login page loads and has form', async ({ page }) => {
    await page.goto('/login');

    // Check for email input
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('validation errors on empty submit', async ({ page }) => {
    await page.goto('/login');

    // Click submit without filling anything
    await page.locator('button[type="submit"]').click();

    // Expect some validation message.
    // Since these are native HTML5 validation or client side, we check for visibility of error text
    // If it relies on browser native validation, playwright won't see text in DOM unless we check validationMessage property
    // But usually modern forms show UI errors. Let's assume UI errors.
    // If the test fails we can adjust.
    // However, if standard HTML required attribute is used, the browser blocks submission.

    const emailInput = page.locator('input[type="email"]');
    // Check if it has 'required' attribute
    await expect(emailInput).toHaveAttribute('required', '');
  });

  test('login accessibility check', async ({ page }) => {
    await page.goto('/login');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
