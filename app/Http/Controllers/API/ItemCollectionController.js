'use strict'

const Item = use('App/Model/Item')
const ItemCollection = use('App/Model/ItemCollection')

class ItemCollectionController {

  * index (request, response) {
    var items = yield ItemCollection.with('item','item.itemRarity').fetch();
    return response.json(items)
  }

  * store(request,response){

    return response.status(201).json({'status' : 'success'});
  }
  * update (request, response) {
    }
}

module.exports = new ItemCollectionController()
