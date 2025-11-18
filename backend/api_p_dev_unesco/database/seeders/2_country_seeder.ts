import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Country from '#models/country'

export default class CountrySeeder extends BaseSeeder {
  public async run() {
    await Country.createMany([
      // 🌍 Europe
      { name: 'France', continent: 'Europe', iso: 'FRA' },
      { name: 'Italie', continent: 'Europe', iso: 'ITA' },
      { name: 'Espagne', continent: 'Europe', iso: 'ESP' },
      { name: 'Suisse', continent: 'Europe', iso: 'CHE' },
      { name: 'Grèce', continent: 'Europe', iso: 'GRC' },

      // 🌏 Asie
      { name: 'Japon', continent: 'Asie', iso: 'JPN' },
      { name: 'Chine', continent: 'Asie', iso: 'CHN' },
      { name: 'Inde', continent: 'Asie', iso: 'IND' },
      { name: 'Thaïlande', continent: 'Asie', iso: 'THA' },
      { name: 'Indonésie', continent: 'Asie', iso: 'IDN' },

      // 🌍 Afrique
      { name: 'Égypte', continent: 'Afrique', iso: 'EGY' },
      { name: 'Maroc', continent: 'Afrique', iso: 'MAR' },
      { name: 'Afrique du Sud', continent: 'Afrique', iso: 'ZAF' },
      { name: 'Kenya', continent: 'Afrique', iso: 'KEN' },
      { name: 'Éthiopie', continent: 'Afrique', iso: 'ETH' },

      // 🌎 Amérique
      { name: 'États-Unis', continent: 'Amérique', iso: 'USA' },
      { name: 'Brésil', continent: 'Amérique', iso: 'BRA' },
      { name: 'Mexique', continent: 'Amérique', iso: 'MEX' },
      { name: 'Canada', continent: 'Amérique', iso: 'CAN' },
      { name: 'Pérou', continent: 'Amérique', iso: 'PER' },

      // 🌊 Océanie
      { name: 'Australie', continent: 'Océanie', iso: 'AUS' },
      { name: 'Nouvelle-Zélande', continent: 'Océanie', iso: 'NZL' },
      { name: 'Fidji', continent: 'Océanie', iso: 'FJI' },
      { name: 'Papouasie-Nouvelle-Guinée', continent: 'Océanie', iso: 'PNG' },
      { name: 'Samoa', continent: 'Océanie', iso: 'WSM' },

      // ❄️ Antarctique
      { name: 'Station McMurdo', continent: 'Antarctique', iso: 'ATC' },
    ])
  }
}
