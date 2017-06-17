'use strict'

const Lucid = use('Lucid')

class Item extends Lucid {
  static get table(){
    return 'item'
  }

  static get hidden () {
    return ['item_rarity_id',"_pivot_item_collection_id","_pivot_item_id"]
  }

  itemRarity(){
    return this.belongsTo('App/Model/ItemRarity')
  }

  itemCollection(){
    return this.belongsToMany('App/Model/ItemCollection')
  }
}

module.exports = Item
