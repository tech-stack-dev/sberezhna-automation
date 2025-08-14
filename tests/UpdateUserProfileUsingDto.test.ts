import { test, expect, request, APIRequestContext, APIResponse } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { EditUserPage } from '../pages/EditUserPage';
import { UserSteps } from '../steps/UserSteps';
import { faker } from '@faker-js/faker';

test.describe('User API', () => {
  let apiContext: APIRequestContext;
  let createResponse: APIResponse;;
  let userSteps: UserSteps;

  const currentYear: number = new Date().getFullYear();
  const yearForAdult: number = currentYear - 20;
  const firstName: string = faker.person.firstName();
  const gender = 1;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: 'https://traineeautomation.azurewebsites.net/api/',
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    userSteps = new UserSteps();
  });

  test.beforeEach(async () => {
    createResponse = await userSteps.createUser(apiContext, firstName, yearForAdult, gender);
  });

  test.afterEach(async () => {
    const createdUser = await createResponse.json();
    const userId = createdUser.id;
    await userSteps.deleteUser(apiContext, userId);
  });

  test('Update user name', async ({ page }) => {
    const newFirstName: string = faker.person.firstName();

    const homePage = new HomePage(page);
    const editUserPage = new EditUserPage(page);

    await homePage.navigateTo();
    await homePage.editUserByName(firstName);
    await editUserPage.enterUserName(newFirstName);
    await editUserPage.clickUpdateButton();

    await expect(await homePage.getUserByName(newFirstName)).toBeVisible();
  });

  test('Update user year of birth', async ({ page }) => {
    const newYearForAdult: number = yearForAdult + 1;

    const homePage = new HomePage(page);
    const editUserPage = new EditUserPage(page);

    await homePage.navigateTo();
    await homePage.editUserByName(firstName);
    await editUserPage.enterUserYearOfBirth(newYearForAdult);
    await editUserPage.clickUpdateButton();

    await expect(await homePage.getUserYearOfBirthByName(firstName)).toHaveText(newYearForAdult.toString());
  });

  test('Update user gender', async ({ page }) => {
    const newGender = 'Female';

    const homePage = new HomePage(page);
    const editUserPage = new EditUserPage(page);

    await homePage.navigateTo();
    await homePage.editUserByName(firstName);
    await editUserPage.selectGender(newGender);
    await editUserPage.clickUpdateButton();

    await expect(await homePage.getUserGenderByName(firstName)).toHaveText(newGender);
  });
});