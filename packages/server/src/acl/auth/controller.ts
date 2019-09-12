import { Controller, Request, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request as Req } from 'express'

import { JSONResp } from '../../shared'

import AuthService from './service'


@Controller('auth')
export default class AuthController {

  public constructor (
    private readonly authSerivce: AuthService
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login (@Request() req: Req) {
    return JSONResp.success(await this.authSerivce.login(req.user!))
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  public async logout (@Request() req: Req) {
    await this.authSerivce.logout(req.user!)

    return  JSONResp.success()
  }

}
