import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'

export default class Log extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'status' })
  public status: number

  @column({ columnName: 'message' })
  public message: string

  @column({ columnName: 'stack' })
  public stack: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static async store(status: number, message: string, stack: string) {
    return await Log.create({
      id: uuidv4(),
      status,
      message,
      stack,
    })
  }
}
