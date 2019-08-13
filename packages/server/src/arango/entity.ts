import { IArangoDocuemnt } from './specs'

export type IEntity <TModel> = IArangoDocuemnt<TModel> & {
  dehydrate (): Dehydrated<TModel>
}

export default function Entity <TModel extends {created: Date}> (data: IArangoDocuemnt<TModel>): IEntity<TModel> {
  return {
    ...data,
    dehydrate () {
      return {
        ...data,
        id: data._key,
        created: new Date(data.created),
      }
    },
  }
}
