import { test, expect, request, APIRequestContext } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('UpdateUser API tests', () => {
  let apiContext: APIRequestContext;
  let createdUserId: number | null = null;
  const currentYear: number = new Date().getFullYear();

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  });

  test.beforeEach(async () => {
    const yearForAdult: number = currentYear - 20;
    const firstName: string = faker.person.firstName();

    const createResponse = await apiContext.post('User', {
      data: {
        name: firstName,
        yearOfBirth: yearForAdult,
        gender: 1
      },
    });
    expect(createResponse.status()).toBe(200);
    const responseBody = await createResponse.json()
    createdUserId = responseBody.id;
  });

  test.afterEach(async () => {
    if (createdUserId !== null) {
      await apiContext.delete(`User/${createdUserId}`);
      createdUserId = null;
    }
  });

  test('PUT User/{id} updates name, yearOfBirth, gender', async () => {
    const newYearOfBirth: number = currentYear - 21;
    const newFirstName: string = faker.person.firstName();

    const response = await apiContext.put(`User/${createdUserId}`, {
      data: {
        name: newFirstName,
        yearOfBirth: newYearOfBirth,
        gender: 2
      },
    });

    const responseBody = await response.json()
    
    expect(responseBody).toHaveProperty('name', newFirstName);
    expect(responseBody).toHaveProperty('yearOfBirth', newYearOfBirth);
    expect(responseBody).toHaveProperty('gender', 2);
  });

  test('Name field is required when PUT User/{id}', async () => {
    const response = await apiContext.put(`User/${createdUserId}`, {
      data: {
        yearOfBirth: 2005,
        gender: 1
      },
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json()

    expect(responseBody).toHaveProperty('errors');
    expect(responseBody.errors.Name).toContain('The Name field is required.');
    expect(responseBody.errors.Name).toContain("'Name' must not be empty.");
  });

  test('Name field data validation when PUT User/{id}', async () => {
    const response = await apiContext.put(`User/${createdUserId}`, {
      data: {
        name: '',
        yearOfBirth: 2005,
        gender: 1
      },
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('errors');
    expect(responseBody.errors.Name).toContain("'Name' must not be empty.");
    expect(responseBody.errors.Name).toContain("'Name' must be between 3 and 14 characters. You entered 0 characters.");
  });

  test('YearOfBirth field data validation when PUT User/{id}', async () => {
    const newFirstName: string = faker.person.firstName();
    const response = await apiContext.put(`User/${createdUserId}`, {
      data: {
        name: newFirstName,
        yearOfBirth: 0,
        gender: 2
      },
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('errors');
    expect(responseBody.errors.YearOfBirth).toContain("'Year Of Birth' must not be empty.");
    expect(responseBody.errors.YearOfBirth).toContain("'Year Of Birth' must be between 1900 and 2005. You entered 0.");
  });
});