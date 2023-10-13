import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  /* Show function to return a single user */
  public async show({ response, auth, params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    if (auth.user?.id === params.id || auth.user?.isAdmin) {
      return response.json([user.username, user.email, user.createdAt])
    } else {
      return response.json([user.username, user.createdAt])
    }
  }
  /* Update function to update a single user */
  public async update({ request, response, params, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('manage', await User.findOrFail(params.id))
    const { username, email, password } = request.only(['username', 'email', 'password'])
    const user = await User.findOrFail(params.id)
    user.merge({ username, email, password })
    await user.save()
    return response.json({ message: 'User updated successfully' })
  }

  /*
  | Delete function
  |
  | Note : This function is available to the user and the admin. (user can only delete his own account)
  | Replace the policy by "if(auth.isAdmin)" to make it available only to the admin.
  |
  */
  public async destroy({ response, params, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('manage', await User.findOrFail(params.id))
    const user = await User.findOrFail(params.id)
    user.delete()
    return response.json({ message: 'User and all data deleted successfully' })
  }
}
