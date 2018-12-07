import chalk from 'chalk'
import { Logger, LoggerService } from '@nestjs/common'


/** TODO: @sy logger */
export default class MyLogger implements LoggerService {
  public log (message: string) {
    Logger.log(message)
  }
  public error (message: string, trace: string) {
    Logger.error(message, trace)
    chalk.redBright(trace)
  }
  public warn (message: string) {
    Logger.warn(message)
  }
  public debug (message: string) {
    Logger.debug(message)
  }
  public verbose (message: string) {
    Logger.verbose(message)
  }
}
