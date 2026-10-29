import { expect } from '@playwright/test';
import { test } from '../support/fixtures';

test.describe('basic', () => {
  test('loads', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    page.click('button');
    expect(await page.locator('h1').isVisible()).toBe(true);
    await expect(page.locator('[data-testid="x"]')).toBeVisible();
    expect(await page.locator('li').count()).toBe(3);
  });
  test.only('focused', async ({ page }) => {
    await page.pause();
  });
});
