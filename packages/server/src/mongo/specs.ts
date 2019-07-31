import * as mongo from 'mongodb'


export interface IRepo <TModel> {

  create (data: ModelData<TModel>): P<TModel>

  find (query: mongo.FilterQuery<TModel>, options: mongo.FindOneOptions): P<L<Dehydrated<TModel>>>

  findOne (query: mongo.FilterQuery<TModel>): P<Dehydrated<TModel> | void>

  delete (query: mongo.FilterQuery<TModel>): P<boolean>

}
