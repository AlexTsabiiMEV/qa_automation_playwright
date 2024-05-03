import { expect, type Page, Locator } from "@playwright/test";


class Header {
    constructor(page: Page) {
        this.logoInHeader = page.locator("a.header_logo");
    }

async LogoVisible() {
    await expect(this.logoInHeader).toBeVisible;
}

}