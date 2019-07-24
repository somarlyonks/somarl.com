import { Controller, Get } from '@nestjs/common'
import AppService from './service'


@Controller()
export default class AppController {
  public constructor (private readonly appService: AppService) {}

  @Get()
  public getHello (): S {
    return this.appService.getHello()
  }
}
