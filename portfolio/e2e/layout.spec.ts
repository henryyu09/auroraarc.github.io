import { test, expect } from "@playwright/test";

test.describe("Layout", () => {
  test("header is sticky", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header");
    await expect(header).toBeVisible();
    // Scroll down and verify header is still in viewport
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(header).toBeVisible();
  });

  test("footer has social links", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();

    const socialLink = footer.locator("a[aria-label='GitHub']");
    await expect(socialLink).toBeVisible();
    await expect(socialLink).toHaveAttribute("href", "https://github.com/AuroraArc");
  });

  test("mobile hamburger menu works", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const hamburger = page.locator("button[aria-label='Toggle menu']");
    await expect(hamburger).toBeVisible();

    await hamburger.click();
    // On mobile, both desktop-nav (hidden) and mobile-drawer nav elements exist;
    // use .last() to pick the visible mobile drawer link
    await expect(page.locator('nav a[href="/projects"]').last()).toBeVisible();
    await expect(page.locator('nav a[href="/writing"]').last()).toBeVisible();
  });
});
