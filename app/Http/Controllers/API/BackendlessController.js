'use strict'

const Nuxt = require('nuxt')
const Backendless = require('backendless')
var fs = require("fs")
var JSZip = require("jszip")

class BackendlessController {

  * file (request, response) {
    var path = request.param(0)
    var getQuery = request.get()
    var queryString = (getQuery.key)?getQuery.key:""
    console.log(path);
    Backendless.Files.listing( "/media/" + path, "*"+ queryString+"*", false )
    .then(function(result){
      var data = {};
      data.files = result.data.map(function (obj) {
        obj.isFile = true;
        obj.checked = false;
        if(!obj.name.endsWith(".txt")){
          obj.isFile = false;
        }
        return obj;
      })
      data.path = path
      response.json(data);
    })
    .catch(function(result)
    {
      console.log(result)
    });
  }

  * download(request,response){
    var data = request.post()
    var selectedFolderOrFile = data.data.selectedData;
    var allPublicURL = [];
    var totalFetch = 0;

    function sendData(){
      console.log(allPublicURL);
    
      response.json({result:allPublicURL});
    }

    function getFile(folder){
      Backendless.Files.listing( folder.url, "*", false )
      .then(function (result){
        var tmpObj = {};
        tmpObj.files = result.data.map(function (obj) {
          obj.isFile = true;
          obj.checked = false;
          if(!obj.name.endsWith(".txt")){
            obj.isFile = false;
          }
          return obj;
        })
        totalFetch--;
        loopResult(tmpObj.files);
      })
      .catch(function(error){
        console.log(error);
      })
    }

    function loopResult(dataFile){
      var hasFetch = false;
      for(var i = 0; i < dataFile.length; i++){
        if(dataFile[i].isFile == false){
          totalFetch++;
          getFile(dataFile[i])
          hasFetch = true;
        }else{
          allPublicURL.push(dataFile[i].publicUrl)
        }
      }
      if(!hasFetch && (totalFetch == 0))sendData();
    }

    loopResult(selectedFolderOrFile);
    
  }

  * test (request, response) {
    response.json({asd:"asd"})
  }
}

module.exports = new BackendlessController()
