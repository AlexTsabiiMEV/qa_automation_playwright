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
const loginPass = "qW8bnCATOkopJ69";
const fs = require('fs');



test("Login", async ({ page }) => {

    const myImage = fs.readFileSync('/Users/alextsabii/MY STAFF/JS study/Repo/qa_automation_playwright/util/bulo.png');

    await page.route('**/api/users/profile', route => {
        route.fulfill({
            status: 200,
            contentType: 'default-user.png',
            body: myImage
        });
    });


    await page.goto("/");
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.getByLabel('Email').fill(loginName);
    await page.getByLabel('Password').fill(loginPass);
    await page.getByRole('button', { name: 'Login' }).click({force: true });
    await page.waitForURL("/panel/garage");
    const textOnGaragePage = page.locator(".panel-page h1");
    await textOnGaragePage.waitFor({state: "visible"});
    await expect(textOnGaragePage).toContainText("Garage");
    await page.getByRole('button', { name: 'User photo My profile' }).click();
    await page.getByText('ProfileSettings').click();
    await page.goto("/api/users/profile");
  });