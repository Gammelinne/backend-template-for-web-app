import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  /* Index function to return all users */
  public async index({ response, auth }: HttpContextContract) {
    if (auth.user?.is_admin) {
      const users = await User.all()
      return response.json(users)
    } else {
      return response.unauthorized({ message: 'Unauthorized' })
    }
  }
}
