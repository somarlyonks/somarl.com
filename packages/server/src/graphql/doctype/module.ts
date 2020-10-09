
import { ResourceModule } from '../shared'

import { RESOURCE_NAME } from './consts'
import { DoctypeRepo } from './repos'
import DoctypeResolver from './resolver'
import DoctypeService from './service'


@ResourceModule(RESOURCE_NAME, {
  providers: [
    DoctypeRepo,
    DoctypeResolver,
    DoctypeService,
  ],
  exports: [
    DoctypeService,
  ],
})
export default class DoctypeModule {}
