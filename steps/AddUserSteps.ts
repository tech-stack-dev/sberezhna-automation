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

    async createUser(gender: string, firstName: string, yearOfBirth: number): Promise<void> {
        await this.addUserPage.navigateTo();
        await this.addUserPage.selectGender(gender);
        await this.addUserPage.enterUserName(firstName);
        await this.addUserPage.enterYearOfBirth(yearOfBirth.toString());
        await this.addUserPage.clickCreateButton();
    }

    async verifyUserIsCreated(gender: string, firstName: string, yearOfBirth: number): Promise<void> {
        await expect(await this.homePage.getUserByName(firstName)).toBeVisible();
        await expect(await this.homePage.getUserYearOfBirthByName(firstName)).toHaveText(yearOfBirth.toString());
        await expect(await this.homePage.getUserGenderByName(firstName)).toHaveText(gender);
    }
}