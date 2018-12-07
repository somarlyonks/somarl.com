
import { ResourceModule } from '../shared'
import EdgeModule from '../edge/module'

import { RESOURCE_NAME } from './consts'
import { DoctypeRepo } from './repos'
import DoctypeResolver from './resolver'
import DoctypeService from './service'


@ResourceModule(RESOURCE_NAME, {
  imports: [
    EdgeModule,
  ],
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
