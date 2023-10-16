import { CronJob } from 'cron'
import PurgeLogsMonthly from 'App/Jobs/purgeLogsMonthly'

export default class Cron {
  public static jobs: CronJob[] = []

  /* Add a cron job to the array */
  public static async add(job: CronJob) {
    this.jobs.push(job)
  }

  /* Start all cron jobs */
  public static async start() {
    this.jobs.forEach((job) => job.start())
  }

  /* Stop all cron jobs */
  public static stop() {
    this.jobs.forEach((job) => job.stop())
  }

  /* Import all your cron jobs here */
  public static async configure() {
    await PurgeLogsMonthly.configure()
  }
}
