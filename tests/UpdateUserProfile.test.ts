import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { EditUserPage } from '../pages/EditUserPage';

test('Update user name using Page Object' , async ({page}) => {
    const homePage = new HomePage(page);
    const editUserPage = new EditUserPage(page);

    await homePage.navigateTo();
    await homePage.clickEditButton();
    await editUserPage.enterUserName('testuser');
    await editUserPage.clickUpdateButton();

    await expect(homePage.userNameColumn.first()).toHaveText('testuser');
    });