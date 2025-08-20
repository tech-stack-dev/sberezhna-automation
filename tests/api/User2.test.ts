import { test, expect } from '@playwright/test';
import axios, { AxiosInstance } from 'axios';

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
    const response = await api.post('/User', {
      name: 'Test User',
      yearOfBirth: 2005,
      gender: 1,
    });
    expect(response.status).toBe(200);
  });
});