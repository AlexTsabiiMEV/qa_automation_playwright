import { test, expect, chromium, BrowserContext } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";

let browser;
let browserContext: BrowserContext;

test.beforeAll(async () => {
  browser = await chromium.launch();
  browserContext = await browser.newContext();
});

test.afterAll(async () => {
  await browser.close();
});

const loginName = "alexander.tsabii@mev.com";
const loginPass = "Qwerty123@@@";



test.describe("Verification of qauto app", () => {
  test("open main page", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(3000);
    // await page.locator('button.header_signin').click();

    const signinButton = page.locator("button.header_signin");
    await signinButton.click();
  });


  test("Login new", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto("/");
    await loginPage.loginWithDefaultParams();
    const button = await loginPage.buttonLogin();
    await button.click();
    await page.waitForURL("/panel/garage");
  });


  test("Login", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.getByLabel('Email').fill(loginName);
    await page.getByLabel('Password').fill(loginPass);
    await page.getByRole('button', { name: 'Login' }).click({force: true });
    await page.waitForURL("/panel/garage");
    const textOnGaragePage = page.locator(".panel-page h1");
    await textOnGaragePage.waitFor({state: "visible"});
    await expect(textOnGaragePage).toContainText("Garage");
    await expect(page).toHaveScreenshot("main-page.png");
  });
});

