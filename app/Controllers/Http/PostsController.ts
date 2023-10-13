import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
export default class PostsController {
  /* return all posts in index function */
  public async index({ response }: HttpContextContract) {
    //use paginate to return a limited number of posts
    const posts = await Post.query().paginate(1, 10)
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
  /* show a single post */
  public async show({ params, response }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    return response.json(post)
  }
  /* update a single post */
  public async update({ params, request, response }: HttpContextContract) {
    const { title, content } = request.only(['title', 'content'])
    const post = await Post.findOrFail(params.id)
    post.title = title
    post.content = content
    await post.save()
    return response.json(post)
  }
  /* delete a single post */
  public async destroy({ params, response }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    post.delete()
    return response.json({ message: 'Post deleted successfully' })
  }
}
