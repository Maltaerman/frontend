import InputPass from '../../src/components/Inputs/Input-pass.vue'

describe('<Input-pass />', () => {
  it('checks that the toggle password visibility works correctly', () => {
    cy.mount(InputPass)
    cy.get('input').invoke('attr', 'type').should('eq', 'password')
    cy.get('#viewPass').click()
    cy.get('input').invoke('attr', 'type').should('eq', 'text')
  })

  it('checks that invalid feedback is working correctly', () => {
    cy.mount(InputPass, { props: { modelValue: 'Asd112233' } })
    cy.get('input').click().blur()
    cy.get('#invalid-feedback').should('not.exist')
  })

  it('checks that invalid feedback is visible if the input doesnt pass validation', () => {
    cy.mount(InputPass, { props: { modelValue: 'asd112233' } })
    cy.get('input').click().blur()
    cy.get('#invalid-feedback').should('be.visible')
  })
})
