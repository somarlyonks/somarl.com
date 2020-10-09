
import { Injectable } from '@nestjs/common'

import { Repo } from '../../arango'
import { Doctype } from './models'
import { IDoctypeRepo } from './specs'


@Injectable()
export class DoctypeRepo extends Repo<Doctype> implements IDoctypeRepo {
  protected async preCreate (data: ModelData<Doctype>) {
    console.info('Extra things done before create!!!')
    return data
  }
}
