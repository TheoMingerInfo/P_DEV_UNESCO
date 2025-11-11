import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Site from '#models/site'
import Type from '#models/type'
import Country from '#models/country'

export default class SiteSeeder extends BaseSeeder {
  public async run() {
    // On récupère les ID existants pour lier correctement
    const typeCulturel = await Type.findBy('name', 'Culturel')
    const typeNaturel = await Type.findBy('name', 'Naturel')
    const typeMixte = await Type.findBy('name', 'Mixte (Culturel et Naturel)')
    const typeArchitectural = await Type.findBy('name', 'Architectural')
    const typeArcheologique = await Type.findBy('name', 'Archéologique')

    const france = await Country.findBy('name', 'France')
    const egypte = await Country.findBy('name', 'Égypte')
    const chine = await Country.findBy('name', 'Chine')
    const perou = await Country.findBy('name', 'Pérou')
    const australie = await Country.findBy('name', 'Australie')
    const italie = await Country.findBy('name', 'Italie')
    const mexique = await Country.findBy('name', 'Mexique')

    await Site.createMany([
      {
        name: 'Mont-Saint-Michel',
        image_path: '/images/sites/mont_saint_michel.jpg',
        description:
          'Un site emblématique médiéval construit sur un îlot rocheux, exemple exceptionnel d’architecture gothique.',
        register_date: new Date('1979-01-01'),
        longitude: -1.5115,
        latitude: 48.636,
        typeFK: typeArchitectural?.id || 1,
        countryFK: france?.id || 1,
      },
      {
        name: 'Pyramides de Gizeh',
        image_path: '/images/sites/gizeh.jpg',
        description:
          'Le dernier vestige des sept merveilles du monde antique, symboles de l’Égypte ancienne.',
        register_date: new Date('1979-01-01'),
        longitude: 31.1342,
        latitude: 29.9792,
        typeFK: typeArcheologique?.id || 1,
        countryFK: egypte?.id || 1,
      },
      {
        name: 'Grande Muraille de Chine',
        image_path: '/images/sites/grande_muraille.jpg',
        description:
          'Une fortification monumentale s’étendant sur plus de 20 000 km, construite pour protéger la Chine impériale.',
        register_date: new Date('1987-01-01'),
        longitude: 117.236,
        latitude: 40.6769,
        typeFK: typeCulturel?.id || 1,
        countryFK: chine?.id || 1,
      },
      {
        name: 'Machu Picchu',
        image_path: '/images/sites/machu_picchu.jpg',
        description:
          'Ancienne cité inca perchée dans les Andes péruviennes, alliant nature et culture.',
        register_date: new Date('1983-01-01'),
        longitude: -72.544963,
        latitude: -13.163141,
        typeFK: typeMixte?.id || 1,
        countryFK: perou?.id || 1,
      },
      {
        name: 'Grande Barrière de corail',
        image_path: '/images/sites/grande_barriere_corail.jpg',
        description:
          'Le plus grand système corallien du monde, abritant une biodiversité marine exceptionnelle.',
        register_date: new Date('1981-01-01'),
        longitude: 147.6992,
        latitude: -18.2871,
        typeFK: typeNaturel?.id || 1,
        countryFK: australie?.id || 1,
      },
      {
        name: 'Colisée de Rome',
        image_path: '/images/sites/colisee_rome.jpg',
        description:
          'Amphithéâtre emblématique de l’Empire romain, symbole de puissance et d’ingénierie antique.',
        register_date: new Date('1980-01-01'),
        longitude: 12.4922,
        latitude: 41.8902,
        typeFK: typeArchitectural?.id || 1,
        countryFK: italie?.id || 1,
      },
      {
        name: 'Chichén Itzá',
        image_path: '/images/sites/chichen_itza.jpg',
        description:
          'Ancienne cité maya, célèbre pour sa pyramide de Kukulcán et son importance astronomique.',
        register_date: new Date('1988-01-01'),
        longitude: -88.5678,
        latitude: 20.6843,
        typeFK: typeArcheologique?.id || 1,
        countryFK: mexique?.id || 1,
      },
    ])
  }
}
