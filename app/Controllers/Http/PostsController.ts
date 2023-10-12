import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
export default class PostsController {
  //return all posts in index function
  public async index({ response }: HttpContextContract) {
    const posts = await Post.all()
    return response.json(posts)
  }
}
