import {test, expect} from '@playwright/test';


test('검색 및 댓글 달기 테스트 (Oneway)', async ({ page }, testInfo) => {

    // const browser = await chromium.launch({
    //     headless: false,
    // });

    // const context = await browser.newContext({
    //     permissions: ['camera'],
    //     recordVideo: {
    //         dir: path.join(__dirname, 'results/videos'),
    //         size: { width: 1280, height: 720 }
    //     }
    // });

    // page = await context.newPage();
    
    await test.step('데이터 서버가 문제없는지 확인한다.', async () => {
        const response = await page.request.get('http://localhost:12345/book');
        await expect(response).toBeOK();
    })

    await test.step('페이지가 잘 뜨는지 확인한다.', async () => {
        await page.goto('/');
        await page.screenshot({path: `${testInfo.outputDir}/screenshot/ ${testInfo.project.name} ${new Date().getTime()}.png`});
        await expect(page.getByTestId('index')).toBeVisible();
    })

    await test.step('검색창에 타이핑한 키워드가 검색이 되는지 확인한다.', async () => {
        // await page.goto('/');
        const searchbox = page.getByRole('textbox');
        const SEARCH_WORD = '리액트';

        await searchbox.click();
        await searchbox.fill(SEARCH_WORD);
        await searchbox.press('Enter');

        const books = page.getByTestId('books');
        await expect(books.getByText(SEARCH_WORD)).toBeVisible();
    });

    await test.step('댓글과 작성자가 달리는지 확인한다.', async () => {
        const books = page.getByTestId('books').first();
        await books.click();
        
        const user = `User ${new Date().getTime()}`;
        const comment = `댓글 ${new Date().getTime()}`;

        await page.fill('input[name="author"]', user);
        await page.fill('textarea[name="content"]', comment);

        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);

        await expect(page.getByText(user)).toBeVisible();
        await expect(page.getByText(comment)).toBeVisible();

        await page.screenshot({path: `${testInfo.outputDir}/screenshot/ ${testInfo.project.name} ${new Date().getTime()} end.png`});
    });
})