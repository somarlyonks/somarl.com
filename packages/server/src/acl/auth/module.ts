import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import AuthService, { LocalStratgy, JwtStrategy } from './service'
import AuthController from './controller'
import { UserModule } from '../../graphql'
import { SETTINGS } from '../../settings'


@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      ...SETTINGS.JWT_OPTIONS,
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    LocalStratgy,
    JwtStrategy,
  ],
  exports: [
    AuthService,
  ],
})
export default class AuthModule {}
