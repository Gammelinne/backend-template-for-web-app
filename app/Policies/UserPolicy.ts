import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
  public manage(auth: User, user: User) {
    if (auth.is_admin || auth.id === user.id) {
      return true
    }
  }
}
