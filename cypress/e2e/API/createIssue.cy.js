import { faker } from '@faker-js/faker'
describe('Create Issue', () => {
    const issue = {
        name: faker.datatype.uuid(),
        description: faker.random.words(8),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }
    beforeEach(() => {
        cy.api_createProject(issue.project)
    })
    it('Sucessfully', ()=> {
        cy.api_createIssue(issue)
            .then(response => {
                expect(response.statusCode).to.equal(201)
                expect(response.body.name).to.equal(issue.name)
                expect(respnose.body.description).to.equal(issue.description)
            })
    })
})