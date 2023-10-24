import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'
import Encryption from '@ioc:Adonis/Core/Encryption'

export default class ResetPasswordEmail extends BaseMailer {
  private user: User

  constructor(user: User) {
    super()
    this.user = user
  }
  /**
   * WANT TO USE A DIFFERENT MAILER?
   *
   * Uncomment the following line of code to use a different
   * mailer and chain the ".options" method to pass custom
   * options to the send method
   */
  // public mailer = this.mail.use()

  /**
   * The prepare method is invoked automatically when you run
   * "ResetPasswordEmail.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */

  /* 
  | -----------------------------------------------------------------
  | NOTE :
  | This method sends an email to the user with a link to reset their password.
  | The link redirects the user to your frontend project (change url in .env) with a token in the query string.
  | Post the token to the backend to reset the user's password in the route "/reset-password/" (body : { token: string, password: string })
  | -----------------------------------------------------------------
  */

  /* Send Email to reset user password */
  public prepare(message: MessageContract) {
    const token = Encryption.encrypt(
      this.user.id + Env.get('PASSWORD_VERIFICATION_SECRET_KEY'),
      '15mins'
    ) //create token with lifetime of 15 minutes
    message
      .from(Env.get('SMTP_USERNAME')) // Set the sender email address
      .to(this.user.email) // Set the recipient email address
      .subject('Reset your password') // Set the subject of the email
      .html(
        `
        <p>Hi ${this.user.username},</p> 
        <br> 
        <p>We received a request to reset your password on ${Env.get(
          'APP_NAME'
        )}. If you made this request, click on the link below to reset your password. If you didn't make this request, you can safely ignore this email.</p> 
        <br> 
        <a href="${Env.get('FRONTEND_URL')}/reset-password?token=${token}">Reset Password</a>
        <br>
        <p>This link will expire in 15 minutes for security reasons.</p>
        <br>
        <p>Regards,</p>
        <p>${Env.get('APP_NAME')}</p>
        
        `
      )
  }
}
