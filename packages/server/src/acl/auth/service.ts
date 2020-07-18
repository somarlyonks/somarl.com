
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Strategy } from 'passport-local'
import { ExtractJwt, Strategy as StrategyJwt } from 'passport-jwt'

import { IAuthService, IStrategy } from './specs'

import { User, UserService } from '../../graphql'
import { NewUserInput } from '../../graphql/user/dto'
import SETTINGS from '../../settings'
import { phkdf2Password } from '../../helpers'


@Injectable()
export default class AuthService implements IAuthService {

  public constructor (
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  public async validateEmailAndPassword (email: S, password: S) {
    const user = await this.userService.findOneByEmail(email)
    if (!user) throw new UnauthorizedException('Not registered.')
    if (user.password !== phkdf2Password(password)) throw new UnauthorizedException('Password wrong.')

    return user
  }

  public async validateUserId (id: S) {
    try {
      return await this.userService.findOneById(id)
    } catch (error) {
      if (error instanceof NotFoundException) throw new UnauthorizedException('User not found')
      throw error
    }
  }

  public async signUp (userData: NewUserInput) {
    const user = await this.userService.create(userData)
    return this.login(user)
  }

  public async login (user: User) {
    await this.userService.seen(user.id)
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
