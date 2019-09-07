import { Controller, Request, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import AuthService from './service'


@Controller('auth')
export default class AuthController {

  public constructor (
    private readonly authSerivce: AuthService
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login (@Request() req: A) {
    return this.authSerivce.login(req.user)
  }

}
