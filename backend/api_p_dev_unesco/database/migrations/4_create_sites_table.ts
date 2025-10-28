import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sites'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('image_path').nullable()
      table.string('description').notNullable()
      table.timestamp('register_date').notNullable()
      table.decimal('longitude', 9, 6).notNullable()
      table.decimal('latitude', 8, 6).notNullable()

      table.integer('type_fk').unsigned().references('id').inTable('types').notNullable()
      table.integer('country_fk').unsigned().references('id').inTable('countries').notNullable()

      //created
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
