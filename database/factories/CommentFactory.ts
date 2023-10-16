import PostAndComment from 'App/Models/PostAndComment'
import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'

export default Factory.define(PostAndComment, async ({ faker }) => {
  return {
    id: faker.string.uuid(),
    body: faker.lorem.paragraphs(1),
    user_id: (await User.query().orderByRaw('RAND()').firstOrFail()).id,
    post_id: (await PostAndComment.query().orderByRaw('RAND()').firstOrFail()).id,
  }
}).build()
