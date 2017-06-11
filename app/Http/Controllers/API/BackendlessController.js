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
    Backendless.Files.listing( "/media/" + path, "*"+ queryString+"*", false )
    .then(function(result){
      result = result.data.map(function (obj) {
        obj.isFile = true;
        obj.checked = false;
        if(!obj.name.endsWith(".txt")){
          obj.isFile = false;
        }
        return obj;
      })
      response.json(result);
    })
    .catch(function(result)
    {
      console.log(result)
    });
  }

  * download(request,response){
    var data = request.post()
    var selectedFolderOrFile = data.data.selectedData;
    var zip = new JSZip();
    // zip.generateAsync({type:"blob"}).then(function (base64) {
    //     location.href="data:application/zip;base64," + base64;
    // });
    // zip
    //   .generateNodeStream({type:'nodebuffer',streamFiles:true})
    //   .pipe(fs.createWriteStream('out.zip'))
    //   .on('finish', function () {
    //       // JSZip generates a readable stream with a "end" event,
    //       // but is piped here in a writable stream which emits a "finish" event.
    //       console.log("out.zip written.");
    //   });
    response.json({result:"success"});
  }

  * test (request, response) {
    response.json({asd:"asd"})
  }
}

module.exports = new BackendlessController()
