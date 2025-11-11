import User from '#models/user'
import Visite from '#models/visite'
import { BasePolicy } from '@adonisjs/bouncer'

export default class VisitePolicy extends BasePolicy {
  private async isOwner(user: User, visite: Visite): Promise<boolean> {
    const rightUser = await User.query()
      .where('id', visite.userId)
      .where('id', user.id)
      .select('id')
      .first()
    return !!rightUser
  }

  async update(user: User, visite: Visite) {
    return this.isOwner(user, visite)
  }

  async delete(user: User, visite: Visite) {
    return this.isOwner(user, visite)
  }
}
