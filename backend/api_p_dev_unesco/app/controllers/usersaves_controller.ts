import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserSavesController {
  // Get all user saves
  async show({ params, response }: HttpContext) {
    // Retrieve the user whose ID is in the parameter
    const user = await User.findOrFail(params.user_id)
    // Loading user and each saves
    await user.load('saves')
    return response.ok(user.save)
  }
}
