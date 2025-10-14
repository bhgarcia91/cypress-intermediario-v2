Cypress.Commands.add('login', (
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    { cacheSession = true} = {} /// se true eu digo se quero ou não fazer o cache da sessao
) =>  {
///Comando cria uma constante com lista de comandos que será retornada quando chamada durante o teste
    const login = () => {

        cy.visit('/users/sign_in')
        cy.get("[data-qa-selector='login_field']").type(user)
        cy.get("[data-qa-selector='password_field']").type(password, {log: false}) /// LOG informa que o password, como dado sensível, não apareça nos logs durante a execução
        cy.get("[data-qa-selector='sign_in_button']").click()
    }

    const validate = () => { // valida se ainda há uma session valida 
        cy.visit('/')
        cy.location('pathname', {timeout: 1000})
        .should('not.eq', '/users/sign_in')
    }

    const options = {
        cacheAcrossSpecs: true, // define que o cache vai  estar disponísvel entre os arquivos
        validate
    }

        if (cacheSession) {
            cy.session(user, login, options) // cria uma session passando o user, a propria constante login e as options que eu defini na outra constante 
        } 
        else {
            login()
        }
})

Cypress.Commands.add('logout', () =>{
    const logout = () => {
        cy.get('.qa-user-avatar').click()
        cy.contains('Sign out').click()
    }
    logout()
})

Cypress.Commands.add('CreateProject', (project) =>{
    const createProject = () => {
        cy.visit('/projects/new')
        cy.get('#project_name').type(project.name)
        cy.get('#project_description').type(project.description)
        cy.get('.qa-initialize-with-readme-checkbox').check();
        cy.get('[data-qa-selector="public_radio"]').check({ force: true })
         cy.contains('Create project').click();
    }
    createProject();


})

Cypress.Commands.add('CreateIssue', (issue) =>{
    const user = Cypress.env('user_name')
    const createIssue = () => {
        cy.visit(`/${user}/${issue.project.name}/issues/new`)
        cy.get('.qa-issuable-form-title').type(issue.title)
        cy.get('.qa-issuable-form-description').type(issue.description)
        cy.contains('Submit issue').click();
    }
    createIssue();
})

Cypress.Commands.add('gui_setLabelOnIssue', (label) => {
    cy.get('.qa-edit-link-labels').click()
    cy.contains(label.name).click()
    cy.get('body').click()
})

Cypress.Commands.add('gui_setMilestoneOnIssue', (milestone) => {
    cy.get('.block.milestone .edit-link').click()
    cy.contains(milestone.title).click()
})

