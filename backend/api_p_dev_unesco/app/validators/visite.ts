import vine from '@vinejs/vine'
const visiteValidator = vine.compile(
  vine.object({
    dateVisite: vine.date().before('today'),
  })
)

export { visiteValidator }
