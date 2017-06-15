'use strict'

const Lucid = use('Lucid')

class ItemRarity extends Lucid {
  static get table(){
    return 'item_rarity'
  }

  item(){
    return this.hasOne('App/Model/Item')
  }
}

module.exports = ItemRarity
