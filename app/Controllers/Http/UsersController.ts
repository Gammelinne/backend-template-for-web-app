import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'
export default class UsersController {
  /* Show function to return a single user */
  public async showMe({ response, request, auth }: HttpContextContract) {
    let userId = request.input('id')
    let user = new User()
    if (auth.user?.isAdmin && userId) {
      user = await User.findOrFail(userId)
    } else if (auth.user) {
      user = await User.findOrFail(auth.user.id)
    }
    return response.json({
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      emailVerifiedAt: user.emailVerifiedAt,
    })
  }

  /* Update function to update a single user */
  public async update({ request, response, auth }: HttpContextContract) {
    const user = await User.findOrFail(auth.user?.id)
    const avatar = request.file('avatar', {
      size: '3mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })
    if (avatar) {
      await avatar.moveToDisk('avatars', {
        name: `${user.id}_avatar.jpg`,
      })
      user.avatar = `${Env.get('APP_URL')}/public/avatars/${user.id}_avatar.jpg`
      await user.save()
      return response.json({ avatar: user.avatar })
    } else {
      const { username, email, password } = request.only(['username', 'email', 'password'])
      user.merge({ username, email, password })
      await user.save()
    }
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
