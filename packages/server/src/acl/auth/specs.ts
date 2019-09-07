import { User } from '../../graphql/user/models'

export interface IAuthService {
  validate (username: S, token: S): P<User|void>
}
