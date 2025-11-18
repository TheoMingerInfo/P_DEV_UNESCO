import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class UserVisitesController {
  async show({ params, response }: HttpContext) {
    // Retrieve the user whose ID is in the parameter
    const user = await User.findOrFail(params.user_id)
    // Loading user and each visites
    await user.load('visites', (query) => {
      query.orderBy('date_visite', 'desc').limit(params.limit)
    })
    return response.ok(user.visites)
  }
}
