import { Page, Locator, expect } from '@playwright/test';
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
    return this.page.locator('table tr').filter({
      has: this.page.getByText(name)
    });
  }

  async getUserYearOfBirthByName(name: string): Promise<Locator> {
    const userRow = await this.getUserByName(name);
    return userRow.getByTestId('td-YearOfBirth');
  }

  async getUserGenderByName(name: string): Promise<Locator> {
    const userRow = await this.getUserByName(name);
    return userRow.getByTestId('td-Gender');
  }

  async deleteUserByName(name: string): Promise<void> {
    const userRow = await this.getUserByName(name);
    const deleteBtn = userRow.getByTestId('button-Delete');
    await deleteBtn.click();

    const deleteUserConfirmationPage = new DeleteUserConfirmationPage(this.page);
    await deleteUserConfirmationPage.confirmDeleting();
  }

  async editUserByName(name: string): Promise<void> {
    const userRow = await this.getUserByName(name);
    const editBtn = userRow.getByTestId('button-Edit');
    await editBtn.click();
  }
}