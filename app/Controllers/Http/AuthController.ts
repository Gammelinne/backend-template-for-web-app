import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'
import Encryption from '@ioc:Adonis/Core/Encryption'
import { validator, schema, rules } from '@ioc:Adonis/Core/Validator'
import ResetPasswordValidator from 'App/Validators/ResetPasswordValidator'

export default class AuthController {
  /* Register a new user */
  public async register({ request, response }: HttpContextContract) {
    const { firstName, lastName, username, email, password } = await validator.validate({
      schema: schema.create({
        firstName: schema.string(),
        lastName: schema.string(),
        username: schema.string([rules.unique({ table: 'users', column: 'username' })]),
        email: schema.string([rules.email(), rules.unique({ table: 'users', column: 'email' })]),
        // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character
        password: schema.string([
          rules.confirmed(),
          rules.minLength(8),
          rules.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/gm),
        ]),
      }),
      data: request.input('newUser'),
    })
    const dataRequest = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${Env.get(
        'SERVER_RECAPTCHA_KEY'
      )}&response=${request.input('token')}`
    )
    console.log(dataRequest.data)
    if (dataRequest.data.success) {
      const hashedPassword = await Hash.make(password)
      const id = uuidv4()
      await User.create({
        id,
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
      })
        .then((user) => user.verifyEmail())
        .then(() => response.created({ message: 'User created successfully', userId: id }))
    } else {
      response.badRequest({ message: 'Token error' })
    }
  }

  /* Login a user */
  public async login({ request, response, auth }: HttpContextContract) {
    await auth.use('api').revoke() // Revoke all tokens for this user
    try {
      const { email, password } = request.body()
      const token = await auth.use('api').attempt(email, password) // Attempt to login the user

      return auth.user?.emailVerifiedAt
        ? response.ok({
            token: token.toJSON(),
            user: auth.user?.toJSON(),
          })
        : response.badRequest({ message: 'Email not verified' })
    } catch (error) {
      // En cas d'échec de l'authentification, retourne une erreur générique
      return response.unauthorized({ message: 'Invalid credentials' })
    }
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
        if (decryptedToken === user.id + Env.get('PASSWORD_VERIFICATION_SECRET_KEY')) {
          const { password } = await request.validate(ResetPasswordValidator)
          const hashedPassword = await Hash.make(password)
          user.password = hashedPassword
          await user.save().then(() => response.ok({ message: 'Password reset successfully' }))
        }
      })
    }
  }
}
