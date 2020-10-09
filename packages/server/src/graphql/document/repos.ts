
import { Injectable } from '@nestjs/common'

import { Repo } from '../../arango'
import { Document } from './models'
import { IDocumentRepo } from './specs'


@Injectable()
export class DocumentRepo extends Repo<Document> implements IDocumentRepo {
  protected async preCreate (data: ModelData<Document>) {
    console.info('Extra things done before create!!!')
    return data
  }
}
