import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('google_id').nullable().unique()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('username').notNullable().unique()
      table.string('avatar').nullable()
      table.string('email').notNullable().unique()
      table.string('password').nullable()
      table.boolean('is_admin').defaultTo(false)
      table.dateTime('email_verified_at').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
