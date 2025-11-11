import vine from '@vinejs/vine'
const visiteValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(2).maxLength(100),
    })
)