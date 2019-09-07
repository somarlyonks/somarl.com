import { Injectable } from '@nestjs/common'

import { Repo } from '../../arango'
import { User } from './models'
import { IUserRepo } from './specs'


@Injectable()
export default class UserRepo extends Repo<User> implements IUserRepo {
}
