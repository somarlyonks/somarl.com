import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Strategy } from 'passport-local'
import { ExtractJwt, Strategy as StrategyJwt } from 'passport-jwt'

import { User, UserService } from '../../graphql'
import SETTINGS from '../../settings'

import { IAuthService, IStrategy } from './specs'


@Injectable()
export default class AuthService implements IAuthService {

  public constructor (
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  public async validate (username: S, token: S) {
    const user = await this.userService.findOneById(username)
    // TODO: @sy actuall local secret check
    return user
  }

  public async signUp (userData: A) {
    const user = await this.userService.create(userData)
    return this.login(user)
  }

  public async login (user: User) {
    // const lastseen = new Date()
    // TODO: @sy update lastseen
    const token = this.generateToken(user.id)

    return { user, token }
  }

  public async logout (user: User) {
    this.generateToken(user.id)
  }

  private generateToken (id: S) {
    const payload: IJwtPayload = { id }
    return this.jwtService.sign(payload)
  }

}


@Injectable()
export class LocalStratgy extends PassportStrategy(Strategy, 'local') implements IStrategy {

  public constructor (private readonly authService: AuthService) {
    super()
  }

  public async validate (username: S, token: S) {
    const user = await this.authService.validate(username, token)
    if (!user) throw new UnauthorizedException('user not registered')

    return user
  }

}


@Injectable()
export class JwtStrategy extends PassportStrategy(StrategyJwt, 'jwt') implements IStrategy {

  public constructor (
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SETTINGS.JWT_SECRET,
    })
  }

  public async validate (payload: IJwtPayload) {
    return this.userService.findOneById(payload.id)
  }

}
