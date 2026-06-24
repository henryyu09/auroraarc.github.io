import { test, expect } from "@playwright/test";

test.describe("Projects", () => {
  test("project index lists all 6 projects", async ({ page }) => {
    await page.goto("/projects");
    // The index should list project cards
    const cards = page.locator("a[href*='/projects/']");
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test("project detail page loads MDX content", async ({ page }) => {
    await page.goto("/projects/quantum-reservoir-computing");
    await expect(page.locator("h1")).toBeVisible();
    // The MDX content should render some paragraphs
    await expect(page.locator("main p").first()).toBeVisible();
  });

  test("back link navigates to projects index", async ({ page }) => {
    await page.goto("/projects/music-generation-ggas");
    const backLink = page.locator("a[href='/projects']").first();
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(page).toHaveURL("/projects");
  });
});
