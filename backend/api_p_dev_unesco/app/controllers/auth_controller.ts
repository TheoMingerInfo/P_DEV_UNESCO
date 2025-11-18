import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import { changePasswordValidator } from '#validators/change_password'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  // Ajout Jess
  /**
   * Créer un token OAT après validation des données utilisateurs
   */
  async login({ request, response }: HttpContext) {
    // Validation du nom d'utilisateur et mot de passe
    const { username, password } = await request.validateUsing(loginValidator)
    // Vérification qu'un utilisateur existe avec ce nom d'utilisateur et ce mot de passe
    // const user = await User.query().where('username', username)
    const user = await User.verifyCredentials(username, password)
    // Génération d'un token OAT
    const token = await User.accessTokens.create(user)
    // Retourne le token et les infos utilisateurs
    return response.ok(
      // user
      {
        token: token,
        ...user.serialize(),
      }
    )
  }
  /**
   * Enregistre un utilisateur
   */
  async register({ request, response }: HttpContext) {
    // Validation des données utilisateurs
    const payload = await request.validateUsing(registerValidator)
    // Création de l'utilisateur
    const user = await User.create(payload)
    // Retourne les données utilisateurs
    return response.created(user)
  }
  /**
   * Supprime le token OAT de l'utilisateur connecté
   */
  async logout({ auth, response }: HttpContext) {
    // Récupère l'utilisateur connecté/authentifié
    const user = auth.getUserOrFail()
    // Récupère le token de l'utilisateur connecté
    const token = auth.user?.currentAccessToken.identifier
    // Si le token n'existe pas, retourne une erreur HTTP 400
    if (!token) {
      return response.badRequest({ message: 'Token not found' })
    }
    // Supprime le token
    await User.accessTokens.delete(user, token)
    // Confirme à l'utilisateur que le logout est un succès
    return response.ok({ message: 'Logged out' })
  }

  public async changePassword({ auth, request, response }: HttpContext) {
    // Valider les inputs
    const { oldPassword, newPassword } = await request.validateUsing(changePasswordValidator)

    // Récupérer l’utilisateur connecté
    const user = auth.user!

    // Vérifier l’ancien mot de passe
    const isOldPasswordValid = await hash.verify(user.password, oldPassword)

    if (!isOldPasswordValid) {
      return response.unauthorized({ message: 'Ancien mot de passe incorrect' })
    }

    // Mettre à jour avec le nouveau mdp
    // user.password = await hash.make(newPassword)
    user.password = newPassword
    await user.save()

    return { message: 'Mot de passe mis à jour avec succès' }
  }
}
