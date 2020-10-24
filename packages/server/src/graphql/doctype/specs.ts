
import { IRepo } from '../../arango'
import { Doctype } from './models'
import { NewDoctypeInput } from './dto/input'
import { DoctypesArgs } from './dto/args'


export interface IDoctypeRepo extends IRepo<Doctype> {
  //
}

export interface IDoctypeService {
  create (data: NewDoctypeInput): P<Doctype>
  findOneById (id: S): P<DehydratedDocument<Doctype> | void>
  findAll (args: DoctypesArgs): P<L<Doctype>>
  removeById (id: S): P<boolean>
}
