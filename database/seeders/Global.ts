import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserFactory from 'Database/factories/UserFactory'
import PostFactory from 'Database/factories/PostFactory'

export default class extends BaseSeeder {
  public async run() {
    await UserFactory.createMany(10) // Create 10 users from the factory
    await PostFactory.createMany(10) // Create 10 posts from the factory
  }
}
