
import { aql } from 'arangojs'
import { Injectable, ForbiddenException } from '@nestjs/common'

import { Repo } from '../../arango'
import { User } from './models'
import { IUserRepo } from './specs'
import { now } from '../../helpers/Adapter'


@Injectable()
export default class UserRepo extends Repo<User> implements IUserRepo {

  protected async preCreate (data: ModelData<User>): P<ModelData<User>> {
    const existed = await this.get(aql`FILTER d.email == ${data.email}`, 'acceptVoid')
    if (existed) throw new ForbiddenException('Email registered.')

    data.lastseen = new Date(now())
    return data
  }

}
