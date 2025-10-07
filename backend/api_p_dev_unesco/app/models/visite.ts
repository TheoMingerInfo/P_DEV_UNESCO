import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Visite extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare dateVisite: Date

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
