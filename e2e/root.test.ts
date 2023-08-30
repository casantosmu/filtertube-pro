import { test, expect } from "@playwright/test";

test("Home should render Hello world!", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Hello world!");
});
