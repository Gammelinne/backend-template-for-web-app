import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'
import Encryption from '@ioc:Adonis/Core/Encryption'

export default class VerifyEmail extends BaseMailer {
  private user: User

  constructor(user: User) {
    super()
    this.user = user
  }

  /**
   * The prepare method is invoked automatically when you run
   * "VerifyEmail.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  /* Send Email to verify user email */
  public prepare(message: MessageContract) {
    const token = Encryption.encrypt(
      this.user.id + Env.get('EMAIL_VERIFICATION_SECRET_KEY'),
      '15mins'
    ) //create token with lifetime of 15 minutes
    message
      .from(Env.get('SMTP_USERNAME')) // Set the sender email address
      .to(this.user.email) // Set the recipient email address
      .subject('Email Verification') // Set the subject of the email
      .html(
        `
        <p>Hi ${this.user.username},</p> 
        <br> 
        <p>Thank you for registering on Lahyra. Please click on the link below to verify your email address.</p> 
        <br> 
        <a href="${Env.get('APP_URL')}/verify-email/?token=${token}">Verify Email</a>
        <br>
        <p>Regards,</p>
        <p>${Env.get('APP_NAME')}</p>
        `
      )
  }
}
