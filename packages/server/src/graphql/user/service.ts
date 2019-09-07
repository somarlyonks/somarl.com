import { Injectable } from '@nestjs/common'
import { User } from './models'


@Injectable()
export default class UserService {
  private readonly users: L<User>

  public constructor () {
    this.users = [{
      id: '1',
      created: new Date(),
      nickname: 'Sy',
      email: 'somarl@live.com',
      password: '123',
      accessLevel: 0b1111,
      avatar: '',
    }]
  }

  public async findOneById (id: S) {
    return this.users[0]
  }
}
