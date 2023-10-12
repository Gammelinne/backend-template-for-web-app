import { test } from '@japa/runner'
import UserFactory from 'Database/factories/UserFactory'
import Mail from '@ioc:Adonis/Addons/Mail'
import { MessageSearchNode } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'

/* Creation of a unique user for testing */

/*
|--------------------------------------------------------------------------
| Global Setup
|--------------------------------------------------------------------------
|
| Setup the test runner by configuring the config file (./bootstrap.ts)
| You can register reporters and plugins too inside the config file.
|
| By default The plugins property accepts an array of Japa plugins. By default, we register the following plugins. 
|   - assert - Assert module to make assertions.
|   - runFailedTests - A plugin to run only failed tests (if any).
|   - apiClient - An API client for testing HTTP endpoints.
|
| You can also register reporters to display/save the progress of tests as they are executed.
|   - specReporter - A reporter to display the progress of tests on the terminal.
|
*/

var user = UserFactory.make()
/* User Tests */

test('Registration and verification email Test with Dummy User', async ({ client, assert }) => {
  const mailer = Mail.fake()

  /* Register User */
  const register = await client
    .post(
      `/register?username=${(await user).username}&email=${
        (await user).email
      }&password=Testbob14@&password_confirmation=Testbob14@`
    )
    .send()
  register.assertStatus(201)

  /* Verify Email */
  assert.isTrue(mailer.exists({ subject: 'Email Verification' }))
  const token = mailer
    .filter((mail: MessageSearchNode) => !!mail.html?.includes('token='))
    .map((mail: MessageSearchNode) => mail.html?.split('token=')[1]?.split('"')[0])
    .find((token) => !!token)

  assert.exists(token)

  const verifyEmail = await client.get(`/verify-email/?token=${token}`).send()
  verifyEmail.assertStatus(200)

  /* Check if email is verified */
  const verifiedUser = await User.findBy('email', (await user).email, {})
  assert.isTrue(!!verifiedUser?.email_verified_at)

  Mail.restore()
})

test('Login Test with Dummy User', async ({ client }) => {
  const response = await client
    .post(`/login?email=${(await user).email}&password=Testbob14@`)
    .send()
  response.assertStatus(200)
  response.assertTextIncludes('token')
})

/* Post Tests */
