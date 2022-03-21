/// <reference types="cypress" />

describe('Basic Tests', () => {

  beforeEach(() => {
    cy.visit('/')

  })

  it('We have correct page title', () => {
    cy.contains('NBA TEAMS')

  })

  it('Sort button is clickable', () => {
    cy.get('[data-testid=ArrowDropDownIcon').click()
    cy.get('[data-testid=ArrowDropUpIcon').click()
  })

  it('Pagination buttons are clickable', () => {
    cy.get('[data-testid=button-1]').click()
    cy.get('[data-testid=button-2]').click()
    cy.get('[data-testid=button-3]').click()
    cy.get('[data-testid=button-4]').click()
    cy.get('[data-testid=button-5]').click()
    cy.get('[data-testid=prev-pag-button]').click()
    cy.get('[data-testid=prev-pag-button]').click()
    cy.get('[data-testid=next-pag-button]').click()
  })
  it('Input field should work', () => {

    cy.get('[data-testid=input').type('Lebron').type('{enter}')

    cy.contains('Lebron James').should('exist')
  })
})