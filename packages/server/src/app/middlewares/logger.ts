import { Injectable, NestMiddleware, Logger } from '@nestjs/common'
import { Request, Response } from 'express'


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  public use (req: Request, res: Response, next: F) {
    Logger.log('Request', req.originalUrl) // TODO: @sy
    next()
  }
}
