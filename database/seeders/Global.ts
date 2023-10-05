import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserFactory from 'Database/factories/UserFactory'
import PostFactory from 'Database/factories/PostFactory'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    // Create 10 users from the factory
    await UserFactory.createMany(10)
    // Create 10 posts from the factory but add user_id to each post
    await PostFactory.createMany(10)
  }
}
