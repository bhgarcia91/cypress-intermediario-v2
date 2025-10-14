import { faker } from '@faker-js/faker'
const options = {
    env: {
        snapshotOnly: true
    }
}
describe('Create a public Project', () => {

    beforeEach(() => {
        cy.api_deleteProjects();
        cy.login()
    })
    it('Sucessfully', () => {
        const project = {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }


        cy.api_createProject(project)
        cy.visit(`${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`);
        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`)
        cy.contains(project.name).should('be.visible')
        cy.contains(project.description).should('be.visible')
    })
}
)