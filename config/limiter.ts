/**
 * Config source: https://bit.ly/3yXw6Tw
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

import { limiterConfig } from '@adonisjs/limiter/build/config'
import Env from '@ioc:Adonis/Core/Env'

export default limiterConfig({
  default: 'db',
  stores: {
    db: {
      client: 'db',
      dbName: Env.get('MYSQL_DB_NAME'),
      tableName: 'rate_limits',
      connectionName: Env.get('DB_CONNECTION'),
      clearExpiredByTimeout: true,
    },
  },
})
