describe('locale 변경 테스트', () => {
  it('넷플릭스 사이트가 한국어로 나오는지 확인합니다.', () => {
    cy.clearAllCookies()
    cy.visit('https://www.netflix.com', {
      onBeforeLoad: (win) => {
        
        Object.defineProperty(win.navigator, 'language', {
          value: 'ko_KR'
        })
      }
    });
  })
  it('넷플릭스 사이트가 영어로 나오는지 확인합니다.', () => {

    cy.visit('https://www.netflix.com', {
      onBeforeLoad: (win) => {
        Object.defineProperty(win.navigator, 'language', {
          value: 'en_US'
        })
      }
    })

    const langSelector = cy.get('select[name="LanguageSelect"]');
    langSelector.should('have.value','en-KR');
  });
});