import { test, expect } from '@playwright/test';
test('e2e named file', async ({ page }) => {
  await page.locator('input').fill('x');
  await expect(page.getByTitle('t')).toBeVisible();
});
