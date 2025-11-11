/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

import UsersController from '#controllers/users_controller'
import UserSavesController from '#controllers/usersaves_controller'
import SavesController from '#controllers/saves_controller'
import VisitesController from '#controllers/visites_controller'
import SitesController from '#controllers/sites_controller'
import UserVisitesController from '#controllers/uservisites_controller'

// Authentication paths
router
  .group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
    router.post('logout', [AuthController, 'logout']).use(middleware.auth())
  })
  .prefix('user')

// User
router
  .group(() => {
    router.put(':user_id', [UsersController, 'update']).use(middleware.auth())
    router.delete(':user_id', [UsersController, 'destroy']).use(middleware.auth())
  })
  .prefix('users')

// See saves per users
router.get('users/:user_id/saves', [UserSavesController, 'show'])

// See visits per users
router.get('users/:user_id/visits?limit=:limit', [UserVisitesController, 'show'])

// Add and delete saves
router
  .group(() => {
    router.post('sites/:site_id/saves', [SavesController, 'store'])
    router.delete('sites/:site_id/saves/:save_id', [SavesController, 'destroy'])
  })
  .use(middleware.auth())

// Add and delete visites
router
  .group(() => {
    router.post('sites/:site_id/visites', [VisitesController, 'store'])
    router.put('sites/:site_id/visites/:visite_id', [VisitesController, 'update'])
    router.delete('sites/:site_id/visites/:visite_id', [VisitesController, 'destroy'])
  })
  .use(middleware.auth())

// CRUD sites
router
  .group(() => {
    router.get('', [SitesController, 'index'])
    router.get(':book_id', [SitesController, 'show'])
    // router.post('', [SitesController, 'store']).use(middleware.auth())
    // router.put(':book_id', [SitesController, 'update']).use(middleware.auth())
    // router.delete(':book_id', [SitesController, 'destroy']).use(middleware.auth())
  })
  .prefix('sites')
