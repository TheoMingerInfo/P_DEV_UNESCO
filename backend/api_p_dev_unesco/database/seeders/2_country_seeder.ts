import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Country from '#models/country'

export default class CountrySeeder extends BaseSeeder {
  public async run() {
    await Country.createMany([
      // 🌍 Europe
      { name: 'France', continent: 'Europe' },
      { name: 'Italie', continent: 'Europe' },
      { name: 'Espagne', continent: 'Europe' },
      { name: 'Suisse', continent: 'Europe' },
      { name: 'Grèce', continent: 'Europe' },

      // 🌏 Asie
      { name: 'Japon', continent: 'Asie' },
      { name: 'Chine', continent: 'Asie' },
      { name: 'Inde', continent: 'Asie' },
      { name: 'Thaïlande', continent: 'Asie' },
      { name: 'Indonésie', continent: 'Asie' },

      // 🌍 Afrique
      { name: 'Égypte', continent: 'Afrique' },
      { name: 'Maroc', continent: 'Afrique' },
      { name: 'Afrique du Sud', continent: 'Afrique' },
      { name: 'Kenya', continent: 'Afrique' },
      { name: 'Éthiopie', continent: 'Afrique' },

      // 🌎 Amérique
      { name: 'États-Unis', continent: 'Amérique' },
      { name: 'Brésil', continent: 'Amérique' },
      { name: 'Mexique', continent: 'Amérique' },
      { name: 'Canada', continent: 'Amérique' },
      { name: 'Pérou', continent: 'Amérique' },

      // 🌊 Océanie
      { name: 'Australie', continent: 'Océanie' },
      { name: 'Nouvelle-Zélande', continent: 'Océanie' },
      { name: 'Fidji', continent: 'Océanie' },
      { name: 'Papouasie-Nouvelle-Guinée', continent: 'Océanie' },
      { name: 'Samoa', continent: 'Océanie' },

      // ❄️ Antarctique
      { name: 'Station McMurdo', continent: 'Antarctique' },
    ])
  }
}
