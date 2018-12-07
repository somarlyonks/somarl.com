
import { IArangoDocuemnt, IArangoEdge } from './specs'


export type IEntity <TModel> = IArangoDocuemnt<TModel> & {
  dehydrate (): DehydratedDocument<TModel>
}

export type IEdge <TModel> = IArangoEdge<TModel> & {
  dehydrate (): DehydratedEdge<TModel>
}

export function Entity <TModel> (data: IArangoDocuemnt<TModel>): IEntity<TModel> {
  return {
    ...data,
    dehydrate () {
      return {
        ...data,
        id: data._id,
        created: new Date(data.created),
      }
    },
  }
}

export function Edge <TModel> (data: IArangoEdge<TModel>): IEdge<TModel> {
  return {
    ...data,
    dehydrate () {
      return {
        ...data,
        from: data._from,
        to: data._to,
        created: new Date(data.created),
      }
    },
  }
}
