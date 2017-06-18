'use strict'

const Item = use('App/Model/Item')
const ItemCollection = use('App/Model/ItemCollection')
const ItemCollectionItem = use('App/Model/ItemCollectionItem')

class ItemCollectionController {

  * index (request, response) {
    var items = yield ItemCollection.with('item','item.itemRarity').fetch();
    return response.json(items)
  }

  * store(request,response){
    var data = request.post().data;
    var itemCollection = yield ItemCollection.create({'name' : data.name,
                       'pic_url' :  data.imgPath
                       })

    var pivotTable = data.items.map(function(item){
      return {'item_collection_id':itemCollection.id, 'item_id':item.id}
    })
    const itemCollection_Item = yield ItemCollectionItem.createMany(pivotTable);
    return response.status(201).json({'status' : 'success'});
  }

  * update (request, response) {
    
    return response.status(201).json({'status' : 'success'});
  }
}

module.exports = new ItemCollectionController()
