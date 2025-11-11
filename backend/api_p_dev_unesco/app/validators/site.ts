import vine from '@vinejs/vine'

const getSitesQueryValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
    sort: vine.string().in(['name', 'country_fk', 'type_fk']).optional(), //Sort by name, country or type
    order: vine.string().in(['asc', 'desc']).optional(), // sort order
    countryId: vine.number().exists(async (db, value) => {
      const country = await db.from('countries').where('id', value).first()
      return !!country
    }),
    typeId: vine.number().exists(async (db, value) => {
      const type = await db.from('types').where('id', value).first()
      return !!type
    }),
    search: vine.string().trim().minLength(1).optional(),
  })
)

export { getSitesQueryValidator }
