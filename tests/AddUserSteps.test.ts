import { test } from '@playwright/test';
import { AddUserSteps } from '../steps/AddUserSteps';
import { AddUserPage } from '../pages/AddUserPage';
import { HomePage } from '../pages/HomePage';
import { DeleteUserSteps } from '../steps/DeleteUserSteps';
import { faker } from '@faker-js/faker';

let addUserSteps: AddUserSteps;
let addUserPage: AddUserPage;

test.beforeEach(async ({ page }) => {
    addUserPage = new AddUserPage(page);
    addUserSteps = new AddUserSteps(addUserPage, page);
});

test('Create user flow', async ({ page }) => {
    const currentYear: number = new Date().getFullYear();
    const yearOfBirthForAdult: number = currentYear - 20;
    const firstName: string = faker.person.firstName();
    const gender = 'Male';

    const homePage = new HomePage(page);
    const deleteUserSteps = new DeleteUserSteps(homePage, page);

    await addUserSteps.createUser(gender, firstName, yearOfBirthForAdult);
    await addUserSteps.verifyUserIsCreated(gender, firstName, yearOfBirthForAdult);

    await deleteUserSteps.deleteUserByName(firstName);
});

test('Name is required', async ({ page }) => {
    await addUserSteps.openAddUserForm();
    await addUserSteps.submitEmptyForm();
    await addUserSteps.expectNameIsRequiredError();
});

test('Name is too short', async ({ page }) => {
    await addUserSteps.openAddUserForm();
    await addUserSteps.submitWithShortName(generateRandomString(1));
    await addUserSteps.expectNameTooShortError();
});

test('Year of Birth is required', async ({ page }) => {
    await addUserSteps.openAddUserForm();
    await addUserSteps.submitEmptyForm();
    await addUserSteps.expectYearIsRequiredError();
});

test('Not valid Year of Birth is set', async ({ page }) => {
    const currentYear = new Date().getFullYear();

    await addUserSteps.openAddUserForm();
    await addUserSteps.submitWithInvalidYear(currentYear.toString());
    await addUserSteps.expectInvalidYearError();
});

function generateRandomString(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
