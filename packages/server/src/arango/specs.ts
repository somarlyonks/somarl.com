
export interface IRepo<TModel> {

  create (data: ModelData<TModel>): P<TModel>

  find (options: { query: S } | { take: N, skip: N }): P<L<Dehydrated<TModel>>>

  findOne (id: S): P<Dehydrated<TModel> | void>

  update (id: S, data: Partial<ModelData<TModel>>): P

  delete (ids: L<S>): P<boolean>

  deleteOne (id: S): P<boolean>

}

export interface IArangoDocumentMeta {
  _key: S // 177949
  _id: S  // test/177949
  _rev: S // _ZFmHJNW---
}

export interface IArangoEdgeMeta extends IArangoDocumentMeta {
  _from: S // test/177949
  _to: S   // test/177949
}

export type IArangoDocuemnt<TModel extends O> = IArangoDocumentMeta & {
  created: S
} & TModel
