const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}` //AccessToken criada para o projeto, já que as requisições aqui precisam de um

Cypress.Commands.add('api_createProject', project => {
   return cy.request({
        method: 'POST',
        url: `/api/v4/projects`,
        body: {
            name: project.name,
            description: project.description,
            initialize_with_readme: true,
            visibility: "public"
        },
        headers: { Authorization: accessToken }
    })
})

Cypress.Commands.add('api_createIssue', issue => {
    return cy.api_createProject(issue.project)
        .then(response => {
    return        cy.request({
                method: 'POST',
                url: `/api/v4/projects/${response.body.id}/issues`,
                body: {
                    title: issue.title,
                    description: issue.description
                },
                headers: { Authorization: accessToken }
            })
        })
})

Cypress.Commands.add('api_getAllProjects',() => {
    cy.request({
        method: 'GET',
        url: `/api/v4/projects`,
        headers: { Authorization: accessToken }
    })
})

//esse teste executa uma função e com os resultados dessa função, executa outra dentro dela
Cypress.Commands.add('api_deleteProjects', () => {
    cy.api_getAllProjects().then(res => {
        res.body.forEach(project => cy.request({
            method: 'DELETE',
            url: `/api/v4/projects/${project.id}`,
            headers: { Authorization: accessToken }
        }))
    })
})
