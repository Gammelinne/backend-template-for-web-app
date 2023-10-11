import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Encryption from '@ioc:Adonis/Core/Encryption'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class MailsController {
  public async verifyEmail({ request, response }: HttpContextContract) {
    const decryptedToken = Encryption.decrypt(request.input('token'))
    if (typeof decryptedToken === 'string') {
      const userId = decryptedToken.slice(0, 36)
      await User.findOrFail(userId).then(async (user) => {
        if (decryptedToken === user.id + Env.get('EMAIL_VERIFICATION_SECRET_KEY')) {
          user.email_verified_at = DateTime.now()
          await user.save()
          response.ok({ message: 'Email verified successfully' })
        } else {
          response.badRequest({ message: 'Invalid token' })
        }
      })
    }
  }
  /* Resend a verification email */
  public async resendVerificationEmail({ request, response }: HttpContextContract) {
    const { email } = request.only(['email'])
    await User.findByOrFail('email', email)
      .then(async (user) => {
        if (user.email_verified_at) {
          response.badRequest({ message: 'Email already verified' })
        } else {
          user.verifyEmail()
          response.ok({ message: 'Verification email sent successfully' })
        }
      })
      .catch(() => response.notFound({ message: 'Verification email failed' }))
  }

  /* Send Email to reset user password */
  public async resetPasswordEmail({ request, response }: HttpContextContract) {
    const { email } = request.only(['email'])
    await User.findByOrFail('email', email)
      .then(async (user) => {
        user.resetPassword()
        response.ok({ message: 'Password reset email sent successfully' })
      })
      .catch(() => response.notFound({ message: 'Password reset failed' }))
  }
}
