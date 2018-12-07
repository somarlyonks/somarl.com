
import { ResourceModule } from '../shared'

import { RESOURCE_NAME } from './consts'
import { DocumentRepo } from './repos'
import DocumentResolver from './resolver'
import DocumentService from './service'


@ResourceModule(RESOURCE_NAME, {
  providers: [
    DocumentRepo,
    DocumentResolver,
    DocumentService,
  ],
  exports: [
    DocumentService,
  ],
})
export default class DocuemntModule {}
