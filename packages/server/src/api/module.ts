import { Module } from '@nestjs/common'

import { BinksController, PublicApiController, QiniuController } from './controllers'
import { BinksService, PublicApiService, QiniuService } from './services'
import ImageModule from '../graphql/image/module'


@Module({
  imports: [
    ImageModule,
  ],
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
