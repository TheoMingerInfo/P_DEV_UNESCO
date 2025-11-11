import Save from '#models/save'
import SavePolicy from '#policies/save_policy'
import { HttpContext } from '@adonisjs/core/http'

export default class SavesController {
  async store({ auth, response, params }: HttpContext) {
    // Get site fk
    const siteId = params.site_id

    // Get user id
    const userId = auth.user!.id

    const save = await Save.create({
      userId,
      siteId,
    })
    return response.created(save)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    // Get save
    const save = await Save.findOrFail(params.save_id)

    // Denies if not the owner
    if (await bouncer.with(SavePolicy).denies('delete', save)) {
      return response.unauthorized({
        message: 'You are not the creator of this save. You do not have the right to delete it',
      })
    }

    // Delete save
    await save.delete()

    // Return a good response
    return response.ok(save)
  }
}
