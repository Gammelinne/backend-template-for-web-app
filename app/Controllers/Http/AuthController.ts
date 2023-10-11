import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { v4 as uuidv4 } from 'uuid'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import LoginUserValidator from 'App/Validators/LoginUserValidator'
import Encryption from '@ioc:Adonis/Core/Encryption'

export default class AuthController {
  /* Register a new user */
  public async register({ request, response }: HttpContextContract) {
    const { username, email, password } = await request.validate(CreateUserValidator)
    const hashedPassword = await Hash.make(password)
    await User.create({
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
    })
      .then((user) => user.verifyEmail())
      .finally(() => response.created({ message: 'User registered successfully' }))
  }

  /* Login a user */
  public async login({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(LoginUserValidator) // Validate the request with the LoginUserValidator
    await auth.use('api').revoke() // Revoke all tokens for this user
    const token = await auth.use('api').attempt(payload.email, payload.password) // Attempt to login the user
    return auth.user?.email_verified_at
      ? response.ok(token)
      : response.badRequest({ message: 'Email not verified' })
  }

  /* Logout a user */
  public async logout({ response, auth }: HttpContextContract) {
    await auth.use('api').revoke()
    response.ok({ message: 'User logged out successfully' })
  }

  public async resetPassword({ request, response }: HttpContextContract) {
    const decryptedToken = Encryption.decrypt(request.input('token'))
    if (typeof decryptedToken === 'string') {
      const userId = decryptedToken.slice(0, 36)
      await User.findOrFail(userId).then(async (user) => {
        if (decryptedToken === user.id + Env.get('EMAIL_VERIFICATION_SECRET_KEY')) {
          const hashedPassword = await Hash.make(request.input('password'))
          user.password = hashedPassword
          await user.save().then(() => response.ok({ message: 'Password reset successfully' }))
        }
      })
    }
  }
}
