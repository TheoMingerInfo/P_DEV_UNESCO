import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Site from './site.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Country extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare iso: string

  @column()
  declare continent: 'Europe' | 'Asie' | 'Afrique' | 'Amérique' | 'Océanie' | 'Antarctique'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Site)
  declare site: HasMany<typeof Site>
}
