import { faker } from '@faker-js/faker'

const options = {
    env: {
        snapshotOnly: true
    }
}
describe('Create Issue', () => {
    const issue = {
        title: faker.datatype.uuid(),
        description: faker.random.words(8),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }

    beforeEach(() =>{
            cy.api_deleteProjects();
            cy.login()
    }
        )

    it('Sucessfully', () => {

       // cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${issue.project.name}`)
        cy.CreateIssue(issue)
        cy.visit('/`${Cypress.config(\'baseUrl\')}/${Cypress.env(\'user_name\')}/${issue.project.name}`')
        cy.contains(issue.title).should('be.visible')
        cy.contains(issue.description).should('be.visible')
        /***cy.get('.issue-details').shoul('contain', issue.title)
            .and('contain', issue.description)***///outra maneira de buscar o elemento, mas dessa vez procurando dentro de uma outra classe
    })
})