'use strict'

var PlayFab = require("playfab-sdk/Scripts/PlayFab/PlayFab");
var PlayFabClient = require("playfab-sdk/Scripts/PlayFab/PlayFabClient");
var PlayFabServer = require("playfab-sdk/Scripts/PlayFab/PlayFabServer");
const Env = use('Env');

class PlayfabController {

  * loginCustomID (request, response) {
    var loginRequest = {
        TitleId: PlayFab.settings.titleId,
        CustomId: "OrIgAmIngAll",
        CreateAccount: true
    };

    PlayFabClient.LoginWithCustomID(loginRequest, function (error,result) {
      if(result !== null){
        response.json(result)
      }else{
        response.json(error)
      }
    });    
  }
}

module.exports = new PlayfabController()