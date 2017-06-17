'use strict'

const Helpers = use('Helpers')
var path  = require('path');

class ImageController {

    * index (request, response) {
      const avatar = request.file('filegambar', {
        maxSize: '2mb',
        allowedExtensions: ['jpg', 'png', 'jpeg']
      })
      const dataPost = request.post();
      const pathFolder = dataPost.path;
      var ext = avatar.extension();
      console.log(ext)
      var fileName = (dataPost.filename == '')?avatar.toJSON().name:(dataPost.filename+"."+ext);
      fileName = toLowerCase.toLowerCase().replace(/ /g,"_");
      var finalDestionation = path.join(Helpers.publicPath(), pathFolder);
      yield avatar.move(finalDestionation, fileName);

      if (!avatar.moved()) {
        response.badRequest(avatar.errors())
        return
      }

      return response.json({status: 'ok', path:pathFolder+'/'+fileName, filename:fileName});
    }
    * create (request, response) {}
    * store (request, response) {}
    * show (request, response) {}
    * edit (request, response) {}
    * update (request, response) {}
    * destroy (request, response) {}
}

module.exports = ImageController
