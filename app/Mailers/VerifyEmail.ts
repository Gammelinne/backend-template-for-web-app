import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
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
    message
      .from(Env.get('SMTP_USERNAME')) // Set the sender email address
      .to(this.user.email) // Set the recipient email address
      .subject('Email Verification') // Set the subject of the email
      .html(
        `
        <p>Hi ${this.user.username},</p> 
        <br> 
        <p>Thank you for registering on ${Env.get(
          'APP_NAME'
        )}. Please click on the link below to verify your email address.</p> 
        <br> 
        <a href="${
          Env.get('APP_URL') +
          Route.builder().params({ email: this.user.email }).makeSigned('verifyEmail', {
            expiresIn: '30min',
          })
        }">Verify Email</a>
        <br>
        <p>Regards,</p>
        <p>${Env.get('APP_NAME')}</p>
        `
      )
  }
}
