
import { Module, DynamicModule } from '@nestjs/common'
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

import SETTINGS from '../../../settings'


@Module({})
export default class MailerWrapModule {
  public static forRoot (
    options: Partial<MailerOptions> = {}
  ): DynamicModule {
    return {
      module: MailerWrapModule,
      imports: [
        MailerModule.forRoot({
          transport: {
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
              user: SETTINGS.MAILER_USERNAME,
              pass: SETTINGS.MAILER_PASSWORD,
            },
          },
          defaults: {
            from: {
              name: SETTINGS.MAILER_USERNAME.split('@')[0],
              address: SETTINGS.MAILER_USERNAME,
            },
            subject: 'Hi from Dobby!',
            template: 'register',
          },
          template: {
            dir: __dirname + '/templates',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
          ...options,
        }),
      ],
    }
  }
}
