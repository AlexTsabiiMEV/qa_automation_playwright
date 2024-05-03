import { Page } from "@playwright/test";

export class GaragePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo() {
    await this.page.goto("/panel/garage");
    const textOnGaragePage = this.page.locator(".panel-page h1");
    await textOnGaragePage.waitFor({ state: "visible" });
    return textOnGaragePage;
  }
}

