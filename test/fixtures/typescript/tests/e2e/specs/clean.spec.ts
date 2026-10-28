import { expect } from '@playwright/test';
import { test } from '../support/fixtures';

test.describe('clean', () => {
  test('shows the heading', async ({ page, token }) => {
    await page.goto(`/?token=${token}`);
    await expect(page.getByRole('heading')).toBeVisible();
    await expect(page.getByRole('listitem')).toHaveCount(3);
  });
});
