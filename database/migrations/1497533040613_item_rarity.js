'use strict'

const Schema = use('Schema')

class ItemRarityTableSchema extends Schema {

  up () {
    this.create('item_rarity', (table) => {
      table.increments()
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('item_rarity')
  }

}

module.exports = ItemRarityTableSchema
