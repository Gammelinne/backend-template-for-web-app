import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  /* Show function to return a single user */
  public async show({ response, params, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('manage', await User.findOrFail(params.id))
    return response.json(await User.findOrFail(params.id))
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
  | Note : This function is available to the user and the admin. 
  | Replace the policy by "if(auth.is_admin)" to make it available only to the admin.
  |
  */
  public async destroy({ response, params, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('manage', await User.findOrFail(params.id))
    const user = await User.findOrFail(params.id)
    user.delete()
    return response.json({ message: 'User and all data deleted successfully' })
  }
}
