import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AddUserPage } from '../pages/AddUserPage';

test('Add new user with all fields' , async ({page}) => {
    const homePage = new HomePage(page);
    const addUserPage = new AddUserPage(page);

    await addUserPage.navigateTo();
    await addUserPage.selectGender('Male');
    await addUserPage.enterUserName('testuser');
    await addUserPage.enterYearOfBirth('2000');
    await addUserPage.clickCreateButton();
    
    const newlyCreatedUser = page.getByText('testuser');
    await expect(newlyCreatedUser).toBeVisible();

    const userYearOfBirth = newlyCreatedUser.locator('+ td');
    const parentRow = newlyCreatedUser.locator('xpath=..');
    const userGender = parentRow.locator('[data-testid="td-Gender"]');
  
    await expect(userYearOfBirth).toHaveText('2000');
    await expect(userGender).toHaveText('Male');
    });