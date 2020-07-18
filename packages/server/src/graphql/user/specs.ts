import { IRepo } from '../../arango'
import { User } from './models'
import { NewUserInput } from './dto'


export interface IUserRepo extends IRepo<User> {
  //
}


export interface IUserService {
  create (data: NewUserInput): P<User>
  findOneById (id: S): P<Dehydrated<User> | void>
  findOneByEmail (email: S): P<Dehydrated<User> | void>
  seen (id: S): P
}
