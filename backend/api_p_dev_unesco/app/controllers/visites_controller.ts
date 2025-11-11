import Visite from '#models/visite'
import VisitePolicy from '#policies/visite_policy'
import { visiteValidator } from '#validators/visite'
import { HttpContext } from '@adonisjs/core/http'

export default class VisitesController {
  /*
   * Creates a new visite
   */
  async store({ params, request, response, auth }: HttpContext) {
    // Get date infos given
    const { dateVisite } = await request.validateUsing(visiteValidator)

    // Get site id
    const siteId = params.site_id

    // Get current user
    const currentUser = auth.user!
    const userId = currentUser.id

    // Creates the visite
    const visite = await Visite.create({
      dateVisite,
      userId,
      siteId,
    })
    return response.created(visite)
  }

  /*
   * Updates an existing visite
   */
  async update({ params, auth, request, bouncer, response }: HttpContext) {
    // Data revocery
    const { dateVisite } = await request.validateUsing(visiteValidator)
    const userId = auth.user!.id
    const siteId = params.site_id

    // Get the visite
    const visite = await Visite.findOrFail(params.visite_id)

    // Check the permissions of the logged-in user
    if (await bouncer.with(VisitePolicy).denies('update', visite)) {
      return response.unauthorized({
        message: 'You are not the creator of this visite. You do not have the right to update it',
      })
    }

    // Update and save
    visite.merge({ dateVisite, userId, siteId })
    await visite.save()

    return response.ok(visite)
  }

  /*
   * Deletes an existing visite
   */
  async destroy({ params, response, bouncer }: HttpContext) {
    // Get the visite
    const visite = await Visite.findOrFail(params.visite_id)

    // Denies if not the owner
    if (await bouncer.with(VisitePolicy).denies('delete', visite)) {
      return response.unauthorized({
        message: 'You are not the creator of this visite. You do not have the right to delete it',
      })
    }

    // Delete visite
    await visite.delete()

    // Return a good response
    return response.ok(visite)
  }
}
