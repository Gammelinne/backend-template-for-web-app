/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
/*
|--------------------------------------------------------------------------
| Public routes
|--------------------------------------------------------------------------
|
|   You don't need to be authenticated to access the routes without any auth middleware
|   To avoid spam, the routes below are limited by the global limiter (see ./limiter.ts) to 10 requests per minute
|   You can change the limit in ./limiter.ts
|
|--------------------------------------------------------------------------
| Authenticated routes
|--------------------------------------------------------------------------
|
|   You need to be authenticated to access the routes with the auth middleware
|   To be authenticated, you need to send a header with the token you received when you logged in
|   The token must be sent in the Authorization header
|   Example of bearer token : NQ.VmvhsBgnHiK60tWff5xMtQTsKtJbXNeLtWDzue5qMQpyILe5FnElGzBJHTwD
|   After add to the route the middleware('auth') to protect it
|
*/
import Route from '@ioc:Adonis/Core/Route'

/* User Routes */
Route.group(() => {
  Route.get('/users/me', 'UsersController.showMe')
  Route.put('/users/:id', 'UsersController.update')
  Route.delete('/users/:id', 'UsersController.destroy')
  Route.post('/users/:id/avatar', 'UsersController.addAvatar')
}).middleware(['auth', 'throttle:global'])

/* Auth Routes */
Route.group(() => {
  Route.post('/register', 'AuthController.register')
  Route.post('/login', 'AuthController.login')
  Route.post('/reset-password', 'AuthController.resetPassword')
  Route.post('/logout', 'AuthController.logout').middleware(['auth'])
}).middleware('throttle:global')

/* Mail Routes */
Route.group(() => {
  Route.get('/verify-email/:email', 'MailsController.verifyEmail').as('verifyEmail')
  Route.post('/resend-verification-email', 'MailsController.resendVerificationEmail')
  Route.post('/reset-password-email', 'MailsController.resetPasswordEmail')
}).middleware('throttle:global')

/* Post Routes */
Route.group(() => {
  Route.get('/posts', 'PostsandCommentsController.index')
  Route.get('/posts/:id', 'PostsandCommentsController.show')
  Route.post('/posts', 'PostsandCommentsController.store')
  Route.put('/posts/:id', 'PostsandCommentsController.update')
  Route.delete('/posts/:id', 'PostsandCommentsController.destroy')
}).middleware(['auth', 'throttle:global'])

/* Extern call */
Route.group(() => {
  Route.post('/google/redirect', 'AuthController.handleGoogleRedirect')
})
