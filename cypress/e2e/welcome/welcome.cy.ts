
import { user } from "../../support/data"

const logInJohnDoe = () => {
  cy.get('#firstName').type(user.firstName)
  cy.get('#lastName').type(user.lastName)
  cy.get('#email').type(user.email)
  cy.wait(500)
  cy.get('button').click()
}
const logOut = () => {
  cy.get('[data-testid=sign-out-btn]').click()
}

describe('testing inputs', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  })

  it('successfully loads', () => {
    cy.visit('/login')
  })

  it('on input blur, should show error message if input is empty', () => {
    cy.visit('/login')
    cy.get('#firstName').type(' ').blur()
    cy.get('#firstName + p').should('not.be.empty')
    cy.get('#lastName').type(' ').blur()
    cy.get('#lastName + p').should('not.be.empty')
    cy.get('#email').type(' ').blur()
    cy.get('#email + p').should('not.be.empty')

    cy.get('#email').type('srterstn ').blur()
    cy.get('#email + p').should('not.be.empty')
  })

  it('can not log in if inputs are empty, show error messages', () => {
    cy.visit('/login')
    cy.get('button').click()
    cy.url().should('include', '/login')
    cy.get('#firstName + p').should('not.be.empty')
    cy.get('#lastName + p').should('not.be.empty')
    cy.get('#email + p').should('not.be.empty')
  })
})

describe('successful login', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    cy.visit('/login')
  })
  it('logs in user sucessfully and save user in session storage', () => {
    logInJohnDoe()
    cy.url().should('not.include', '/login')
  })
})

describe('login errors', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    cy.visit('/login')
  })
  it('shows error when trying to save a new user with an existing users email address', () => {
    logInJohnDoe()
    logOut()
    cy.get('#firstName').type('Sherlock')
    cy.get('#lastName').type('Holmes')
    cy.get('#email').type(user.email)
    cy.wait(500)
    cy.get('[data-testid=signInErrorMsg]').should('not.exist')
    cy.get('button').click()
    cy.url().should('include', '/login')
    cy.get('[data-testid=signInErrorMsg]').should('not.be.empty')
  })
})