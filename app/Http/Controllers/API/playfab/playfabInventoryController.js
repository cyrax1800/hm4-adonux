'use strict'

var PlayFab = require("playfab-sdk/Scripts/PlayFab/PlayFab");
var PlayFabClient = require("playfab-sdk/Scripts/PlayFab/PlayFabClient");
var PlayFabServer = require("playfab-sdk/Scripts/PlayFab/PlayFabServer");

class PlayfabController {

  * getUserInventory(request, response){
    var playfabId = request.get().playfabId;
    console.log(playfabId);
    PlayFabServer.GetUserInventory({
      "PlayFabId": playfabId
    }, function(error,result){
      if(result !== null){
        response.json(result)
      }else{
        response.status(error.code).json(error);
      }
    })
  }

  * revokeAnItem(request, response){
    var playfabId = request.post().playfabId;
    var itemInstance = request.post().itemInstance;
    var totalRequest = itemInstance.length;
    for(var i = 0; i< itemInstance.length;i++){
      PlayFabServer.RevokeInventoryItem({
        "PlayFabId": playfabId,
        "ItemInstanceId": itemInstance[i]
      }, function(error,result){
        if(result !== null){
          totalRequest--;
          if(totalRequest <= 0){
            response.json({result:"success"})
          }
        }else{
          response.status(error.code).json(error);
        }
      })
    }
  }

  * revokeAllItemInSegment(request,response){
    var segmentId = request.post().segmentId;
    var requestedSegment = 0;
    var totalPlayerGetInventory = 0;
    var ItemNeedToBeRevoke = 0;
    var continueToken = null;

    function revokeAllItem(playfabId, itemInstances){
      for(var i = 0; i< itemInstances.length;i++){
        PlayFabServer.RevokeInventoryItem({
          "PlayFabId": playfabId,
          "ItemInstanceId": itemInstances[i]
        }, function(error,result){
          if(result !== null){
            ItemNeedToBeRevoke--;
            if(ItemNeedToBeRevoke <= 0 && requestedSegment <= 0 && totalPlayerGetInventory <= 0){
              if(continueToken !== null){
                GetPlayerInSegment(continueToken)
              }else{
                console.log("success");
                response.json({result:"success"}) 
              }
            }
          }else{
            console.log(error);
            response.status(error.code).json(error);
          }
        })
      }
    }

    function getUserInventory(playfabId){
      PlayFabServer.GetUserInventory({
        "PlayFabId": playfabId
      }, function(error,result){
        totalPlayerGetInventory -= 1;
        if(result !== null){
          if(result.data.Inventory.length > 0){
            ItemNeedToBeRevoke += result.data.Inventory.length;
            var itemInstances = result.data.Inventory.map(function(inventory){
                return inventory.ItemInstanceId;
              })
            console.log(playfabId,itemInstances);
            revokeAllItem(playfabId,itemInstances);
          }else{
            if(totalPlayerGetInventory <= 0 && ItemNeedToBeRevoke <= 0){
              console.log("gk ada")
              GetPlayerInSegment(continueToken)
            }
          }
        }else{
          console.log(error);
          response.status(error.code).json(error);
        }
      })
    }

    function GetPlayerInSegment(continuationToken){
      requestedSegment += 1;
      var obj = {
        "SegmentId": segmentId,
        "SecondsToLive": 1800,
        "MaxBatchSize": 10
      }
      if(continuationToken !== null){
        obj.ContinuationToken = continuationToken;
      }
      continueToken = null;
      PlayFabServer.GetPlayersInSegment(obj, function(error,result){
        requestedSegment -= 1;
        if(result !== null){
          if(result.data.ContinuationToken){
            continueToken = result.data.ContinuationToken;
            console.log(result.data.ContinuationToken)
            // GetPlayerInSegment(result.data.ContinuationToken);
          }
          var playfabIds = result.data.PlayerProfiles.map(function(playerProfile){
              return playerProfile.PlayerId;
            })
          totalPlayerGetInventory += playfabIds.length;
          console.log(totalPlayerGetInventory);
          for(var i = 0; i< playfabIds.length;i++){
            console.log(playfabIds[i])
            getUserInventory(playfabIds[i])
          }
        }else{
          console.log(error);
          response.status(error.code).json(error);
        }
      })
    }

    GetPlayerInSegment(continueToken);
    
  }
}

module.exports = new PlayfabController()