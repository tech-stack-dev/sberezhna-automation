import { HomePage } from '../pages/HomePage';
import { Page } from '@playwright/test';
import { DeleteUserConfirmationPage } from '../pages/DeleteUserConfirmationPage';

export class DeleteUserSteps {
  private deleteUserConfirmationPage: DeleteUserConfirmationPage;
  private homePage: HomePage;

  constructor(homePage: HomePage, page: Page) {
    this.homePage = homePage;
    this.deleteUserConfirmationPage = new DeleteUserConfirmationPage(page);
  }
    
  async deleteUserByName(name: string): Promise<void> {
    const userCell = await this.homePage.getUserByName(name);
    const userRow = userCell.locator('xpath=..');
    const deleteBtn = userRow.locator('[data-testid="button-Delete"]');
    await deleteBtn.click();

    await this.deleteUserConfirmationPage.confirmDeleting();
  }
  }