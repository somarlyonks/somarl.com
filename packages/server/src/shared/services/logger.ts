// import chalk from 'chalk'
import { LoggerService } from '@nestjs/common'


/** TODO: @sy logger */
export default class MyLogger implements LoggerService {
  public log (message: string) {
    console.log(message)
  }
  public error (message: string, trace: string) {}
  public warn (message: string) {}
  public debug (message: string) {}
  public verbose (message: string) {}
}
