import { test, expect } from '@playwright/test';

test('Update user name' , async ({page}) => {
await page.goto('https://traineeautomation.azurewebsites.net/');
const allEditButtons = page.locator('//a[@data-testid="button-Edit"]');
const firstEditButton = allEditButtons.first();
await firstEditButton.click();
const usernameField = page.locator('#inputUserName');
await usernameField.fill('testuser');

const updateButton = page.locator('//button[@data-testid="button-Update"]');
updateButton.click();

await expect(usernameField).toHaveValue('testuser');
});