import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class EditUserPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly updateButton = this.page.locator('//button[@data-testId="button-Update"]');
  readonly userNameInput = this.page.locator('#inputUserName');
  readonly yearOfBirthInput = this.page.locator('#inputYearOfBirth');
  readonly genderDropdown = this.page.locator('#selectGender');

  async enterUserName(userName: string): Promise<void> {
    await this.userNameInput.fill(userName);
  }

  async enterUserYearOfBirth(yearOfBirth: number): Promise<void> {
    await this.yearOfBirthInput.fill('');
    await this.yearOfBirthInput.fill(String(yearOfBirth));
  }

  async selectGender(genderLabel: string): Promise<void> {
    await this.genderDropdown.selectOption({ label: genderLabel });
  }

  async clickUpdateButton(): Promise<void> {
    await this.updateButton.click();
  }
}