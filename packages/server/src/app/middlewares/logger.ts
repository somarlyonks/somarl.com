import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  public use (req: Request, res: Response, next: F) {
    console.log('Request', req.hostname) // TODO: @sy
    next()
  }
}
