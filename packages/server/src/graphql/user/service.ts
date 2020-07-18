
import { aql } from 'arangojs'
import { Injectable, BadRequestException } from '@nestjs/common'

import { IUserService } from './specs'
import UserRepo from './repo'
import { NewUserInput } from './dto'
import { DEFAULT_AVATAR } from './consts'
import { phkdf2Password } from '../../helpers'
import { capitalize, now } from '../../helpers/Adapter'


@Injectable()
export default class UserService implements IUserService {

  public constructor (
    private readonly userRepo: UserRepo
  ) {}

  public async create (data: NewUserInput) {
    if (!data.password || !data.email) {
      throw new BadRequestException('user fields error')
    }
    const nickname = data.nickname || capitalize(data.email!.split('@')[0])
    const userData = {
      ...data,
      nickname,
      password: phkdf2Password(data.password),
      avatar: DEFAULT_AVATAR,
      accessLevel: 0,
    }

    return this.userRepo.create(userData)
  }

  public async findOneById (id: S) {
    return this.userRepo.findOne(id)
  }

  public async findOneByEmail (email: S) {
    return this.userRepo.get(aql`FILTER d.email == ${email}`, 'acceptVoid')
  }

  public async seen (id: S) {
    return this.userRepo.update(id, {lastseen: new Date(now())})
  }

}
