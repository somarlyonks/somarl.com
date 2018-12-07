import { ResourceModule } from '../shared'

import { RESOURCE_NAME } from './consts'
import UserRepo from './repo'
import UserResolver from './resolver'
import UserService from './service'


@ResourceModule(RESOURCE_NAME, {
  providers: [
    UserRepo,
    UserResolver,
    UserService,
  ],
  exports: [
    UserService,
  ],
})
export default class UserModule {}
