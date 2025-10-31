import { test, expect } from '@playwright/test';
import axios from "axios";
import type { AxiosInstance } from "axios";
import { faker } from '@faker-js/faker';

test.describe('User API tests (Axios)', () => {
  let api: AxiosInstance;

  test.beforeAll(() => {
    api = axios.create({
      baseURL: 'https://traineeautomation.azurewebsites.net/api',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  });

  test('GET /User', async () => {
    const response = await api.get('/User');
    expect(response.status).toBe(200);
  });

  test('POST /User', async () => {
    const currentYear: number = new Date().getFullYear();
    const yearForAdult: number = currentYear - 20;
    const firstName: string = faker.person.firstName();

    const response = await api.post('/User', {
      name: 'Test User',
      yearOfBirth: 2005,
      gender: 1,
    });
    expect(response.status).toBe(200);
  });
});