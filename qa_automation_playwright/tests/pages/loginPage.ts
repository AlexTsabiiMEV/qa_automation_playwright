import { expect, Page, Locator } from "@playwright/test";

const loginName = "alexander.tsabii@mev.com";
const loginPass = "Qwerty123@@@";

export class LoginPage {
    private page: Page;
    signInButton: Locator;
    inputEmail: Locator;
    inputPass: Locator;
    // buttonLogin: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.locator("button.header_signin");
        this.inputEmail = page.locator('input[name="email"]');
        this.inputPass = page.locator('input[name="password"]');
        // this.buttonLogin = page.getByRole('button', { name: 'Login' });
    }


    async buttonLogin(): Promise<Locator> {
        return this.page.getByRole('button', { name: 'Login' });
    }

    async loginWithDefaultParams() {
        await this.signInButton.click();
        await this.inputEmail.click();
        await this.inputEmail.fill(loginName);
        await this.inputPass.click();
        await this.inputPass.fill(loginPass);
        // await expect(this.buttonLogin).toBeVisible();
        // await this.buttonLogin.click();
    };
}
