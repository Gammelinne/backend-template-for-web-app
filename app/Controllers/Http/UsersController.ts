import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Application from '@ioc:Adonis/Core/Application'

export default class UsersController {
  /* Show function to return a single user */
  public async showMe({ response, request, auth }: HttpContextContract) {
    let userId = request.input('id')

    if (auth.user?.isAdmin && userId) {
      const user = await User.findOrFail(userId)
      return response.json({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
      })
    } else if (auth.user) {
      const user = await User.findOrFail(auth.user.id)
      return response.json({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
      })
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

  public async addAvatar({ request, response, params, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('manage', await User.findOrFail(params.id))
    const user = await User.findOrFail(params.id)

    const avatar = request.file('avatar', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })

    if (avatar) {
      // move avatar to user folder
      await avatar.moveToDisk(Application.publicPath('uploads/users/avatar'), {
        name: `${user.id}_avatar.jpg`,
        overwrite: true,
      })

      return response.json({ message: 'Avatar added successfully' })
    } else {
      return response.badRequest({ message: 'Avatar not found or invalid' })
    }
  }
}
