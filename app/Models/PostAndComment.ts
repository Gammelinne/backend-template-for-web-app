import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class PostAndComment extends BaseModel {
  /*
    table.uuid('id').primary()
    table.text('body')
    table.uuid('user_id').references('id').inTable('users').notNullable()
    table.uuid('post_id').references('id').inTable('posts').nullable() // Null if it's a post, not a comment
    table.timestamp('created_at', { useTz: true })
    table.timestamp('updated_at', { useTz: true })
  */
  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'body' })
  public body: string

  @column({ columnName: 'user_id' })
  public userId: string

  @column({ columnName: 'post_id' })
  public postId: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => PostAndComment)
  public post: BelongsTo<typeof PostAndComment>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
