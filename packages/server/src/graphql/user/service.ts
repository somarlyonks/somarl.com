import { Injectable } from '@nestjs/common'
import { IUserService } from './specs'
import UserRepo from './repo'


@Injectable()
export default class UserService implements IUserService {

  public constructor (
    private readonly userRepo: UserRepo
  ) {}

  public async create (data: A) { // TODO: @sy
    return this.userRepo.create(data)
  }

  public async findOneById (id: S) {
    return this.userRepo.findOne(id)
  }
}
