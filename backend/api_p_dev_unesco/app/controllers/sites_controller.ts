import Site from '#models/site'
import type { HttpContext } from '@adonisjs/core/http'

export default class SitesController {
  async index({ response }: HttpContext) {
    // //  Retrieves the pagination parameters from the query
    // const {
    //   page = 1,
    //   limit = 10,
    //   sort = 'name',
    //   order = 'asc',
    //   countryId,
    //   typeId,
    //   search,
    // } = await request.validateUsing(getSitesQueryValidator)

    // const query = Site.query().preload('country').preload('type')
    // if (countryId) {
    //   query.where('class_group_id', countryId) // Filter by country ID
    // }

    // // Search
    // if (search) {
    //   query.where((subQuery) => {
    //     subQuery.whereILike('name', `%${search}%`) // Faire la même chose pour trouver le nom du pays .orWhereILike('country_fk', `%${search}%`)
    //   })
    // }

    // // Sort site
    // query.orderBy(sort, order as 'asc' | 'desc')

    // const sites = await query.paginate(page, limit) // Results pagination
    // sites.baseUrl('/sites')

    // // Keep search parameters
    // sites.queryString({ page, limit, sort, order, countryId, typeId, search })

    // return response.ok(sites)

    const sites = await Site.query().orderBy('id', 'asc')
    return response.ok(sites)
  }

  async show({ params, response }: HttpContext) {
    const site = await Site.findOrFail(params.site_id)
    return response.ok(site)
  }
}
