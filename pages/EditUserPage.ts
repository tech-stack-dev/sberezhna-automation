import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class EditUserPage extends BasePage {
    constructor(page: Page) {
      super(page);
    }

    readonly updateButton = this.page.locator('//button[@data-testId="button-Update"]');
    readonly userNameInput = this.page.locator('#inputUserName');

    async enterUserName(userName: string): Promise<void> {
        await this.userNameInput.fill(userName);
      }

      async clickUpdateButton(): Promise<void> {
        await this.updateButton.click();
      }
}