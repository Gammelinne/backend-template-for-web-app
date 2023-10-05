import { v4 as uuidv4 } from 'uuid'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import LoginUserValidator from 'App/Validators/LoginUserValidator'

export default class UsersController {
  /* Register a new user */
  public async register({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateUserValidator) // Validate the request with the CreateUserValidator
      payload.password = await Hash.make(payload.password) // Hash the password before saving it to the database (scrypt)
      await User.create({
        id: uuidv4(), // Generate an uuid for the user
        username: payload.username,
        email: payload.email,
        password: payload.password,
      }) // Create a new user in the database
      response.created({ message: 'User registered successfully' }) // Return a success message
    } catch (error) {
      response.badRequest(error) // Return the error messages
    }
  }

  /* Login a user */
  public async login({ request, response, auth }: HttpContextContract) {
    try {
      const payload = await request.validate(LoginUserValidator) // Validate the request with the LoginUserValidator
      await auth.use('api').revoke() // Revoke all tokens for this user
      const token = await auth.use('api').attempt(payload.email, payload.password) // Attempt to login the user
      response.ok({ token: token.toJSON() }) // Return the token
    } catch (error) {
      response.badRequest(error) // Return the error messages
    }
  }
}
