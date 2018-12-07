import { User } from '../../graphql/user/models'


export interface ISafeUser {
  email: S
  nickname: S
  avatar: S
  created: Date
  lastseen: Date
}

export interface IAuthService {
  validateEmailAndPassword (username: S, token: S): P<User | void>
  validateUserId (id: S): P<User | void>
  signUp (user: User): P<{user: ISafeUser, token: S}>
  login (user: User): P<{user: ISafeUser, token: S}>
  logout (user: User): P<void>
}

export interface IStrategy {
  validate (...args: L<A>): P<User>
}
