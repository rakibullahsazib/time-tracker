
const user = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@doe.com'
}
const findFirstNameInput = () => cy.get('#firstName')
const findLastNameInput = () => cy.get('#lastName')
const findEmailInput = () => cy.get('#email')
const findSubmitBtn = () => cy.get('button')
const findFirstNameErrorMsg = () => cy.get('#firstName + p')
const findLastNameErrorMsg = () => cy.get('#lastName + p')
const findEmailErrorMsg = () => cy.get('#email + p')
const findSignInErrorMsg = () => cy.get('[data-testid=signInErrorMsg]')

const logInJohnDoe = () => {
  cy.visit('/')
  findFirstNameInput().type(user.firstName)
  findLastNameInput().type(user.lastName)
  findEmailInput().type(user.email)
  cy.wait(500)
  findSubmitBtn().click()
}
const logOut = () => {
  cy.get('[data-testid=sign-out-btn]').click()
}

describe.only('testing inputs', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  })

  it('successfully loads', () => {
    cy.visit('/')
  })

  it('can not log in if inputs are empty, show error messages', () => {
    cy.visit('/')
    findSubmitBtn().click()
    cy.url().should('not.include', '/home')
    findFirstNameErrorMsg().should('not.be.empty')
    findLastNameErrorMsg().should('not.be.empty')
    findEmailErrorMsg().should('not.be.empty')
  })
})

describe('successful login', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  })
  it('logs in user sucessfully and save user in session storage', () => {
    logInJohnDoe()
    cy.url().should('include', '/home')
  })
})

describe('login errors', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
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
    cy.url().should('not.include', '/home')
    findSignInErrorMsg().should('not.be.empty')
  })
})