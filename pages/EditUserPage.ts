import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class EditUserPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async enterUserName(userName: string): Promise<void> {
    await this.page.getByTestId('input-UserName').fill(userName);
  }

  async clickUpdateButton(): Promise<void> {
    await this.page.getByTestId('button-Update').click();
  }
}