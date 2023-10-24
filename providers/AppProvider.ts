import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Cron from '../start/cron'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    await import('../start/socket')
    await Cron.configure()
    await Cron.start()
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
    Cron.stop()
  }
}
