import { Controller, Get, Header, Res } from '@nestjs/common'
import { Response } from 'express'

import { BinksService } from '../services'


@Controller('/')
export default class BinksController {
  public constructor (private readonly binksService: BinksService) {}

  @Get('binks.jpg')
  @Header('Content-Type', 'image/jpg')
  public async image (@Res() res: Response) {
    res.status(HTTPStatusCodes.OK).send(await this.binksService.getImage())
  }

  @Get('binks')
  public async meta () {
    return this.binksService.getMeta()
  }
}
