'use strict'

const Schema = use('Schema')

class ItemCollectionItemTableSchema extends Schema {

  up () {
    this.create('item_collection_item', (table) => {
      table.increments()
      table.integer('item_collection_id').unsigned().references('id').inTable('item_collection').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('item_id').unsigned().references('id').inTable('item').onDelete('CASCADE').onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('item_collection_item')
  }

}

module.exports = ItemCollectionItemTableSchema
