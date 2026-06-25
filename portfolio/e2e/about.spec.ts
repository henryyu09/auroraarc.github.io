import { test, expect } from "@playwright/test";

test.describe("About", () => {
  test("about page loads", async ({ page }) => {
    await page.goto("/about");
    await expect(page.locator("h1")).toContainText("About");
  });

  test("contact page loads with links", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("h1")).toContainText("Contact");
    const emailLink = page.locator("h1 + p + ul a[href^='mailto:']");
    await expect(emailLink).toBeVisible();
  });

  test("about page has resume download button", async ({ page }) => {
    await page.goto("/about");
    const downloadBtn = page.locator("a[download]");
    await expect(downloadBtn).toBeVisible();
    await expect(downloadBtn).toHaveAttribute("href", "/cv.pdf");
  });
});
