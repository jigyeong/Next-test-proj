import React from 'react'
import BookItem from './book-item'

describe('<BookItem />', () => {
  it('BookItem 이 잘 뜨는지 확인한다.', () => {
    // see: https://on.cypress.io/mounting-react
    
    cy.request('http://localhost:12345/book/4')
      .then((response) => {
        const book = response.body
        cy.mount(<BookItem {...book} />)
        console.log('book', book)
        cy.get('img').should('have.attr', 'src', book.coverImgUrl)
      })
  })
})