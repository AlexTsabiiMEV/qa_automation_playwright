import { test, expect, chromium, BrowserContext } from "@playwright/test";

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

const generateEmail = () => {
  const randomDigits = Math.floor(Math.random() * 100000);
  const email = `alexander.tsabii+${randomDigits}@mev.com`;
  return email;
};

let email = generateEmail();

test.describe("Home Work 18", () => {
  test("open main page", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(3000);
    const signinButton = page.locator("button.header_signin");
    await signinButton.click();
  });

  test("Empdy fields", async ({page}) => {
    await page.goto("/");
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('#signupName').click();
    await page.locator('#signupLastName').click();
    await page.locator('#signupEmail').click();
    await page.getByLabel('Password', { exact: true }).click()
    await page.getByLabel('Re-enter password').click();
    await page.getByText('Name required', { exact: true }).isVisible();
    await page.getByText('Last name required').isVisible();
    await page.getByText('Email required').isVisible();
    await page.getByText('Password required').isVisible();
    await page.getByRole("button",{name: "Register"}).isDisabled();
  });

  test("Invalid values", async ({page}) => {
    await page.goto("/");
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('#signupName').fill("@@");
    await page.locator('#signupLastName').fill("@@");
    await page.locator('#signupEmail').fill("alexander.tsabii");
    await page.getByLabel('Password', { exact: true }).fill("Qwerty123@@");
    await page.getByLabel('Re-enter password').fill("Qwerty123@@@");
    await page.getByText('Name is invalid', { exact: true }).isVisible();
    await page.getByText('Last name is invalid').isVisible();
    await page.getByText('Email is incorrect').isVisible();
    await page.getByRole("button",{name: "Register"}).isDisabled();
  });

  test("Long values", async ({page}) => {
    await page.goto("/");
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('#signupName').fill("1234567890123456789012");
    await page.locator('#signupLastName').fill("1234567890123456789012");
    await page.getByLabel('Password', { exact: true }).fill("1234567890123456789012");
    await page.getByText('Registration').click();
    await page.getByLabel('Re-enter password').fill("1234567890123456789012");
    await page.getByLabel('Password', { exact: true }).click();
    await page.getByText('Name has to be from 2 to 20 characters long', { exact: true }).isVisible;
    await page.getByText('Last name has to be from 2 to').isVisible;
    await page.getByText('Password has to be from 8 to').isVisible;
    await page.locator('form div').filter({ hasText: 'Re-enter passwordPassword has' }).getByRole('paragraph').isVisible;
    await page.getByRole("button",{name: "Register"}).isDisabled();
  });

  test("Short values", async ({page}) => {
    await page.goto("/");
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('#signupName').fill("1");
    await page.locator('#signupLastName').fill("1");
    await page.getByLabel('Password', { exact: true }).fill("1");
    await page.locator('#signupEmail').fill("alexander.tsabii");
    await page.getByText('Registration').click();
    await page.getByLabel('Re-enter password').fill("1");
    await page.getByLabel('Password', { exact: true }).click();
    await page.getByText('Name has to be from 2 to 20 characters long', { exact: true }).isVisible;
    await page.getByText('Last name has to be from 2 to').isVisible;
    await page.getByText('Password has to be from 8 to').isVisible;
    await page.locator('form div').filter({ hasText: 'Re-enter passwordPassword has' }).getByRole('paragraph').isVisible;
    await page.getByRole("button",{name: "Register"}).isDisabled();
  });

  test("Password not match", async ({page}) => {
    await page.goto("/");
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.getByLabel('Password', { exact: true }).fill("Qwerty123@@@");
    await page.getByLabel('Re-enter password').fill("Qwerty123@@@@");
    await page.getByLabel('Password', { exact: true }).click();
    await page.getByText('Registration').click();
    await page.getByText('Passwords do not match').isVisible();
    await page.getByRole("button",{name: "Register"}).isDisabled();
  });

  test("Successull sign up", async ({page}) => {
    await page.goto("/");
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('#signupName').fill("Alex");
    await page.locator('#signupLastName').fill("Tsabii");
    await page.locator('#signupEmail').fill(email);
    await page.getByLabel('Password', { exact: true }).fill("Qwerty123@@@");
    await page.getByLabel('Re-enter password').fill("Qwerty123@@@");
    await page.getByRole("button",{name: "Register"}).isEnabled();
    await page.getByRole('button', { name: 'Register' }).click();
    await page.waitForURL("/panel/garage");
    const textOnGaragePage = page.locator(".panel-page h1");
    await textOnGaragePage.waitFor({state: "visible"});
  });
});

