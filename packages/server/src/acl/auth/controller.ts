import { Request } from 'express'
import { Controller, Req, Post, UseGuards, Body } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { JSONResp } from '../../shared'

import AuthService from './service'
import { NewUserInput } from '../../graphql/user/dto'


@Controller('auth')
export default class AuthController {

  public constructor (
    private readonly authSerivce: AuthService
  ) {}

  @Post('sign')
  public async signUp (@Body() body: NewUserInput) {
    return JSONResp.success(await this.authSerivce.signUp(body))
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login (@Req() req: Request, @Body() body: NewUserInput) {
    return JSONResp.success(await this.authSerivce.login(req.user!))
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  public async logout (@Req() req: Request) {
    await this.authSerivce.logout(req.user!)

    return JSONResp.success()
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logged')
  public async logged (@Req() req: Request) {
    return JSONResp.success(await this.authSerivce.login(req.user!))
  }

}
