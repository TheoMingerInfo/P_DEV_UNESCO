import Site from '#models/site'
import { getSitesQueryValidator } from '#validators/site'
import type { HttpContext } from '@adonisjs/core/http'

export default class SitesController {
  async index({ response, request }: HttpContext) {
    //  Retrieves the pagination parameters from the query
    const {
      page = 1,
      limit = 10,
      sort = 'name',
      order = 'asc',
      countryFK,
      typeFK,
      search,
    } = await request.validateUsing(getSitesQueryValidator)

    const query = Site.query().preload('country').preload('type')
    if (countryFK) {
      query.where('class_group_id', countryFK) // Filter by country ID
    }

    // Search
    if (search) {
      query.where((subQuery) => {
        subQuery.whereILike('name', `%${search}%`) // Faire la même chose pour trouver le nom du pays .orWhereILike('country_fk', `%${search}%`)
      })
    }

    // Sort site
    query.orderBy(sort, order as 'asc' | 'desc')

    const sites = await query.paginate(page, limit) // Results pagination
    sites.baseUrl('/sites')

    // Keep search parameters
    sites.queryString({ page, limit, sort, order, countryFK, typeFK, search })

    return response.ok(sites)
  }

  async show({ params, response }: HttpContext) {
    const sites = await Site.findOrFail(params.id)
    return response.ok(sites)
  }
}
