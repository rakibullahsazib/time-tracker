import { fillManualTimeLogForm, logManualTimeLog, setupJohnDoe } from "../../support/functions"

describe('check input elements', () => {
  beforeEach(() => {
    setupJohnDoe()
    cy.visit('/')
  })
  it('all inputs and submit btn exist', () => {
    cy.get('[data-testid=manual-time-log-date-picker]').should('exist')
    cy.get('[data-testid=manual-time-log-start-time-picker] select').should('exist')
    cy.get('[data-testid=manual-time-log-end-time-picker] select').should('exist')
    cy.get('[data-testid=manual-time-log-description]').should('exist')
    cy.get('[data-testid=manual-time-log-submit-btn]').should('exist')
  })
  it('submit button is disabled initially', () => {
    cy.get('[data-testid=manual-time-log-submit-btn]').should('be.disabled')
  })
})

describe('time log form filling errors', () => {
  beforeEach(() => {
    setupJohnDoe()
    cy.visit('/')
    // set date to a past date at 10 am
    cy.clock(1000 * 60 * 60 * 4)
  })
  it('btn should be disabled when time difference is less than 1 minute', () => {
    fillManualTimeLogForm(9, 20, 9, 20, "My description")
    cy.get('[data-testid=manual-time-log-submit-btn]').should('be.disabled')
  })
  it('shows error message when start date is after end date', () => {
    fillManualTimeLogForm(9, 20, 9, 10, "My description")
    cy.get('[data-testid=manual-time-log-submit-btn]').should('be.disabled')
    cy.get('[data-testid=manual-time-log-error-message]').should('not.be.empty')
  })
  it('shows error message when end date is in future time', () => {
    fillManualTimeLogForm(9, 10, 10, 20, "My description")
    cy.get('[data-testid=manual-time-log-submit-btn]').should('be.disabled')
    cy.get('[data-testid=manual-time-log-error-message]').should('not.be.empty')
  })
  it('shows error message when start date is in future time', () => {
    fillManualTimeLogForm(10, 10, 10, 20, "My description")
    cy.get('[data-testid=manual-time-log-submit-btn]').should('be.disabled')
    cy.get('[data-testid=manual-time-log-error-message]').should('not.be.empty')
  })
})

describe('time log && errors for coinciding with existing timelog', () => {
  beforeEach(() => {
    setupJohnDoe()
    cy.visit('/')
    // set date to a past date at 10 am
    cy.clock(1000 * 60 * 60 * 4)
  })
  it('add time logs successfully', () => {
    fillManualTimeLogForm(9, 10, 9, 20, "My description")
    cy.get('[data-testid=manual-time-log-submit-btn]').should('not.be.disabled')

    // time log table should be empty
    cy.get('[data-testid=time-log-table-body]').should('not.exist')

    cy.get('[data-testid=manual-time-log-submit-btn]').click()
    cy.get('[data-testid=manual-time-log-success-message]').should('not.be.empty')

    // time log table should have one row
    cy.get('[data-testid=time-log-table-body]').should('exist')
    cy.get('[data-testid=time-log-table-body]').find('tr').should('have.length', 1)

    // try logging another one coninciding start time with saved log end time
    logManualTimeLog(9, 20, 9, 30, "My description")
    cy.get('[data-testid=time-log-table-body]').find('tr').should('have.length', 2)
    // try logging another one coninciding end time with saved log start time
    logManualTimeLog(8, 0, 9, 10, "My description")
    cy.get('[data-testid=time-log-table-body]').find('tr').should('have.length', 3)
  })

  it('shows error message when start date or end date collide with existing time log', () => {
    logManualTimeLog(9, 10, 9, 20, "My description")
    cy.get('[data-testid=time-log-table-body]').find('tr').should('have.length', 1)

    // try logging an exact same timelog
    logManualTimeLog(9, 10, 9, 20, "My description")
    cy.get('[data-testid=manual-time-log-error-message]').should('not.be.empty')
    cy.get('[data-testid=time-log-table-body]').find('tr').should('have.length', 1)

    // try logging when start time is in between saved timelog
    logManualTimeLog(9, 15, 9, 30, "My description")
    cy.get('[data-testid=manual-time-log-error-message]').should('not.be.empty')
    cy.get('[data-testid=time-log-table-body]').find('tr').should('have.length', 1)

    // try logging when end time is in between saved timelog
    logManualTimeLog(9, 1, 9, 15, "My description")
    cy.get('[data-testid=manual-time-log-error-message]').should('not.be.empty')
    cy.get('[data-testid=time-log-table-body]').find('tr').should('have.length', 1)

    // try logging when start time and end time both are in between saved timelog
    logManualTimeLog(9, 12, 9, 15, "My description")
    cy.get('[data-testid=manual-time-log-error-message]').should('not.be.empty')
    cy.get('[data-testid=time-log-table-body]').find('tr').should('have.length', 1)

    // try logging when start time and end time includes saved timelog
    logManualTimeLog(9, 1, 9, 35, "My description")
    cy.get('[data-testid=manual-time-log-error-message]').should('not.be.empty')
    cy.get('[data-testid=time-log-table-body]').find('tr').should('have.length', 1)
  })
})

describe('show error time tracker is on and manual time log conicides with current time', () => {
  beforeEach(() => {
    setupJohnDoe()
    cy.visit('/')
    // set date to a past date at 10 am
    cy.clock(1000 * 60 * 60 * 4)
  })
  it('show error time tracker is on and manual time log conicides with current time', () => {
    // start time tracker
    cy.get('[data-testid=stopwatch-button]').click()
    cy.tick(1000 * 60 * 5)

    fillManualTimeLogForm(9, 59, 10, 2, "My description")
    cy.get('[data-testid=manual-time-log-error-message]').should('not.be.empty')
    cy.get('[data-testid=manual-time-log-submit-btn]').should('be.disabled')
  })
})