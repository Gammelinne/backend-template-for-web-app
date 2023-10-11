/*
|--------------------------------------------------------------------------
| Define HTTP rate limiters
|--------------------------------------------------------------------------
|
| The "Limiter.define" method callback receives an instance of the HTTP
| context you can use to customize the allowed requests and duration
| based upon the user of the request.
|
*/

import { Limiter } from '@adonisjs/limiter/build/services'

export const { httpLimiters } = Limiter.define('global', ({ auth }) => {
  if (auth?.user?.is_admin) {
    return Limiter.allowRequests(50).every('1 min') // Allow 100 requests every minute for admins
  } else if (auth.user) {
    return Limiter.allowRequests(25).every('1 min') // Allow 50 requests every minute for authenticated users
  } else {
    return Limiter.allowRequests(10).every('1 min') // Allow 10 requests every minute (by default)
  }
})
