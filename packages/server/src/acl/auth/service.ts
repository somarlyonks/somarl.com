import { Strategy } from 'passport-local'
import { ExtractJwt, Strategy as StrategyJwt } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { IAuthService } from './specs'
import { User, UserService } from '../../graphql'
import SETTINGS from '../../settings'


interface IJwtPayload {
  username: S
  sub: S
}


@Injectable()
export default class AuthService implements IAuthService {

  public constructor (
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  public async validate (username: S, token: S) {
    const user = await this.userService.findOneById(username)
    return user
  }

  public async login (user: User) {
    const payload: IJwtPayload = { username: user.nickname, sub: user.id }
    return {
      accessToken: this.jwtService.sign(payload),
    }
  }

}


@Injectable()
export class LocalStratgy extends PassportStrategy(Strategy, 'local') {
  public constructor (private readonly authService: AuthService) {
    super()
  }

  public async validate (username: S, token: S) {
    const user = await this.authService.validate(username, token)
    if (!user) throw new UnauthorizedException()

    return user
  }

}


@Injectable()
export class JwtStrategy extends PassportStrategy(StrategyJwt, 'jwt') {
  public constructor () {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SETTINGS.JWT_SECRET,
    })
  }

  public async validate (payload: IJwtPayload) {
    return {
      nickname: payload.username,
      id: payload.sub,
    }
  }
}
