import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { userValidator } from '#validators/user'
import UserPolicy from '#policies/user_policy'
export default class UsersController {
  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, auth }: HttpContext) {
    const { username, password, email } = await request.validateUsing(userValidator)
    const user = await User.findOrFail(params.user_id)
    const userId = auth.user!.id
    if (user.id !== userId) {
      return response.forbidden("Vous n'êtes pas le bon utilisateur")
    }
    user.merge({ username, password, email })
    await user.save()
    return response.ok({ user })
  }
  /**
   * Delete record
   */
  async destroy({ params, response, auth }: HttpContext) {
    const user = await User.findOrFail(params.user_id)
    const userId = auth.user!.id
    if (user.id !== userId) {
      return response.forbidden("Vous n'êtes pas le bon utilisateur")
    }
    await user.delete()

    return response.noContent()
  }
}
