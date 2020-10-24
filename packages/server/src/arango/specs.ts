
import { DocumentMetadata, EdgeMetadata } from 'arangojs/documents'


export interface IRepo<TModel> {

  create (data: ModelData<TModel>): P<TModel>

  find (options: { query: S } | { take: N, skip: N }): P<L<DehydratedDocument<TModel>>>

  findOne (id: S): P<DehydratedDocument<TModel> | void>

  update (id: S, data: Partial<ModelData<TModel>>): P

  delete (ids: L<S>): P<boolean>

  deleteOne (id: S): P<boolean>

}


/** document
 * _key:     177949
 * _id:      vertex/177949
 * _rev:     _ZFmHJNW---
 */
export type IArangoDocuemnt <TModel extends O> = DocumentMetadata & {
  created: S
} & TModel

/** edge
 * from:     vertex/177949
 * to:       vertex/177949
 */
export type IArangoEdge <TModel extends O> = EdgeMetadata & {
  created: S
} & TModel
