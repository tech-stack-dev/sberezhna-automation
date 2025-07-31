import { test } from '@playwright/test';
import { AddUserSteps } from '../steps/AddUserSteps';
import { AddUserPage } from '../pages/AddUserPage';
import { HomePage } from '../pages/HomePage';
import { DeleteUserSteps } from '../steps/DeleteUserSteps';
import { faker } from '@faker-js/faker';

test('Create user flow', async ({ page }) => {
    const currentYear: number = new Date().getFullYear();
    const yearOfBirthForAdult: number = currentYear - 20;
    const firstName: string = faker.person.firstName();
    const gender = 'Male';

    const addUserPage = new AddUserPage(page);
    const addUserSteps = new AddUserSteps(addUserPage, page);
    const homePage = new HomePage(page);
    const deleteUserSteps = new DeleteUserSteps(homePage, page);

    await addUserSteps.createUser(gender, firstName, yearOfBirthForAdult);
    await addUserSteps.verifyUserIsCreated(gender, firstName, yearOfBirthForAdult);

    deleteUserSteps.deleteUserByName(firstName);
});