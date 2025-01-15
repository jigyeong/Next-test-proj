import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill('');
    await page.getByRole('textbox').press('CapsLock');
    await page.getByRole('textbox').fill('리액트');
    await page.getByRole('textbox').press('Enter');
    await page.getByRole('link', { name: '도서 한 입 크기로 잘라 먹는 리액트의 표지 이미지 한 입 크기로 잘라 먹는 리액트 자바스크립트 기초부터 애플리케이션 배포까지 이정환 | 프로그' }).click();
    await page.getByPlaceholder('리뷰 내용').click();
    await page.getByPlaceholder('리뷰 내용').fill('리뷰작성');
    await page.getByPlaceholder('작성자').click();
    await page.getByPlaceholder('작성자').fill('홍길동');
    await page.getByRole('button', { name: '작성하기' }).click();
});