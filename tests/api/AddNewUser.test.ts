import { test, expect, request, APIRequestContext } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('AddNewUser API tests', () => {
  let apiContext: APIRequestContext;
  let createdUserId: number | null = null;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
    });
  });

  test.afterEach(async () => {
    if (createdUserId !== null) {
      await apiContext.delete(`User/${createdUserId}`);
      createdUserId = null;
    }
  });

  test('POST returns 200 code when create new User', async () => {
    const currentYear: number = new Date().getFullYear();
    const yearForAdult: number = currentYear - 20;
    const firstName: string = faker.person.firstName();

    const response = await apiContext.post('User', {
      data: {
        name: firstName,
        yearOfBirth: yearForAdult,
        gender: 1
      },
    });
    const responseBody = await response.json()
    createdUserId = responseBody.id;

    expect(response.status()).toBe(200);
  });

  test('Returned body of POST request has id, correct name, gender', async () => {
    const currentYear: number = new Date().getFullYear();
    const yearForAdult: number = currentYear - 20;
    const firstName: string = faker.person.firstName();

    const response = await apiContext.post('User', {
      data: {
        name: firstName,
        yearOfBirth: yearForAdult,
        gender: 1
      },
    });
    console.log(await response.json());
    const responseBody = await response.json()
    createdUserId = responseBody.id;
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('name', firstName);
    expect(responseBody).toHaveProperty('yearOfBirth', yearForAdult);
    expect(responseBody).toHaveProperty('gender', 1);
  });

  test('Name field is required in Post new user', async () => {
    const response = await apiContext.post('User', {
      data: {
        yearOfBirth: 2005,
        gender: 1
      },
    });
    expect(response.status()).toBe(400);

    const responseBody = await response.json();
    console.log(responseBody);

    expect(responseBody).toHaveProperty('errors');
    expect(responseBody.errors.Name).toContain('The Name field is required.');
    expect(responseBody.errors.Name).toContain("'Name' must not be empty.");
  });

  test('Name field data validation when Post new user', async () => {
    const response = await apiContext.post('User', {
      data: {
        name: '',
        yearOfBirth: 2005,
        gender: 1
      },
    });
    expect(response.status()).toBe(400);

    const responseBody = await response.json();
    console.log(responseBody);

    expect(responseBody).toHaveProperty('errors');
    expect(responseBody.errors.Name).toContain("'Name' must not be empty.");
    expect(responseBody.errors.Name).toContain("'Name' must be between 3 and 14 characters. You entered 0 characters.");
  });

  test('YearOfBirth field data validation when Post new user', async () => {
    const firstName: string = faker.person.firstName();
    const response = await apiContext.post('User', {
      data: {
        name: firstName,
        yearOfBirth: 0,
        gender: 1
      },
    });
    expect(response.status()).toBe(400);

    const responseBody = await response.json();
    console.log(responseBody);

    expect(responseBody).toHaveProperty('errors');
    expect(responseBody.errors.YearOfBirth).toContain("'Year Of Birth' must not be empty.");
    expect(responseBody.errors.YearOfBirth).toContain("'Year Of Birth' must be between 1900 and 2005. You entered 0.");
  });
});