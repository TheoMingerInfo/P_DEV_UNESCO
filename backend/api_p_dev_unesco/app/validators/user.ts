//ok pour l'instant, reste à tester
import vine from '@vinejs/vine'

const userValidator = vine.compile(
    vine.object(
        {
            username: vine.string().minLength(2).maxLength(255),
            password:vine.string().minLength(2).maxLength(255),
            email: vine.string().email().minLength(5).maxLength(255),
        }
    )
)
export {userValidator}