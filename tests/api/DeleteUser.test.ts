import { test, expect, request, APIRequestContext } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('DeleteUser API tests', () => {
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

    test('DELETE /User/{id} when valid user id', async () => {
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

        const deleteResponse = await apiContext.delete(`User/${createdUserId}`);
        expect(deleteResponse.status()).toBe(200);

        const getResponse = await apiContext.get(`User/${createdUserId}`);
        expect(getResponse.status()).toBe(404);
    });

    test('DELETE /User/{id} when invalid user id', async () => {
        const deleteResponse = await apiContext.delete('User/999999');

        expect(deleteResponse.status()).toBe(404);
    });
});