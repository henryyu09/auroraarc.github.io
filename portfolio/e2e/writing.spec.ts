import { test, expect } from "@playwright/test";

test.describe("Writing", () => {
  test("writing index links to posts", async ({ page }) => {
    await page.goto("/writing");
    const links = page.locator("a[href*='/writing/']");
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test("writing detail page loads", async ({ page }) => {
    await page.goto("/writing/building-a-modern-portfolio-with-mdx");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("main p").first()).toBeVisible();
  });
});
