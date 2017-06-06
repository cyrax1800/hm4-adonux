'use strict'

const Env = use('Env')
const Config = use('Config')
const Nuxt = require('nuxt')
const Backendless = require('backendless')

class NuxtController {

  constructor () {
    let config = Config.get('nuxt')
    config.dev = Env.get('NODE_ENV') === 'development'
    this.nuxt = new Nuxt(config)
      //   this.nuxt = nuxt
    if (config.dev) {
      this.nuxt.build()
    }

    Backendless.initApp('0C6AD465-D1A4-F8DA-FFE7-6A9F6AAB8700','8BB3C425-F58E-A830-FF07-FA90BF75F400','v1');
    Backendless.enablePromises();
  }

  * render (request, response) {
    this.nuxt.render(request.request, response.response)
  }

  * test (request, response) {
    response.json({asd:"test"})
  }
}

module.exports = new NuxtController()
