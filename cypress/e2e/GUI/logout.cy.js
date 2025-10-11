describe('logout', () => {

    beforeEach(() => {
        cy.login()
        cy.visit('/')
    })

    it('sucess', () => {
      cy.logout()
      
      cy.get("[data-qa-selector='sign_in_button']").should('be.visible');
    })
  })