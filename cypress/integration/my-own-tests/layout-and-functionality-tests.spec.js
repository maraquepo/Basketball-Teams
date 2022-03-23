/// <reference types="cypress" />

const properties = ['Team Name', 'City', 'Abbreviation', 'Conference', 'Division'];

describe('Tests for Alkira Take Home', () => {
  beforeEach(() => {
    cy.visit('/');
    // Aliases
    cy.get('[data-testid=button-1]').as('buttonOne');
    cy.get('[data-testid=button-2]').as('buttonTwo');
    cy.get('[data-testid=button-3]').as('buttonThree');
    cy.get('[data-testid=button-4]').as('buttonFour');
    cy.get('[data-testid="button-5"]').as('buttonFive')
    cy.get('[data-testid=next-pag-button]').as('buttonNext');
  });

  describe('HTML test', () => {
    it('Should have the title of the application in the window', () => {
      cy.title().should('contain', 'Alkira UI Frontend Position Take Home')
    })
  })

  describe('Initial Layout Tests', () => {
    it('We have correct header', () => {
      cy.get('.Title').should('contain', 'NBA TEAMS')
    });

    it('Should have a form', () => {
      cy.get('form').should('exist');
    });

    it('Displays 7 teams on main page', () => {
      cy.get(':nth-child(n+1) > .tableData').should('have.length', 7);
      cy.get('@buttonTwo').click().get(':nth-child(n+1) > .tableData').should('have.length', 7);
      cy.get('@buttonThree').click().get(':nth-child(n+1) > .tableData').should('have.length', 7);
    });

    for (const property of properties) {
      it(`Should have a column for ${property} and is titled as ${property}`, () => {
        cy.get(`[data-testid='${property}'] > .card-body`).contains(property);
      });
    }
  });

  describe('Buttons Tests', () => {
    it('Sort button is clickable and renders correct teams', () => {
      cy.get('[data-testid=ArrowDropUpIcon]')
        .click()
        .get('[data-testid="team-Wizards"] > .card-body')
        .contains('Wizards');
      cy.get('[data-testid=ArrowDropDownIcon]')
        .click()
        .get('[data-testid="team-Hawks"] > .card-body')
        .contains('Hawks');
    });

    it('Pagination buttons shows correct page', () => {
      cy.get('@buttonOne').click().get('[data-testid="team-Hawks"] > .card-body').contains('Hawks');
      cy.get('@buttonThree')
        .click()
        .get('[data-testid="team-Grizzlies"] > .card-body')
        .contains('Grizzlies');
      cy.get('@buttonFour').click();
      cy.get('@buttonFive').click().get('[data-testid=prev-pag-button]').click();
      cy.get('[data-testid=prev-pag-button]').click();
      cy.get('@buttonNext')
        .click()
        .get('[data-testid="team-Magic"] > .card-body')
        .contains('Magic');
    });
  });

  describe('Input field test', () => {
    it('Input field should work', () => {
      const name = 'Lebron James';

      // cy.get('[data-testid="input"]').type(name).should('have.value', name)
      cy.get('[data-testid="input"]').type(name);
      cy.get('form').submit();
    });
  });

  describe('Modal tests', () => {
    it('Should not show modal on initial screen', () => {
      cy.get('.modal-content').should('not.exist');
    });

    it("Should open modal upon clicking on a team's row", () => {
      cy.get(':nth-child(2) > .tableData').click().get('.modal-content');
    });

    it("Modal should close upon hitting 'x' button", () => {
      cy.get(':nth-child(2) > .tableData').click();
      cy.get('.modal-content');
      cy.get('.btn-close').click();
      cy.get('.modal-content').should('not.exist');
    });

    it('Modal should close upon hitting esc key', () => {
      cy.get(':nth-child(2) > .tableData').click();
      cy.get('.modal-content').type('{esc}');
      cy.get('.modal-content').should('not.exist');
    });

    it('Modal should close upon clicking outside of modal', () => {
      cy.get(':nth-child(2) > .tableData').click();
      cy.get('.modal').click('bottomLeft');
      cy.get('.modal-content').should('not.exist');
    });
  });

  describe('Tests for API', () => {
    it('Should render correct data', () => {
      cy.intercept('https://www.balldontlie.io/api/v1/players?search=Lebron', {fixture: 'lebron'}).as('lebronFixture')
      cy.get('[data-testid="input"]').type('Lebron {enter}')
      cy.wait('@lebronFixture').its('request.url').should('contain', 'search=Lebron')
    })

    it('should render NBA player details', () => {
      cy.intercept('https://www.balldontlie.io/api/v1/players?search=Lebron', {fixture: 'lebron'}).as('lebronFixture')
      cy.get('[data-testid="input"]').type('Lebron {enter}')
      cy.get('.modal-content').should('contain', 'LeBron James')

    })


  })

  describe('API Testing', () => {

    it('GET - read', () => {
      cy.request('GET', 'https://www.balldontlie.io/api/v1/players?search=Lebron').then((res) => {
        expect(res).to.have.property('status', 200)
        expect(res.body).to.not.be.null
        expect(res.body.data).to.have.length(1)
      })
    })
  })


});


