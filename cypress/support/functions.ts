export const setupJohnDoe = () => {
  sessionStorage.clear();
  localStorage.clear();
  localStorage.setItem('users', JSON.stringify([{ firstName: "john", lastName: "doe", email: "john@doe.com", id: 1 }]))
  sessionStorage.setItem('currentUser', JSON.stringify({ firstName: "john", lastName: "doe", email: "john@doe.com", id: 1 }))
}
export const fillManualTimeLogForm = (startHour: number, startMin: number, endHour: number, endMin: number, description: string) => {
  cy.get('[data-testid=manual-time-log-start-time-picker] select').eq(0).select(startHour)
  cy.get('[data-testid=manual-time-log-start-time-picker] select').eq(1).select(startMin)
  cy.get('[data-testid=manual-time-log-end-time-picker] select').eq(0).select(endHour)
  cy.get('[data-testid=manual-time-log-end-time-picker] select').eq(1).select(endMin)
  cy.get('[data-testid=manual-time-log-description]').get('textarea').type(description)
}
export const logManualTimeLog = (startHour: number, startMin: number, endHour: number, endMin: number, description: string) => {
  fillManualTimeLogForm(startHour, startMin, endHour, endMin, description)
  cy.get('[data-testid=manual-time-log-submit-btn]').click()
}