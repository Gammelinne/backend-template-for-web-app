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

import Route from '@ioc:Adonis/Core/Route'

/*
|--------------------------------------------------------------------------
| Public routes
|--------------------------------------------------------------------------
|
|   You don't need to be authenticated to access the routes below
|   To avoid spam, the routes below are limited by the global limiter (see ./limiter.ts)
|
*/

/* Auth routes */
Route.post('/register', 'AuthController.register').middleware('throttle:global') // Request body : { username: string, email: string, password: string, password_confirmation: string }
Route.post('/login', 'AuthController.login').middleware('throttle:global') // Request body : { email: string, password: string }
Route.post('/reset-password/', 'AuthController.resetPassword').middleware('throttle:global') // Request body : { token: string, password: string } // Request body : { token: string, password: string }

/* Mail routes */
Route.get('/verify-email/:email', 'MailsController.verifyEmail')
  .middleware('throttle:global')
  .as('verifyEmail') // Request body : { token: string }
Route.post('/resend-verification-email', 'MailsController.resendVerificationEmail').middleware(
  'throttle:global'
) // Request body : { email: string }
Route.post('/reset-password-email', 'MailsController.resetPasswordEmail').middleware(
  'throttle:global'
) // Request body : { email: string }

/*
|--------------------------------------------------------------------------
| Authenticated routes
|--------------------------------------------------------------------------
|
|   You need to be authenticated to access the routes below
|   To be authenticated, you need to send a header with the token you received when you logged in
|   The token must be sent in the Authorization header
|   Example of bearer token : NQ.VmvhsBgnHiK60tWff5xMtQTsKtJbXNeLtWDzue5qMQpyILe5FnElGzBJHTwD
|   After add to the route the middleware('auth') to protect it
|
*/

/* Auth routes */
Route.post('/logout', 'AuthController.logout').middleware(['auth', 'throttle:global']) // Request body : { token: string }

/* User routes */

/* Post routes */
Route.get('/posts', 'PostsController.index').middleware(['auth', 'throttle:global']) // Request body : { page: number, perPage: number }
