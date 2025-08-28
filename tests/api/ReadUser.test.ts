import { test, expect, request, APIRequestContext } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('ReadUser API tests', () => {
  let apiContext: APIRequestContext;
  let createdUserId: number | null = null;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  });

  test.afterEach(async () => {
    if (createdUserId !== null) {
      await apiContext.delete(`User/${createdUserId}`);
      createdUserId = null;
    }
  });

  test('GET /User returns array of valid users', async () => {
    const response = await apiContext.get('User');
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);

    for (const user of responseBody) {
      expect(user).toHaveProperty('id');
      expect(typeof user.id).toBe('string');

      expect(user).toHaveProperty('name');
      expect(typeof user.name).toBe('string');

      expect(user).toHaveProperty('yearOfBirth');
      expect(typeof user.yearOfBirth).toBe('number');
      expect(user.yearOfBirth).toBeGreaterThan(1900);

      expect(user).toHaveProperty('gender');
      expect(typeof user.gender).toBe('number');
    }
  });

  test('GET /User/{id} returns single User', async () => {
    const currentYear: number = new Date().getFullYear();
    const yearForAdult: number = currentYear - 20;
    const firstName: string = faker.person.firstName();

    const createResponse = await apiContext.post('User', {
      data: {
        name: firstName,
        yearOfBirth: yearForAdult,
        gender: 1
      },
    });

    const responseBody = await createResponse.json()
    createdUserId = responseBody.id;

    const getResponse = await apiContext.get(`User/${createdUserId}`);
    expect(getResponse.status()).toBe(200);

    const createdUser = await getResponse.json();

    expect(createdUser).toHaveProperty('id', responseBody.id);
    expect(createdUser).toHaveProperty('name', responseBody.name);
    expect(createdUser).toHaveProperty('yearOfBirth', responseBody.yearOfBirth);
    expect(createdUser).toHaveProperty('gender', responseBody.gender);
  });

  test('GET /User/{id} returns 404 for non-existing user', async () => {
    const response = await apiContext.get('User/999999');
    expect(response.status()).toBe(404);
  });
});