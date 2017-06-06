'use strict'

const Nuxt = require('nuxt')
const Backendless = require('backendless')

class BackendlessController {

  * file (request, response) {
    Backendless.Files.listing( "/web", "*.html", true )
    .then(function(result){
      response.json(result)
    })
    .catch(function(result)
    {
      console.log(result)
    });
  }

  * test (request, response) {
    response.json({asd:"asd"})
  }
}

module.exports = new BackendlessController()
