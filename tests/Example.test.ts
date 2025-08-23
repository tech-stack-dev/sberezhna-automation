import { test, expect } from '@playwright/test';

test.skip('Skipped because it is example. Update user name test, before refactoring' , async ({page}) => {
await page.goto('https://traineeautomation.azurewebsites.net/');
const allEditButtons = page.locator('//a[@data-testid="button-Edit"]');
const firstEditButton = allEditButtons.first();
await firstEditButton.click();
const userNameField = page.locator('#inputUserName');
await userNameField.fill('testuser');

const updateButton = page.locator('//button[@data-testid="button-Update"]');
updateButton.click();

await expect(page.locator('//td[@data-testId="td-UserName"]').first()).toHaveText('testuser');
});