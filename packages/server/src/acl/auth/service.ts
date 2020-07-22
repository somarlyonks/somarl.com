
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Strategy } from 'passport-local'
import { ExtractJwt, Strategy as StrategyJwt } from 'passport-jwt'

import { IAuthService, IStrategy, ISafeUser } from './specs'

import { User, UserService } from '../../graphql'
import { NewUserInput } from '../../graphql/user/dto'
import SETTINGS from '../../settings'
import { phkdf2Password, CONSTS } from '../../helpers'


@Injectable()
export default class AuthService implements IAuthService {

  public constructor (
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  public async validateEmailAndPassword (email: S, password: S) {
    const user = await this.userService.findOneByEmail(email)
    if (!user) throw new UnauthorizedException(CONSTS.ERRORS.auth.NOT_REGISTERED)
    if (user.password !== phkdf2Password(password)) throw new UnauthorizedException(CONSTS.ERRORS.auth.PASSWORD_WRONG)

    return user
  }

  public async validateUserId (id: S) {
    try {
      return await this.userService.findOneById(id)
    } catch (error) {
      if (error instanceof NotFoundException) throw new UnauthorizedException(CONSTS.ERRORS.auth.USER_NOT_FOUND)
      throw error
    }
  }

  public async signUp (userData: NewUserInput) {
    userData.password = phkdf2Password(userData.password)
    const user = await this.userService.create(userData)
    return this.login(user)
  }

  public async login (user: User) {
    await this.userService.seen(user.id)
    const token = this.generateToken(user.id)

    return { user: this.safeUser(user), token }
  }

  public async logout (user: User) {
    this.generateToken(user.id)
  }

  private generateToken (id: S) {
    const payload: IJwtPayload = { id }
    return this.jwtService.sign(payload)
  }

  // tslint:disable-next-line: prefer-function-over-method
  private safeUser (user: User): ISafeUser {
    return {
      nickname: user.nickname,
      email: user.email,
      avatar: user.avatar,
      created: user.created,
      lastseen: user.lastseen!,
    }
  }

}


@Injectable()
export class LocalStratgy extends PassportStrategy(Strategy, 'local') implements IStrategy {

  public constructor (private readonly authService: AuthService) {
    super({ usernameField: 'email' })
  }

  public async validate (email: S, password: S) {
    return this.authService.validateEmailAndPassword(email, password)
  }

}


@Injectable()
export class JwtStrategy extends PassportStrategy(StrategyJwt, 'jwt') implements IStrategy {

  public constructor (
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SETTINGS.JWT_SECRET,
    })
  }

  public async validate (payload: IJwtPayload) {
    return this.authService.validateUserId(payload.id)
  }

}
