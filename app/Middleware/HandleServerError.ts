import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Log from 'App/Models/Log'
import { v4 as uuidv4 } from 'uuid'
export default class HandleServerError {
  public async handle({}: HttpContextContract, next: () => Promise<void>) {
    try {
      await next()
    } catch (error) {
      //log uniquement si erreur 500
      if (error.status === 500 || error.status === undefined) {
        const log = new Log()
        log.id = uuidv4()
        log.status = error.status || 500
        log.message = error.message || 'Internal server error'
        log.stack = error.stack || 'No stack trace'
        await log.save()
      }
      throw error
    }
  }
}
