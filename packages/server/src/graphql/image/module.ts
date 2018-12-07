import { ResourceModule } from '../shared'

import { RESOURCE_NAME } from './consts'
import { ImageRepo } from './repos'
import ImageResolver from './resolver'
import ImageService from './service'


@ResourceModule(RESOURCE_NAME, {
  providers: [
    ImageRepo,
    ImageResolver,
    ImageService,
  ],
  exports: [
    ImageService,
  ],
})
export default class ImageModule {}
