import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import Site from './site.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Save extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  //FK
  @column()
  declare userId: number

  @column()
  declare siteId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
  @belongsTo(() => Site)
  declare site: BelongsTo<typeof Site>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
