import { Controller, Post, Req } from '@nestjs/common'
import { Request } from 'express'

import { QiniuService } from '../services'


@Controller('qiniu')
export default class QiniuController {
  public constructor (private readonly qiniuService: QiniuService) {}

  @Post('token')
  public async token (@Req() req: Request) {
    return { token: this.qiniuService.getUploadToken(req.body.userId) }
  }

  @Post('upload_callback')
  public async uploadCallback (@Req() req: Request) {
    // TODO: @sy
    return req.body
  }
}
