import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    constructor(page: Page) {
      super(page);
    }

readonly userNameColumn = this.page.locator('//td[@data-testId="td-UserName"]');
readonly editButton = this.page.locator('//a[@data-testid="button-Edit"]');
readonly deleteButton = this.page.locator('//a[@data-testid="button-Delete"]');

async navigateTo(): Promise<void> {
    await this.goto('https://traineeautomation.azurewebsites.net/');
    await this.verifyPageTitle('TS Trainee course');
  }

async clickEditButton(): Promise<void> {
    await this.editButton.first().click();
  }

  async clickDeleteButton(): Promise<void> {
    await this.deleteButton.first().click();
  }
}