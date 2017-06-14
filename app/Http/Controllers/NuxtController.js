'use strict'

const Env = use('Env')
const Config = use('Config')
const Nuxt = require('nuxt')
const Backendless = require('backendless')
var PlayFab = require('playfab-sdk/Scripts/PlayFab/PlayFab');

class NuxtController {

  constructor () {
    let config = Config.get('nuxt')
    config.dev = Env.get('NODE_ENV') === 'development'
    this.nuxt = new Nuxt(config)
      //   this.nuxt = nuxt
    if (config.dev) {
      this.nuxt.build()
    }

    Backendless.initApp(Env.get('BACKENDLESS_APP_ID'),Env.get('BACKENDLESS_SECRET'),'v1');
    Backendless.enablePromises();

    PlayFab.settings.titleId = Env.get('PLAYFAB_TITLE_ID');
    PlayFab.settings.developerSecretKey = Env.get('PLAYFAB_SECRET_KEY');
  }

  * render (request, response) {
    this.nuxt.render(request.request, response.response)
  }

  * test (request, response) {
    response.json({asd:"test"})
  }
}

module.exports = new NuxtController()
