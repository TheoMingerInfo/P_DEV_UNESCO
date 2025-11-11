import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'

export default class UserPolicy extends BasePolicy {
  private async isOwner(user: User): Promise<boolean> {
    const rightUser = await User.query().where('id', user.id).select('id').first()
    return !!rightUser
  }
  async update(user: User) {
    return this.isOwner(user)
  }
  async delete(user: User) {
    return this.isOwner(user)
  }
}
