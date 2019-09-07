import { DocumentCollection } from 'arangojs'

export interface IRepo <TModel> {

  create (data: ModelData<TModel>): P<TModel>

  find (options: {query: S} | {take: N, skip: N}): P<L<Dehydrated<TModel>>>

  findOne (id: S): P<Dehydrated<TModel> | void>

  delete (ids: S): P<boolean>

  deleteOne (ids: L<S>): P<boolean>

}

export interface IShimDocCollection extends DocumentCollection {
  /**
   * @ref
   * https://www.arangodb.com/docs/3.4/data-modeling-documents-document-methods.html#remove
   */
  remove (handler: DocumentHandle, options?: IArangoCollectionOptions): P<IArangoDocumentMeta>
  remove (handler: L<DocumentHandle>, options?: IArangoCollectionOptions): P<L<IArangoDocumentMeta>>
}

export interface IArangoCollectionOptions {
  /**
   * One can force synchronization of the document creation operation to disk
   * even in case that the waitForSync flag is been disabled for the entire
   * collection. Thus, the waitForSync option can be used to force synchronization
   * of just specific operations. To use this, set the waitForSync parameter
   * to true. If the waitForSync parameter is not specified or set to false,
   * then the collection’s default waitForSync behavior is applied. The waitForSync
   * parameter cannot be used to disable synchronization for collections that
   * have a default waitForSync value of true.
   */
  waitForSync?: boolean

  /**
   * If this flag is set to true, a _rev attribute in the selector is ignored.
   */
  overwrite?: boolean

  /**
   * If this flag is set to true, the complete previous revision of the document
   * is returned in the output under the attribute old.
   */
  returnOld?: boolean

  /**
   * If this flag is set to true, no output is returned.
   */
  silent?: boolean
}

type DocumentHandle = string | (({ _key: S } | { _id: S }) & { _rev?: S})

export interface IArangoDocumentMeta {
  _key: S // 177949
  _id: S  // test/177949
  _rev: S // _ZFmHJNW---
}

export interface IArangoEdgeMeta extends IArangoDocumentMeta {
  _from: S // test/177949
  _to: S   // test/177949
}

export type IArangoDocuemnt <TModel> = IArangoDocumentMeta & {
  [K in keyof TModel]: TModel[K]
}
