const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}` //AccessToken criada para o projeto, já que as requisições aqui precisam de um

Cypress.Commands.add('api_createProject', project => {
    cy.request({
        method: 'POST',
        url: `/api/v4/projects`,
        body: {
            name: project.name,
            description: project.description,
            initialize_with_readme: true
        },
        headers: { Authorization: accessToken }
    })
})

Cypress.Commands.add('api_createIssue', issue => {
    cy.request({
        method: 'POST',
        url: `/api/v4/projects/${issue.project.name}/issues`,
        body: {
            name: issue.name,
            description: issue.description
        },
        headers: { Authorization: accessToken }
    })
})

Cypress.Commands.add('api_getAllProjects',() => {
    cy.request({
        method: 'GET',
        url: `/api/v4/projects`,
        headers: { Authorization: accessToken }
    })
})

