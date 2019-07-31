import { ObjectID } from 'mongodb'


export type IEntity <TModel> = {
  [K in keyof TModel]: TModel[K]
} & {
  _id: ObjectID
  dehydrate (): Dehydrated<TModel>
}

export default function Entity <TModel> (_id: ObjectID, data: TModel): IEntity<TModel> {
  return {
    ...data,
    _id,
    dehydrate () {
      return {
        ...data,
        id: _id.toHexString(),
      }
    },
  }
}
