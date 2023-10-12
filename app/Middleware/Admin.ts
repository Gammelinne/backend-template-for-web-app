import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    if (auth.user?.is_admin) {
      await next()
    } else {
      response.unauthorized({ message: 'Unauthorized' })
    }
  }
}
