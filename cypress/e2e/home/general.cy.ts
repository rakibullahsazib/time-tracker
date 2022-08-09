import { setupJohnDoe } from "../../support/functions";

describe('unauthorized access', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  })
  it('accessing homepage without loggin in should redirect to welcome page', () => {
    cy.visit('/')
    cy.url().should('include', '/login')
  })
})
describe('persisting user on reload', () => {
  beforeEach(() => {
    setupJohnDoe()
    cy.visit('/')
  })
  it('logged in user should be logged in after page reload', () => {
    cy.reload()
    cy.url().should('not.include', '/login')
  })
})