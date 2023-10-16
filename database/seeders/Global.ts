import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserFactory from 'Database/factories/UserFactory'
import PostFactory from 'Database/factories/PostFactory'
import CommentFactory from 'Database/factories/CommentFactory'
export default class extends BaseSeeder {
  public async run() {
    await UserFactory.createMany(10) // Create 10 users from the factory
    await PostFactory.createMany(5) // Create 10 posts from the factory
    await CommentFactory.createMany(25) // Create 10 comments from the factory
  }
}
