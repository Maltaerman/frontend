import authCommands from './commands/auth';

Cypress.Commands.add('login', authCommands.login);
Cypress.Commands.add('logout', authCommands.logout);
