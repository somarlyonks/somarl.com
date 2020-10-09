
import { Injectable } from '@nestjs/common'

import { IEdgeService } from './specs'
import { HasRepo } from './repos'


@Injectable()
export default class EdgeService implements IEdgeService {
  public constructor (
    public readonly hasRepo: HasRepo
  ) {}
}
