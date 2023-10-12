import Route from '@ioc:Adonis/Core/Route'

/* User routes */
Route.get('/users/me', 'Users/UsersController.show').middleware(['auth', 'throttle:global']) // Request body : { id: string }
Route.put('/users/me', 'Users/UsersController.update').middleware(['auth', 'throttle:global']) // Request body : { id: string, username: string, email: string, password: string, password_confirmation: string }
Route.delete('/users/me', 'Users/UsersController.destroy').middleware(['auth', 'throttle:global']) // Request body : { id: string }

/* Auth routes */
Route.post('/register', 'Users/AuthController.register').middleware('throttle:global') // Request body : { username: string, email: string, password: string, password_confirmation: string }
Route.post('/login', 'Users/AuthController.login').middleware('throttle:global') // Request body : { email: string, password: string }
Route.post('/reset-password/', 'Users/AuthController.resetPassword').middleware('throttle:global') // Request body : { token: string, password: string } // Request body : { token: string, password: string }
Route.post('/logout', 'Users/AuthController.logout').middleware(['auth', 'throttle:global']) // Request body : { token: string }

/* Mail routes */
Route.get('/verify-email/:email', 'Users/MailsController.verifyEmail')
  .middleware('throttle:global')
  .as('verifyEmail') // Request body : { token: string }
Route.post(
  '/resend-verification-email',
  'Users/MailsController.resendVerificationEmail'
).middleware('throttle:global') // Request body : { email: string }
Route.post('/reset-password-email', 'Users/MailsController.resetPasswordEmail').middleware(
  'throttle:global'
) // Request body : { email: string }

/* Post routes */
Route.get('/posts', 'Users/PostsController.index').middleware(['auth', 'throttle:global']) // Request body : { page: number, perPage: number }
