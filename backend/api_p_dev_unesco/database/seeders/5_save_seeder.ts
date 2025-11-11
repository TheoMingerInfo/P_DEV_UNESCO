import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Save from '#models/save'
import User from '#models/user'
import Site from '#models/site'

export default class SaveSeeder extends BaseSeeder {
  public async run() {
    const users = await User.all()
    const sites = await Site.all()

    if (users.length === 0 || sites.length === 0) {
      console.warn(
        '⚠️ Aucun utilisateur ou site trouvé — exécute d’abord les seeders correspondants.'
      )
      return
    }

    const saves: { userFK: number; siteFK: number }[] = []

    // Exemple : chaque utilisateur sauvegarde 2 sites différents
    users.forEach((user, userIndex) => {
      const firstSite = sites[userIndex % sites.length]
      const secondSite = sites[(userIndex + 1) % sites.length]

      // Ajout seulement si la combinaison user/site n’existe pas déjà
      if (!saves.some((s) => s.userFK === user.id && s.siteFK === firstSite.id)) {
        saves.push({ userFK: user.id, siteFK: firstSite.id })
      }
      if (!saves.some((s) => s.userFK === user.id && s.siteFK === secondSite.id)) {
        saves.push({ userFK: user.id, siteFK: secondSite.id })
      }
    })

    await Save.createMany(saves)
  }
}
