import Post from 'App/Models/Post'
import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'

export default Factory.define(Post, async ({ faker }) => {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    content: faker.lorem.paragraphs(1),
    user_id: await User.query()
      .orderByRaw('RAND()')
      .firstOrFail()
      .then((user) => user.id),
  }
}).build()
