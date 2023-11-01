import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import VerifyEmail from 'App/Mailers/VerifyEmail'
import ResetPasswordEmail from 'App/Mailers/ResetPasswordEmail'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'google_id' })
  public googleId: string

  @column({ columnName: 'first_name' })
  public firstName: string

  @column({ columnName: 'last_name' })
  public lastName: string

  @column({ columnName: 'username' })
  public username: string

  @column({ columnName: 'email' })
  public email: string

  @column({ columnName: 'password' })
  public password: string | null

  @column({ columnName: 'avatar' })
  public avatar: URL | String | null

  @column({ columnName: 'is_admin' })
  public isAdmin: boolean

  @column.dateTime({ columnName: 'email_verified_at' })
  public emailVerifiedAt?: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public verifyEmail() {
    new VerifyEmail(this).send()
  }

  public resetPassword() {
    new ResetPasswordEmail(this).send()
  }
}
