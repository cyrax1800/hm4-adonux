'use strict'

const Schema = use('Schema')

class ItemTableSchema extends Schema {

  up () {
    this.create('item', (table) => {
      table.increments()
      table.string('name')
      table.string('pic_url')
      table.integer('item_rarity_id').unsigned().references('id').inTable('item_rarity').onDelete('CASCADE').onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('item')
  }

}

module.exports = ItemTableSchema
