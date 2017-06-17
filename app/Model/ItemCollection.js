'use strict'

const Lucid = use('Lucid')

class ItemCollection extends Lucid {
  static get table(){
    return 'item_collection'
  }

  item(){
    return this.belongsToMany('App/Model/Item')
  }
}

module.exports = ItemCollection
