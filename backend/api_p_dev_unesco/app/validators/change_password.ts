import vine from '@vinejs/vine'

export const changePasswordValidator = vine.compile(
  vine.object({
    oldPassword: vine.string(),
    newPassword: vine.string().minLength(6),
  })
)
