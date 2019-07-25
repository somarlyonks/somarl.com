import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'
import cors from 'cors'


@Injectable()
export class CorsMiddleware implements NestMiddleware {
  public static configure (opts: cors.CorsOptions) {
    this.options = opts
  }

  private static options: cors.CorsOptions

  public use (req: Request, res: Response, next: F) {
    res.header('X-Powered-By', 'NestJS')
    cors(CorsMiddleware.options)(req, res, next)
  }
}
