'use strict'

const Lucid = use('Lucid')

class Item extends Lucid {
  static get table(){
    return 'item'
  }

  itemRarity(){
    return this.belongsTo('App/Model/ItemRarity')
  }
}

module.exports = Item
