// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
require('cypress-xpath')

// Alternatively you can use CommonJS syntax:
// require('./commands')
const jsonAssertion = require("soft-assert")

Cypress.Commands.add('softContains', (actual, expected, message) => {
  jsonAssertion.softContains(actual, expected, message)
  if (jsonAssertion.jsonDiffArray.length) {
    jsonAssertion.jsonDiffArray.forEach(diff => {

      const log = Cypress.log({
        name: 'Soft contains error',
        displayName: 'softContains',
        message: diff.error.message
      })
    
    })
  }
});

Cypress.Commands.add('softAssert', (actual, expected, message) => {
  jsonAssertion.softAssert(actual, expected, message)
  if (jsonAssertion.jsonDiffArray.length) {
    jsonAssertion.jsonDiffArray.forEach(diff => {

      const log = Cypress.log({
        name: 'Soft assertion error',
        displayName: 'softAssert',
        message: diff.error.message
      })
    
    })
  }
});

Cypress.Commands.add('softAssertAll', () => jsonAssertion.softAssertAll())
