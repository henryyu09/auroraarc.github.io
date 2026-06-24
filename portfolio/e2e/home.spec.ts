import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads and shows hero section", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Henry Yu");
    await expect(page.locator("text=View projects")).toBeVisible();
    await expect(page.locator("text=About me")).toBeVisible();
  });

  test("has working navigation links", async ({ page }) => {
    await page.goto("/");
    // Use header-scoped href selectors to avoid substring conflicts (e.g. "Work" vs "Frameworks")
    await page.locator('header a[href="/projects"]').click();
    await expect(page).toHaveURL("/projects");
    await page.goto("/");
    await page.locator('header a[href="/writing"]').click();
    await expect(page).toHaveURL("/writing");
    await page.goto("/");
    await page.locator('header a[href="/about"]').click();
    await expect(page).toHaveURL("/about");
    await page.goto("/");
    await page.locator('header a[href="/contact"]').click();
    await expect(page).toHaveURL("/contact");
  });

  test("homepage theme toggle works", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    const initialTheme = await html.getAttribute("data-theme");

    // Click the theme toggle — uses a button with role "button" inside ThemeToggle
    const themeBtn = page.locator("header button").first();
    await themeBtn.click();
    const toggledTheme = await html.getAttribute("data-theme");
    expect(toggledTheme).not.toBe(initialTheme);
  });
});
