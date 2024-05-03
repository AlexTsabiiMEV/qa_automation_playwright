import { Page, Locator } from "@playwright/test";

const loginName = "alexander.tsabii@mev.com";
const loginPass = "Qwerty123@@@";

export class LoginPage {
    private page: Page;
    signInButton: Locator;
    inputEmail: Locator;
    inputPass: Locator;
    logoInHeader: Locator;
    loginButtonForm: Locator; // змінено тип

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.locator("button.header_signin");
        this.inputEmail = page.locator('input[name="email"]');
        this.inputPass = page.locator('input[name="password"]');
        this.logoInHeader = page.locator("a.header_logo");
        this.loginButtonForm = page.locator('button[type="submit"]'); // змінено локатор кнопки
    }

    async openPage() {
        await this.page.goto("/");
    }

    async loginWithDefaultParams() {
        await this.page.goto("/");
        await this.signInButton.click();
        await this.inputEmail.click();
        await this.inputEmail.fill(loginName);
        await this.inputPass.click();
        await this.inputPass.fill(loginPass);
        await this.loginButtonForm.click();
    };
}
