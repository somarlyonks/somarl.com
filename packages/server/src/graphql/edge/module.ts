
import { ResourceModule } from '../shared'

import { RESOURCE_NAME } from './consts'
import { HasRepo } from './repos'
import EdgeService from './service'


@ResourceModule(RESOURCE_NAME, {
  providers: [
    HasRepo,
    EdgeService,
  ],
  exports: [
    EdgeService,
  ],
})
export default class EdgeModule {}
