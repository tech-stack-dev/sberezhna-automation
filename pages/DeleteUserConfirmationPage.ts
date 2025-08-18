import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DeleteUserConfirmationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async confirmDeleting(): Promise<void> {
    await this.page.getByTestId('button-Yes').click();
  }

  async cancelDeleting(): Promise<void> {
    await this.page.getByTestId('button-Cancel').click();
  }
}
