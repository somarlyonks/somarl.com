
import { Injectable } from '@nestjs/common'


@Injectable()
export default class AppService {
  public constructor (
  ) {}
  public getHello (): S {
    return 'Hello World!'
  }
}
