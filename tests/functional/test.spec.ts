import { test } from '@japa/runner'
import UserFactory from 'Database/factories/UserFactory'

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

test('Registration Test with Dummy User', async ({ client }) => {
  const response = await client
    .post(
      `/register?username=${(await user).username}&email=${
        (await user).email
      }&password=Testbob14@&password_confirmation=Testbob14@`
    )
    .send()
  response.assertStatus(201)
})

test('Registration Test with Existing User', async ({ client }) => {
  //Create fake user
  const response = await client
    .post(
      `/register?username=${(await user).username}&email=${
        (await user).email
      }&password=Testbob14@&password_confirmation=Testbob14@`
    )
    .send()
  response.assertStatus(400)
})

test('Login Test with Dummy User', async ({ client }) => {
  const response = await client
    .post(`/login?email=${(await user).email}&password=Testbob14@`)
    .send()
  response.assertStatus(200)
  response.assertTextIncludes('token')
})

/* Post Tests */
