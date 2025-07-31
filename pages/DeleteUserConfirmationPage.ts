import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DeleteUserConfirmationPage extends BasePage {
    constructor(page: Page) {
      super(page);
    }

readonly yesButton = this.page.locator('//button[@data-testid="button-Yes"]');
readonly cancelButton = this.page.locator('//button[@data-testid="button-Cancel"]');

async confirmDeleting(): Promise<void> {
  await this.yesButton.click();
}

async cancelDeleting(): Promise<void> {
  await this.cancelButton.click();
}
}
