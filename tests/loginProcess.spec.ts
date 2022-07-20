import { expect, test } from '@playwright/test';

const baseUrl = 'http://localhost:3000';
test('test login process', async ({ page }) => {
  // go to the landing page
  await page.goto(baseUrl);
  // make sure to have the right title
  const title = page.locator('h1');
  await expect(title).toHaveText('Hey, you!');
  // go to the login page
  await page.goto(`${baseUrl}/login`);
  await expect(title).toHaveText('Login');
  // fill in the form
  await page.locator('data-test-id=input-username').fill('pipomajun');
  await page.locator('data-test-id=input-password').fill('pipomajun');
  // click the login button
  const loginButton = page.locator('data-test-id=button-login');
  await loginButton.click();
  await expect(page).toHaveURL(`${baseUrl}/users/private-profile`);
  await expect(title).toHaveText('Hey, pipomajun!');
});
