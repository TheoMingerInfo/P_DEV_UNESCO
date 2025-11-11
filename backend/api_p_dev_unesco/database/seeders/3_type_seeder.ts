import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Type from '#models/type'

export default class TypeSeeder extends BaseSeeder {
  public async run() {
    await Type.createMany([
      {
        name: 'Culturel',
      },
      {
        name: 'Naturel',
      },
      {
        name: 'Mixte (Culturel et Naturel)',
      },
      {
        name: 'Architectural',
      },
      {
        name: 'Archéologique',
      },
      {
        name: 'Paysage culturel',
      },
      {
        name: 'Industriel',
      },
      {
        name: 'Religieux',
      },
      {
        name: 'Urbain historique',
      },
      {
        name: 'Rural traditionnel',
      },
    ])
  }
}
