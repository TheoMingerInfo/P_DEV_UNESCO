//ok pour l'instant, reste à tester
import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(3).maxLength(32),
    password: vine.string().minLength(8).maxLength(512),
  })
)
export const registerValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .minLength(3)
      .maxLength(32)
      .unique(async (query, field) => {
        //peut être il faut enlever le "s" de users
        const user = await query.from('users').where('username', field).first()
        return !user
      }),
    password: vine.string().minLength(8).maxLength(512),
  })
)
