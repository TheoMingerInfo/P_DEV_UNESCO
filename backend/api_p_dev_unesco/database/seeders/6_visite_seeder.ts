import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Visite from '#models/visite'
import User from '#models/user'
import Site from '#models/site'
import { DateTime } from 'luxon'

export default class VisiteSeeder extends BaseSeeder {
  public async run() {
    const users = await User.all()
    const sites = await Site.all()

    if (users.length === 0 || sites.length === 0) {
      console.warn(
        '⚠️ Aucun utilisateur ou site trouvé — exécute d’abord les seeders correspondants.'
      )
      return
    }

    const visites: { userFK: number; siteFK: number; dateVisite: Date }[] = []

    // Chaque utilisateur visite 2 sites différents
    users.forEach((user, index) => {
      const firstSite = sites[index % sites.length]
      const secondSite = sites[(index + 2) % sites.length]

      // Ajout sécurisé (évite doublon sur user/site)
      if (!visites.some((v) => v.userFK === user.id && v.siteFK === firstSite.id)) {
        visites.push({
          userFK: user.id,
          siteFK: firstSite.id,
          dateVisite: DateTime.now()
            .minus({ days: (index + 1) * 3 })
            .toJSDate(),
        })
      }

      if (!visites.some((v) => v.userFK === user.id && v.siteFK === secondSite.id)) {
        visites.push({
          userFK: user.id,
          siteFK: secondSite.id,
          dateVisite: DateTime.now()
            .minus({ days: (index + 2) * 5 })
            .toJSDate(),
        })
      }
    })

    await Visite.createMany(visites)
  }
}
