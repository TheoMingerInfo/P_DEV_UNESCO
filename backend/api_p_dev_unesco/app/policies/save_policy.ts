import User from '#models/user'
import Save from '#models/save'
import { BasePolicy } from '@adonisjs/bouncer'

export default class SavePolicy extends BasePolicy {
  private async isOwner(user: User, save: Save): Promise<boolean> {
    const rightUser = await User.query()
      .where('id', save.userFK)
      .where('id', user.id)
      .select('id')
      .first()
    return !!rightUser
  }

  async delete(user: User, save: Save) {
    return this.isOwner(user, save)
  }
}
