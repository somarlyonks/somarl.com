
import { Injectable } from '@nestjs/common'

import { Repo } from '../../arango'
import { Has } from './models'
import { IHasRepo } from './specs'


@Injectable()
export class HasRepo extends Repo<Has> implements IHasRepo {
  protected async preCreate (data: ModelData<Has>) {
    console.info('Extra things done before create!!!')
    return data
  }
}
