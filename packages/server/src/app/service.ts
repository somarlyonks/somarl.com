import { Injectable } from '@nestjs/common'


@Injectable()
export default class AppService {
  public getHello (): S {
    return 'Hello World!'
  }
}
