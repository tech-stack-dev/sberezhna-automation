import { test, expect, request, APIRequestContext } from '@playwright/test';

test.describe('User API tests', () => {
  let apiContext: APIRequestContext;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: 'https://traineeautomation.azurewebsites.net/api/',
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  });

  test('GET /User', async () => {
    const response = await apiContext.get('User');

    expect(response.status()).toBe(200);
  });

  test('POST /User', async () => {
    const response = await apiContext.post('User', {
      data: {
        name: 'Test User',
        yearOfBirth: 2005,
        gender: 1
      },
    });
    expect(response.status()).toBe(200);
  });
});