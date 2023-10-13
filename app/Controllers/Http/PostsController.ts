import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
export default class PostsController {
  /* return all posts in index function */
  public async index({ response }: HttpContextContract) {
    const posts = await Post.all()
    return response.json(posts)
  }
  /* create a new post */
  public async create({ request, response }: HttpContextContract) {
    const { title, content } = request.only(['title', 'content'])
    const post = new Post()
    post.title = title
    post.content = content
    await post.save()
    return response.json(post)
  }
}
