
import { user } from "../../support/data"
const findFirstNameInput = () => cy.get('#firstName')
const findLastNameInput = () => cy.get('#lastName')
const findEmailInput = () => cy.get('#email')
const findSubmitBtn = () => cy.get('button')
const findFirstNameErrorMsg = () => cy.get('#firstName + p')
const findLastNameErrorMsg = () => cy.get('#lastName + p')
const findEmailErrorMsg = () => cy.get('#email + p')
const findSignInErrorMsg = () => cy.get('[data-testid=signInErrorMsg]')

const logInJohnDoe = () => {
  findFirstNameInput().type(user.firstName)
  findLastNameInput().type(user.lastName)
  findEmailInput().type(user.email)
  cy.wait(500)
  findSubmitBtn().click()
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

  it('can not log in if inputs are empty, show error messages', () => {
    cy.visit('/login')
    findSubmitBtn().click()
    cy.url().should('include', '/login')
    findFirstNameErrorMsg().should('not.be.empty')
    findLastNameErrorMsg().should('not.be.empty')
    findEmailErrorMsg().should('not.be.empty')
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
    findFirstNameInput().type('Sherlock')
    findLastNameInput().type('Holmes')
    findEmailInput().type(user.email)
    cy.wait(500)
    findSignInErrorMsg().should('not.exist')
    findSubmitBtn().click()
    cy.url().should('include', '/login')
    findSignInErrorMsg().should('not.be.empty')
  })
})