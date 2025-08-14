import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AddUserPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly genderDropdown = this.page.locator('#selectGender');
  readonly userNameInput = this.page.locator('#inputUserName');
  readonly yearOfBirthInput = this.page.locator('#inputYearOfBirth');
  readonly createButton = this.page.locator('//button[@data-testId="button-Create"]');
  readonly cancelButton = this.page.locator('//button[@data-testId="button-Cancel"]');
  readonly userNameInputValidationError = this.page.locator('//span[@data-testId="inputError-UserName"]');
  readonly yearOfBirthInputValidationError = this.page.locator('#inputYearOfBirth-error');

  async navigateTo(): Promise<void> {
    await this.goto('https://traineeautomation.azurewebsites.net/Forms/AddUser');
    await this.verifyPageUrl('AddUser');
  }

  async enterUserName(userName: string): Promise<void> {
    await this.userNameInput.fill(userName);
  }

  async enterYearOfBirth(yearOfBirth: string): Promise<void> {
    await this.yearOfBirthInput.fill(yearOfBirth);
  }

  async selectGender(gender: string): Promise<void> {
    await this.genderDropdown.selectOption(gender);
  }

  async clickCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickCancelButton(): Promise<void> {
    await this.cancelButton.click();
  }
}