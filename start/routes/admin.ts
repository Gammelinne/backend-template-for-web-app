/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Admin route are protected by the admin middleware
| You need to be authenticated as an admin to access them (in the database, the is_admin field must be true)
| If you want change the admin middleware, go to app/Middleware/Admin.ts
|
*/

/* User Routes */
import Route from '@ioc:Adonis/Core/Route'
/*
  public async index({ response, auth }: HttpContextContract) {
    if (auth.user?.is_admin) {
      const users = await User.all()
      return response.json(users)
    } else {
      return this.unauthorizedResponse(response)
    }
  }
  */
Route.group(() => {
  Route.get('/users', 'Admin/UsersController.index')
  Route.get('/users/:id', 'Admin/UsersController.show')
  Route.post('/users', 'Admin/UsersController.store')
  Route.put('/users/:id', 'Admin/UsersController.update')
  Route.delete('/users/:id', 'Admin/UsersController.destroy')
}).middleware('admin')
