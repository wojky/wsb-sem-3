describe('Login page', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/login');
  });

  it('handle bad credentials', () => {
    const username = 'wrong';
    const password = 'password';

    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);

    cy.get('button').contains('Login').click();
    cy.get('p.text-red-500').should('contain', 'Bad username or password');
  });

  it('allows the user to log in and logout correctly', () => {
    const username = 'pizzaman';
    const password = 'qwerty';

    // Fill in the username and password
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);

    // Click the login button
    cy.get('button').contains('Login').click();
    cy.url().should('include', '/menu');

    cy.get('button[test-id="header-logout-btn"]').should('contain', 'Logout');
    cy.get('button[test-id="header-logout-btn"]').click();

    cy.get('[test-id="header-login-btn"]').should('be.visible').click();
    cy.url().should('include', '/login');
  });
});
