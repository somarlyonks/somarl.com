import { Controller, Post, Req } from '@nestjs/common'
import { Request } from 'express'

import { QiniuService } from '../services'
import ImageService from '../../graphql/image/service'


@Controller('qiniu')
export default class QiniuController {
  public constructor (
    private readonly qiniuService: QiniuService,
    private readonly imageService: ImageService
  ) {}

  @Post('token')
  public async token (@Req() req: Request) {
    return { token: this.qiniuService.getUploadToken(req.body.userId, !!req.body.sync) }
  }

  @Post('upload_callback')
  public async uploadCallback (@Req() req: Request) {
    console.info('RRR', req.body) // TODELETE
    if (req.body) {
      await this.imageService.create(Object.assign({}, req.body, {
        imageInfo: JSON.stringify(req.body.imageInfo || {}),
      }))
    }
    return req.body
  }
}
