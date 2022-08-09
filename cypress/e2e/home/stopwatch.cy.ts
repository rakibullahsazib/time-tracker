import { setupJohnDoe } from "../../support/functions"

describe('check initial state', () => {
  beforeEach(() => {
    setupJohnDoe()
    cy.visit('/')
  })
  it('stopwatch countdown set to 0', () => {
    cy.get('[data-testid=stopwatch-countdown]').should('have.text', '00:00:00')
  })
  it('stopwatch button exist', () => {
    cy.get('[data-testid=stopwatch-button]').should('exist')
  })
})

describe('check timer', () => {
  beforeEach(() => {
    setupJohnDoe()
    cy.visit('/')
    // set date to a past date at 10 am
    cy.clock(1000 * 60 * 60 * 4)
  })
  it('start countdown when btn clicked', () => {
    cy.get('[data-testid=stopwatch-button]').click()
    cy.tick(1000 * 5)
    cy.get('[data-testid=stopwatch-countdown]').should('have.text', '00:00:05')
    cy.tick(1000 * 60)
    cy.get('[data-testid=stopwatch-countdown]').should('have.text', '00:01:05')
    cy.tick(1000 * 60 * 60)
    cy.get('[data-testid=stopwatch-countdown]').should('have.text', '01:01:05')
  })
})

describe('save tracked time', () => {
  beforeEach(() => {
    setupJohnDoe()
    cy.visit('/')
    // set date to a past date at 10 am
    cy.clock(1000 * 60 * 60 * 4)
  })
  it('should show error message if tracked time is less than one minute', () => {
    cy.get('[data-testid=stopwatch-button]').click()
    cy.tick(1000 * 59)
    cy.get('[data-testid=stopwatch-button]').click()

    cy.get('[data-testid=message-modal]').should('exist')
    cy.get('[data-testid=message-modal-message]').should('exist')
    cy.get('[data-testid=message-modal-message]').should('not.be.empty')

    // close modal
    cy.get('[data-testid=modal-close-btn]').click()
    cy.get('[data-testid=message-modal]').should('not.exist')
  })
  it('show save tracked time modal if one minute or more is tracked', () => {
    cy.get('[data-testid=stopwatch-button]').click()
    cy.tick(1000 * 60)
    cy.get('[data-testid=stopwatch-button]').click()
    cy.get('[data-testid=modal-time-tracked-form]').should('exist')

    // close the modal
    cy.get('[data-testid=modal-close-btn]').should('be.visible')
    cy.get('[data-testid=modal-close-btn]').click()
    // cy.wait(500)

    // start timer again
    cy.get('[data-testid=stopwatch-button]').should('be.visible')
    cy.get('[data-testid=stopwatch-button]').click()
    cy.tick(1000 * 80)
    cy.get('[data-testid=stopwatch-button]').click()
    cy.get('[data-testid=modal-time-tracked-form]').should('exist')
  })
  it('save tracked time if one minute or more is tracked', () => {
    cy.get('[data-testid=stopwatch-button]').click()
    cy.tick(1000 * 60)
    cy.get('[data-testid=stopwatch-button]').click()
    cy.get('[data-testid=modal-time-tracked-form]').should('exist')

    cy.get('[data-testid=time-log-table-body]').should('not.exist')

    cy.get('[data-testid=modal-time-tracked-form] button').click()

    cy.get('[data-testid=time-log-table-body]').should('exist')
    cy.get('[data-testid=time-log-table-body]').find('tr').should('have.length', 1)

    // close modal
    cy.get('[data-testid=modal-close-btn]').click()
    cy.get('[data-testid=save-tracked-time-modal]').should('not.exist')
  })
})