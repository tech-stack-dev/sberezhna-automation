import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AddUserPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly userNameInputValidationError = this.page.locator('//span[@data-testId="inputError-UserName"]');
  readonly yearOfBirthInputValidationError = this.page.locator('#inputYearOfBirth-error');

  async navigateTo(): Promise<void> {
    await this.goto('https://traineeautomation.azurewebsites.net/Forms/AddUser');
    await this.verifyPageUrl('AddUser');
  }

  async enterUserName(userName: string): Promise<void> {
    await this.page.getByTestId('input-UserName').fill(userName);
  }

  async enterYearOfBirth(yearOfBirth: string): Promise<void> {
    await this.page.getByTestId('input-YearOfBirth').fill(yearOfBirth);
  }

  async selectGender(gender: string): Promise<void> {
    await this.page.getByTestId('select-Gender').selectOption(gender);
  }

  async clickCreateButton(): Promise<void> {
    await this.page.getByTestId('button-Create').click();
  }

  async clickCancelButton(): Promise<void> {
    await this.page.getByTestId('button-Cancel').click();
  }
}