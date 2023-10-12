import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  private unauthorizedResponse(response: HttpContextContract['response']) {
    return response.unauthorized({ message: 'Unauthorized' })
  }
  /* Show function to return a single user */
  public async show({ response, auth, params }: HttpContextContract) {
    if (auth.user?.is_admin || auth.user?.id === params.id) {
      const user = await User.findOrFail(params.id)
      return response.json(user)
    } else {
      return this.unauthorizedResponse(response)
    }
  }
  /* Update function to update a single user */
  public async update({ request, response, auth, params }: HttpContextContract) {
    if (auth.user?.is_admin || auth.user?.id === params.id) {
      const user = await User.findOrFail(params.id)
      user.merge(request.only(['username', 'email', 'is_admin']))
      await user.save()
      return response.json(user)
    } else {
      return this.unauthorizedResponse(response)
    }
  }
  /* Delete function to delete a single user */
  public async destroy({ response, auth, params }: HttpContextContract) {
    if (auth.user?.is_admin) {
      const user = await User.findOrFail(params.id)
      await user.delete()
      return response.json({ message: 'User deleted successfully' })
    } else {
      return this.unauthorizedResponse(response)
    }
  }
}
