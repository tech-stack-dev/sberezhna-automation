import { HomePage } from '../pages/HomePage';
import { AddUserPage } from '../pages/AddUserPage';
import { Page, expect } from '@playwright/test';

export class AddUserSteps {
    private homePage: HomePage;
    private addUserPage: AddUserPage;

    constructor(addUserPage: AddUserPage, page: Page) {
        this.homePage = new HomePage(page);
        this.addUserPage = addUserPage;
    }
 
    async openAddUserForm(): Promise<void> {
        await this.addUserPage.navigateTo();
      }

    async createUser(gender: string, firstName: string, yearOfBirth: number): Promise<void> {
        await this.openAddUserForm();
        await this.addUserPage.selectGender(gender);
        await this.addUserPage.enterUserName(firstName);
        await this.addUserPage.enterYearOfBirth(yearOfBirth.toString());
        await this.addUserPage.clickCreateButton();
    }
    
      async submitEmptyForm(): Promise<void> {
        await this.addUserPage.clickCreateButton();
      }
    
      async submitWithShortName(name: string): Promise<void> {
        await this.addUserPage.enterUserName(name);
        await this.addUserPage.clickCreateButton();
      }
    
      async submitWithInvalidYear(year: string): Promise<void> {
        await this.addUserPage.enterYearOfBirth(year);
        await this.addUserPage.clickCreateButton();
      }

      async verifyUserIsCreated(gender: string, firstName: string, yearOfBirth: number): Promise<void> {
        await expect(await this.homePage.getUserByName(firstName)).toBeVisible();
        await expect(await this.homePage.getUserYearOfBirthByName(firstName)).toHaveText(yearOfBirth.toString());
        await expect(await this.homePage.getUserGenderByName(firstName)).toHaveText(gender);
    }
    
      async expectNameIsRequiredError(): Promise<void> {
        await expect(this.addUserPage.userNameInputValidationError).toHaveText('Name is requried');
      }
    
      async expectNameTooShortError(): Promise<void> {
        await expect(this.addUserPage.userNameInputValidationError).toHaveText('Name is too short');
      }
    
      async expectYearIsRequiredError(): Promise<void> {
        await expect(this.addUserPage.yearOfBirthInputValidationError).toHaveText('Year of Birth is requried');
      }
    
      async expectInvalidYearError(): Promise<void> {
        await expect(this.addUserPage.yearOfBirthInputValidationError).toHaveText('Not valid Year of Birth is set');
      }
}