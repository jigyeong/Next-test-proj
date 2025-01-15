import { test, expect } from '@playwright/test';

test.describe('한국어 테스트', ()=> {
  test.use({ locale: 'ko-KR' })
  test('한국어로 나타나는지 확인한다.', async ({ page }) => {
    await page.goto('https://www.netflix.com/');
    await expect(page.getByRole('banner').getByLabel('언어 선택')).toContainText('한국어');
  });
})

test.describe('영어 테스트', ()=> {
  test.use({ locale: 'en-US' })
  test('locale 변경시 영어로 나타나는지 확인한다.', async ({ page }) => {
    await page.goto('https://www.netflix.com/');
    await expect(page.getByRole('banner').getByLabel('Select Language')).toContainText('English');
    // ...
  });
})

