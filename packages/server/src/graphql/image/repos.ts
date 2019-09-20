import { Injectable } from '@nestjs/common'

import { Repo } from '../../arango'
import { Image } from './models'
import { IImageRepo } from './specs'


@Injectable()
export class ImageRepo extends Repo<Image> implements IImageRepo {
  protected async preCreate (data: ModelData<Image>) {
    console.log('Extra things done before create!!!')
    return data
  }
}
