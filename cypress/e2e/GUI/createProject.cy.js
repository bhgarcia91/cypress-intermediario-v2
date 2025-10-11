import { faker } from '@faker-js/faker'

describe('Create a public Project', () => {
    beforeEach(() => {
        cy.login()
    })
    it('Sucessfully', () => {
        const project = {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
        cy.CreateProject(project);

        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`)
        cy.contains(project.name).should('be.visible')
        cy.contains(project.description).should('be.visible')
    })
}
)