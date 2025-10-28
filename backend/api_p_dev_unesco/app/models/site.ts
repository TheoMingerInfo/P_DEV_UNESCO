import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Save from './save.js'
import Visite from './visite.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Type from './type.js'
import Country from './country.js'

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

  // FK
  @column()
  declare typeFK: number
  @column()
  declare countryFK: number

  @hasMany(() => Save)
  declare saves: HasMany<typeof Save>
  @hasMany(() => Visite)
  declare visite: HasMany<typeof Visite>

  @belongsTo(() => Type)
  declare type: BelongsTo<typeof Type>
  @belongsTo(() => Country)
  declare country: BelongsTo<typeof Country>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
