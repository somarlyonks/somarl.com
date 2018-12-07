# Mail

In any `Injectable`, you can send email like

```ts
// some.service.ts
import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'


@Injectable()
export default class SomeService {
  public constructor (
    private readonly mailerService: MailerService
  ) {}

  public async mail () {
    const r = await this.mailerService.sendMail({
      to: 'somarl@live.com',
    })

    // the response is like
    const rSupposed = {
      accepted: [ 'somarl@live.com' ],
      rejected: [],
      envelopeTime: 634,
      messageTime: 1185,
      messageSize: 295,
      response: '250 2.0.0 OK <3d3992a9-eec2-1cd6-45f8-2e23a4ff119b@somarlcom> [Hostname=TY2PR02MB4224.apcprd02.prod.outlook.com]',
      envelope: { from: 'dobby@somarl.com', to: [ 'somarl@live.com' ] },
      messageId: '<3d3992a9-eec2-1cd6-45f8-2e23a4ff119b@somarl.com>'
    }
  }
}
```

## Configure templates and contexts

If you have to use another template, you should add it as `packages/server/src/shared/modules/mail/templates/[YOURTEMPALTE].hbs` and send it like

```ts
this.mailerService.sendMail({
  to: 'somarl@live.com',
  template: 'YOURTEMPALTE'
  context: {
    name: 'somarl'
  }
})
```

Adding local template and sending emails with `template: __dirname + '/templatename'` is **deprecated**.
