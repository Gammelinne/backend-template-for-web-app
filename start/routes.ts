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
|
*/

// User routes
Route.post('/register', 'UsersController.register')
Route.post('/login', 'UsersController.login')

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

// Post routes
Route.get('/posts', 'PostsController.index').middleware('auth')
