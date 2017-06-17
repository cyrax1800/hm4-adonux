'use strict'

const Schema = use('Schema')

class ItemCollectionTableSchema extends Schema {

  up () {
    this.create('item_collection', (table) => {
      // alter item_collection table
      table.increments()
      table.string('name')
      table.string('pic_url')
      table.timestamps()
    })
  }

  down () {
    this.table('item_collection', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = ItemCollectionTableSchema
