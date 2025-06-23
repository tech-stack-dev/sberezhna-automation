import { Page, expect } from "@playwright/test";

export class BasePage {
    readonly page: Page;
  
    constructor(page: Page) {
      this.page = page;
    }

    async goto(path: string): Promise<void> {
        await this.page.goto(path);
      }

    async verifyPageTitle(title: string | RegExp): Promise<void> {
        await expect(this.page).toHaveTitle(title);
      }
}