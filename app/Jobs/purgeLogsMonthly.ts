// app/CronJobs/PurgeLogsMonthly.ts
import { CronJob } from 'cron'
import Cron from '../../start/cron'
import { DateTime } from 'luxon'
/*
|--------------------------------------------------------------------------
| PurgeLogsMonthly
|--------------------------------------------------------------------------
|
|   This cron job is executed every 2 days at midnight
|   It deletes all logs older than 30 days
|
|   Note : I don't have other choice to import the Log model in the configure() method
|   because Base model is not ready when the cron jobs are imported
*/

export default class PurgeLogsMonthly {
  public static async configure() {
    const purgeLogsMonthly = new CronJob('0 0 */2 * *', async () => {
      const Log = (await import('App/Models/Log')).default
      const logs = await Log.query()
        .where('createdAt', '<', DateTime.now().minus({ second: 10 }).toString())
        .delete()
      await Log.store(
        200,
        'Cron job',
        `{"infos": {"Number of logs deleted": ${logs}, "date": ${DateTime.now().toISO()}, "cron": "PurgeLogsMonthly"}}`
      )
    })
    await Cron.add(purgeLogsMonthly)
  }
}
