import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class EditUserPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async enterUserName(userName: string): Promise<void> {
    await this.page.getByTestId('input-UserName').fill('');
    await this.page.getByTestId('input-UserName').fill(userName);
  }

  async enterUserYearOfBirth(yearOfBirth: number): Promise<void> {
    await this.page.getByTestId('input-YearOfBirth').fill('');
    await this.page.getByTestId('input-YearOfBirth').fill(String(yearOfBirth));
  }

  async selectGender(genderLabel: string): Promise<void> {
    await this.page.getByTestId('select-Gender').selectOption({ label: genderLabel });
  }

  async clickUpdateButton(): Promise<void> {
    await this.page.getByTestId('button-Update').click();
  }
}