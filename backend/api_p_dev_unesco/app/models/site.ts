import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Site extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string
  @column()
  declare image_path: string
  @column()
  declare description: string
  @column()
  declare register_date: DateTime
  @column()
  declare longitude: number
  @column()
  declare latitude: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
