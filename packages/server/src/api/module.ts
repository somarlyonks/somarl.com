import { Module } from '@nestjs/common'

import { BinksController, PublicApiController, QiniuController } from './controllers'
import { BinksService, PublicApiService, QiniuService } from './services'


@Module({
  controllers: [
    BinksController,
    PublicApiController,
    QiniuController,
  ],
  providers: [
    BinksService,
    PublicApiService,
    QiniuService,
  ],
})
export default class ApiModule {}
