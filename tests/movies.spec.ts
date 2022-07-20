import { expect, test } from '@playwright/test';

const baseUrl = 'http://localhost:3000';
test('test movies', async ({ page }) => {
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
  // go to the movies page
  await page.goto(`${baseUrl}/movies`);
  // make sure to have the right title
  await expect(title).toHaveText('Movies');
  // go to the movie details page
  await page.goto(` ${baseUrl}/movies/616037`);
  await expect(title).toHaveText('Thor: Love and Thunder');
  const tagline = page.locator('h2');
  await expect(tagline).toHaveText('The one is not the only.');
  const addButton = page.locator('data-test-id=add-to-list-button');
  await addButton.click();
  // go to user profile
  await page.goto(`${baseUrl}/users/private-profile`);
  await expect(title).toHaveText('Hey, pipomajun!');
  // check if movie is in the list
  const isInList = page.locator('.watchlistItem');
  await expect(isInList).toContainText('Thor: Love and Thunder');
});
