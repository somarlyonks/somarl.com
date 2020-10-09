
import { IRepo } from '../../arango'
import { Document } from './models'
import { NewDocumentInput } from './dto/input'
import { DocumentArgs } from './dto/args'


export interface IDocumentRepo extends IRepo<Document> {
  //
}

export interface IDocumentService {
  create (data: NewDocumentInput): P<Document>
  findOneById (id: S): P<Dehydrated<Document> | void>
  findAll (args: DocumentArgs): P<L<Document>>
  removeById (id: S): P<boolean>
}
