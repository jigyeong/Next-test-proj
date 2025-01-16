import { test, expect } from '@playwright/test';
import path from "node:path";

test.describe('검색 및 댓글 달기 테스트', () => {
    test('데이터 서버가 문제없는지 확인한다.', async ({ page }) => {
        const response = await page.request.get('http://localhost:12345/book');
        await expect(response).toBeOK();
    })

    test('페이지가 잘 뜨는지 확인한다.', async({page})=>{
        await page.goto('http://localhost:3000/');
        await page.screenshot({path: path.join(__dirname,`screenshot ${new Date().getTime()}.png`)});
        await expect(page.getByTestId('index')).toBeVisible();
    })

    test('검색창에 타이핑한 키워드가 검색이 되는지 확인한다.', async ({page}) => {
        await page.goto('http://localhost:3000/');
        const searchbox = page.getByRole('textbox');
        const SEARCH_WORD = '리액트';

        await searchbox.click();
        await searchbox.fill(SEARCH_WORD);
        await searchbox.press('Enter');

        const books = page.getByTestId('books');
        await expect(books.getByText(SEARCH_WORD)).toBeVisible();
    });

    test.skip('댓글과 작성자가 달리는지 확인한다.', async ({page}) => {
        const books = page.getByTestId('books');
        await books.click();

    });
})
// test('test', async ({ page }) => {
//     await page.goto('http://localhost:3000/');
//     await page.getByRole('textbox').click();
//     await page.getByRole('textbox').fill('');
//     await page.getByRole('textbox').press('CapsLock');
//     await page.getByRole('textbox').fill('리액트');
//     await page.getByRole('textbox').press('Enter');
//     await page.getByRole('link', { name: '도서 한 입 크기로 잘라 먹는 리액트의 표지 이미지 한 입 크기로 잘라 먹는 리액트 자바스크립트 기초부터 애플리케이션 배포까지 이정환 | 프로그' }).click();
//     await page.getByPlaceholder('리뷰 내용').click();
//     await page.getByPlaceholder('리뷰 내용').fill('리뷰작성');
//     await page.getByPlaceholder('작성자').click();
//     await page.getByPlaceholder('작성자').fill('홍길동');
//     await page.getByRole('button', { name: '작성하기' }).click();
// });