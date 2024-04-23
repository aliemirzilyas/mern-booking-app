import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

test("should allow user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign in" }).click();

  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();

  await page.locator("[name=email]").fill("e2e_test@example.com");
  await page.locator("[name=password]").fill("password123");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Signed in successfully!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 90000) + 10000
  }@test.com`;

  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Create account" }).click();

  await expect(
    page.getByRole("heading", { name: "Create an account" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_lastName");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("pass123");
  await page.locator("[name=confirmPassword]").fill("pass123");

  await page.getByRole("button", { name: "Sign up" }).click();

  await expect(page.getByText("You successfully registered!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});
