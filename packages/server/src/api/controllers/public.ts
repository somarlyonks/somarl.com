import { Controller, Get, Query } from '@nestjs/common'

import { PublicApiService } from '../services'


@Controller('public')
export default class PublicApiController {
  public constructor (private readonly publicApiService: PublicApiService) {}

  @Get('weather')
  public async darkSky (@Query() query: A) {
    return this.publicApiService.getDarkSky(query.exclude || 'flags')
  }

  @Get('short_url')
  public async shortUrl (@Query() url: S) {
    return this.publicApiService.sinaShortUrl(url)
  }
}
