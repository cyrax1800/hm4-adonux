'use strict'

const Item = use('App/Model/Item')
const ItemRarity = use('App/Model/ItemRarity')

class ItemController {

  * item (request, response) {
    var items = yield Item.with('itemRarity').fetch();
    items = items.toJSON().map(function(item){
      delete item.item_rarity_id;
      return item;
    })
    return response.send(items)
  }

  * store(request,response){
    var data = request.post().data;
    yield Item.create({'name' : data.name,
                       'pic_url' :  data.imgPath,
                       'item_rarity_id' : data.rarity})

    return response.status(201).json({'status' : 'success'});
  }
  * update (request, response) {
    }
}

module.exports = new ItemController()
