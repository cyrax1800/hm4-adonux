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
}

module.exports = new ItemController()
