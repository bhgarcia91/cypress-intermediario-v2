import { faker } from '@faker-js/faker'

const options = {
    env: {
        snapshotOnly: true
    }
}

describe ('Set milestone on Issue', options, () =>{
    const issue = {
        title: faker.datatype.uuid(),
        description: faker.random.words(8),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }

    const milestone = {
        title: `Milestone ${faker.random.word()}`,
    }

    beforeEach(() =>
    {
        cy.api_deleteProjects()
        cy.login()
        cy.api_createIssue(issue)
            .then(response => {
                cy.api_createMilestone(response.body.project_id, milestone)
                cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
            })
    })
    it('sucessfully', () => {
        cy.gui_setMilestoneOnIssue(milestone)

        cy.get('.block.milestone').should('contain', milestone.title)
    })
})