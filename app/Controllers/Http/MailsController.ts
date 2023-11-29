import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { DateTime } from 'luxon'
import Ws from 'App/Services/Ws'

export default class MailsController {
  /* Verify Email */
  public async verifyEmail({ params, request }: HttpContextContract) {
    try {
      if (request.hasValidSignature()) {
        const user = await User.findByOrFail('email', params.email)

        if (user.emailVerifiedAt) {
          return '<h1>EN: Email Already verified</h1><h1>FR: Email déjà verifié</h1>'
        } else {
          user.emailVerifiedAt = DateTime.now()
          await user.save()
          Ws.io.to(user.email).emit('emailVerified')
          return '<h1>EN : Email verified, you can close this window</h1><h1>Fr : Email verifié, vous pouvez faire cette fenetre</h1>'
        }
      } else {
        return '<h1>EN: Invalid Signature</h1><h1>FR: Signature invalide</h1>'
      }
    } catch (error) {
      return '<h1>EN : Error, retry or contact administrator</h1><h1>FR : Erreur, veuillez réessayer ou contacter un administrateur</h1>'
    }
  }
  /* Resend a verification email */
  public async resendVerificationEmail({ request, response }: HttpContextContract) {
    const { email } = request.only(['email'])
    await User.findByOrFail('email', email)
      .then(async (user) => {
        if (user.emailVerifiedAt) {
          response.badRequest({ message: 'Email already verified' })
        } else {
          user.verifyEmail()
          response.ok({ message: 'Verification email sent successfully' })
        }
      })
      .catch(() => response.badRequest({ message: 'Verification email failed' }))
  }

  /* Send Email to reset user password */
  public async resetPasswordEmail({ request, response }: HttpContextContract) {
    const { email } = request.only(['email'])
    await User.findBy('email', email).then(async (user) => {
      if (user) {
        user.resetPassword()
      }
    })
    response.ok({ message: 'Password reset email sent successfully' })
  }
}
