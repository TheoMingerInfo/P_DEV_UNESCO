import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { userValidator } from '#validators/user'
export default class UsersController {
  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { username, password, email } = await request.validateUsing(userValidator)
    const user = await User.create({ username, password, email })

    return response.created(user)
  }
  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const { username, password, email } = await request.validateUsing(userValidator)
    const user = await User.findByOrFail(params.id)
    user.merge({ username, password, email })
    await user.save()
    return response.ok({ user })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const user = await User.findByOrFail(params.id)
    await user.delete()

    return response.noContent()
  }
}
