import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'visites'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.date('date_visite').notNullable()

      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('site_id').unsigned().references('id').inTable('sites').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
