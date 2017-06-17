'use strict'

const Lucid = use('Lucid')

class ItemCollectionItem extends Lucid {
  static get table(){
    return 'item_collection_item'
  }
}

module.exports = ItemCollectionItem
