import { Injectable, BadRequestException } from '@nestjs/common'

import { IUserService } from './specs'
import UserRepo from './repo'
import { NewUserInput } from './dto'
import { DEFAULT_AVATAR } from './consts'


@Injectable()
export default class UserService implements IUserService {

  public constructor (
    private readonly userRepo: UserRepo
  ) {}

  public async create (data: NewUserInput) { // TODO: @sy
    if (!data.nickname && !data.email) {
      throw new BadRequestException('user fields error')
    }
    const nickname = data.nickname || data.email!.split('@')[0]
    const userData = {
      ...data,
      nickname,
      avatar: DEFAULT_AVATAR,
      accessLevel: 0,
    }
    return this.userRepo.create(userData)
  }

  public async findOneById (id: S) {
    return this.userRepo.findOne(id)
  }
}
