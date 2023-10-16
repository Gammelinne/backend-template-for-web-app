import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PostAndComment from 'App/Models/PostAndComment'
export default class PostsAndCommentsController {
  /* return all posts in index function */
  public async index({ response }: HttpContextContract) {
    //use paginate to return a limited number of posts
    const posts = await PostAndComment.query().paginate(1, 10)
    return response.json(posts)
  }
  /* create a new post */
  public async create({ request, response }: HttpContextContract) {
    const { body } = request.only(['body'])
    const post = new PostAndComment()
    post.body = body
    await post.save()
    return response.json(post)
  }
  /* show a single post */
  public async show({ params, response }: HttpContextContract) {
    const post = await PostAndComment.findOrFail(params.id)
    return response.json(post)
  }
  /* update a single post */
  public async update({ params, request, response }: HttpContextContract) {
    const { body } = request.only(['body'])
    const post = await PostAndComment.findOrFail(params.id)
    post.body = body
    await post.save()
    return response.json(post)
  }
  /* delete a single post */
  public async destroy({ params, response }: HttpContextContract) {
    const post = await PostAndComment.findOrFail(params.id)
    post.delete()
    return response.json({ message: 'PostAndComment deleted successfully' })
  }
}
