import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { DeleteUserConfirmationPage } from '../pages/DeleteUserConfirmationPage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

readonly userNameColumn = this.page.locator('//td[@data-testId="td-UserName"]');

async navigateTo(): Promise<void> {
    await this.goto('https://traineeautomation.azurewebsites.net/');
    await this.verifyPageTitle('TS Trainee course');
  }

  async clickEditButton(): Promise<void> {
    await this.page.getByTestId('button-Edit').first().click();
  }

  async clickDeleteButton(): Promise<void> {
    await this.page.getByTestId('button-Delete').first().click();
  }

  async getUserByName(name: string): Promise<Locator> {
    return this.page.getByText(name);
  }

  async getUserYearOfBirthByName(name: string): Promise<Locator> {
    const nameOfNewlyCreatedUser = await this.getUserByName(name);
    return nameOfNewlyCreatedUser.locator('+ td');
  }

  async getUserGenderByName(name: string): Promise<Locator> {
    const nameOfNewlyCreatedUser = await this.getUserByName(name);
    const userRow = nameOfNewlyCreatedUser.locator('xpath=..');
    return userRow.locator('[data-testid="td-Gender"]');
  }

  async deleteUserByName(name: string): Promise<void> {
    const userCell = await this.getUserByName(name);
    const userRow = userCell.locator('xpath=..');
    const deleteBtn = userRow.locator('[data-testid="button-Delete"]');
    await deleteBtn.click();

    const deleteUserConfirmationPage = new DeleteUserConfirmationPage(this.page);
    await deleteUserConfirmationPage.confirmDeleting();
  }
}