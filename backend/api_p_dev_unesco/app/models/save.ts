import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Save extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  //FK
  @column()
  declare userFK: number

  @column()
  declare siteFK: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
