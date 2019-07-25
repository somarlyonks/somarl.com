import { Module } from '@nestjs/common'

import { BinksController, PublicApiControler } from './controller'
import { BinksService, PublicApiService } from './service'


@Module({
  controllers: [
    BinksController,
    PublicApiControler,
  ],
  providers: [
    BinksService,
    PublicApiService,
  ],
})
export default class ApiModule {}
