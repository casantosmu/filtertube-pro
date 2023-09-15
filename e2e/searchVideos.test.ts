import { test, expect } from "@playwright/test";

const CHANNEL_SEARCH = "Programming channels";

test("Search videos", async ({ page }) => {
  await page.goto("/");

  // Titles
  await expect(page).toHaveTitle("FilterTube Pro");
  await expect(
    page.getByRole("heading", { name: "FilterTube Pro" }),
  ).toBeVisible();

  // Search channels
  const searchInput = page.getByPlaceholder("Search channel");
  await searchInput.fill(CHANNEL_SEARCH);
  await searchInput.press("Enter");

  // Redirects
  await expect(page).toHaveURL(/\/search\?filter=Programming\+channels$/);
});
