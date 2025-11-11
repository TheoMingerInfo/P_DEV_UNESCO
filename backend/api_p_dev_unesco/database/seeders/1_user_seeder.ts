import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        username: 'admin_unesco',
        email: 'admin@unesco.org',
        password: 'admin123', // sera hashé automatiquement par le mixin AuthFinder
        imagePath: '/images/users/admin.jpg',
      },
      {
        username: 'emma_traveler',
        email: 'emma@example.com',
        password: 'password123',
        imagePath: '/images/users/emma.jpg',
      },
      {
        username: 'lucas_explorer',
        email: 'lucas@example.com',
        password: 'password123',
        imagePath: '/images/users/lucas.jpg',
      },
      {
        username: 'maria_globetrotter',
        email: 'maria@example.com',
        password: 'password123',
        imagePath: '/images/users/maria.jpg',
      },
      {
        username: 'youssef_heritage',
        email: 'youssef@example.com',
        password: 'password123',
        imagePath: '/images/users/youssef.jpg',
      },
    ])
  }
}
