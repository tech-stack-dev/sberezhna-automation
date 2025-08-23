import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AddUserPage } from '../pages/AddUserPage';
import { faker } from '@faker-js/faker';


test('Add new user with all fields' , async ({page}) => {
    const currentYear: number = new Date().getFullYear();
    const yearForAdult: number = currentYear - 20;
    const firstName: string = faker.person.firstName();
    const gender = 'Male';

    const homePage = new HomePage(page);
    const addUserPage = new AddUserPage(page);

    await addUserPage.navigateTo();
    await addUserPage.selectGender(gender);
    await addUserPage.enterUserName(firstName);
    await addUserPage.enterYearOfBirth(yearForAdult.toString());
    await addUserPage.clickCreateButton();
    
    
    await expect(await homePage.getUserByName(firstName)).toBeVisible();
    await expect(await homePage.getUserYearOfBirthByName(firstName)).toHaveText(yearForAdult.toString());
    await expect(await homePage.getUserGenderByName(firstName)).toHaveText(gender);

    await homePage.deleteUserByName(firstName);
    });

test('Name is required' , async ({page}) => {
    const addUserPage = new AddUserPage(page);
    await addUserPage.navigateTo();
    await addUserPage.clickCreateButton();

    await expect(addUserPage.userNameInputValidationError).toHaveText('Name is requried');
    });

test('Name is too short' , async ({page}) => {
     const addUserPage = new AddUserPage(page);
    await addUserPage.navigateTo();
    await addUserPage.enterUserName(generateRandomString(1));
    await addUserPage.clickCreateButton();
    
    await expect(addUserPage.userNameInputValidationError).toHaveText('Name is too short');
    });

test('Year of Birth is requried' , async ({page}) => {
    const addUserPage = new AddUserPage(page);
    await addUserPage.navigateTo();
    await addUserPage.clickCreateButton();
    
    await expect(addUserPage.yearOfBirthInputValidationError).toHaveText('Year of Birth is requried');
    });

test('Not valid Year of Birth is set' , async ({page}) => {
    const currentYear = new Date().getFullYear();

    const addUserPage = new AddUserPage(page);
    await addUserPage.navigateTo();
    await addUserPage.enterYearOfBirth(currentYear.toString());
    await addUserPage.clickCreateButton();
        
    await expect(addUserPage.yearOfBirthInputValidationError).toHaveText('Not valid Year of Birth is set');
    });
    


    function generateRandomString(length: number): string {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * chars.length);
          result += chars[randomIndex];
        }
      
        return result;
      }