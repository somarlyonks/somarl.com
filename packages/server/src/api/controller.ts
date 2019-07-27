import { Controller, Get, Header, Res, Query } from '@nestjs/common'
import { Response } from 'express'

import { BinksService, PublicApiService } from './service'
import { HTTPStatusCodes } from '../helpers/Adapter'


const API_ENDPOINT = '/'

@Controller(API_ENDPOINT)
export class BinksController {
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

@Controller(API_ENDPOINT)
export class PublicApiControler {
  public constructor (private readonly publicApiService: PublicApiService) {}

  @Get('weather')
  public async darkSky (@Query() query: A) {
    return this.publicApiService.getDarkSky(query.exclude || 'flags')
  }
}
