import * as mongo from 'mongodb'
import { Inject, NotFoundException, InternalServerErrorException } from '@nestjs/common'
import { InjectDb } from './decorators'
import Entity, { IEntity } from './entity'
import { IRepo } from './specs'


// FIXME: @sy they should not raise nest exceptions

/** @description Adapted query object */
class Q <TModel> {

  protected readonly collection: mongo.Collection<TModel & { _id: mongo.ObjectID }>
  protected filterQuery: mongo.FilterQuery<TModel>
  protected filterOptions: mongo.FindOneOptions

  public constructor (
    protected readonly resourceName: S,
    protected readonly db: mongo.Db
  ) {
    this.collection = this.db.collection(this.resourceName)
    this.filterQuery = {}
    this.filterOptions = {}
  }

  /** @end the query */
  public async find (query?: mongo.FilterQuery<TModel>, options: mongo.FindOneOptions = {}) {
    if (query) this.filter(query)

    return this.collection
      .find(this.filterQuery, { ...this.filterOptions, ...options })
      .toArray()
  }

  public filter (query: mongo.FilterQuery<TModel>, options: mongo.FindOneOptions = {}) {
    this.filterQuery = {
      ...this.filterQuery,
      ...query,
    }
    this.filterOptions = {
      ...this.filterOptions,
      ...options,
    }

    return this
  }

  // public async exclude (query?: mongo.FilterQuery<TModel>): P<IEntity<TModel> | undefined> {
  //   //
  // }

  public async first (query?: mongo.FilterQuery<TModel>): P<TModel | undefined> {
    return (await this.find(query, { limit: 1 }))[0]
  }

  /** return the exect queried object or raise */
  public async get (query?: mongo.FilterQuery<TModel>) {
    const candidates = await this.find(query, {limit: 2})
    if (!candidates.length) throw new NotFoundException(query)
    if (candidates.length > 1) throw new InternalServerErrorException('Too many candidates.')
    return candidates[0]
  }

  public async take (skip = 0, take = 10): P<L<TModel>> {
    return this.find(undefined, {limit: take, skip})
  }

  public async create (data: ModelData<TModel>) {
    const r = await this.collection.insertOne({
      created: new Date(),
      ...data,
    } as A)
    if (r.result.ok !== 1) throw new InternalServerErrorException('Failed to create data.')
    return r
  }

  // protected async update (data: ModelData<TModel>) {
  //   //
  // }

  public async delete (query: mongo.FilterQuery<TModel>) {
    this.filter(query)
    return this.collection.deleteMany(this.filterQuery)
  }

}


abstract class AbsRepo <TModel> {

  protected readonly collection: mongo.Collection<TModel & { _id: mongo.ObjectID }>

  public constructor (
    @Inject('RESOURCE_NAME') protected readonly resourceName: S,
    @InjectDb() protected readonly db: mongo.Db
    // TODO: inject db with connectionName: @Inject('RESOURCE_DB')
  ) {
    this.collection = this.db.collection(this.resourceName)
  }

  /** We have to initialize it every time we query to prevent conflicts */
  protected get Q (): Q<TModel> {
    return new Q(this.resourceName, this.db)
  }

  // some non-block shorthands proxy to mongo legacy query

  protected async $create (data: ModelData<TModel>): P<IEntity<TModel>> {
    const _data = {
      ...data,
      created: new Date(),
    }
    try {
      const r = await this.Q.create(data)
      return Entity(r.insertedId, _data) as unknown as P<IEntity<TModel>>
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /** return void if not found */
  protected async $findOne (query: mongo.FilterQuery<TModel>): P<IEntity<TModel> | undefined> {
    const r = await this.collection.findOne(query)
    if (!r) return
    return Entity(r._id, r)
  }

  protected async $find (query: mongo.FilterQuery<TModel>, options: mongo.FindOneOptions): P<L<IEntity<TModel>>> {
    const r = await this.Q.find(query, options)
    return r.map(t => Entity(t._id, t))
  }

  /** raise if failed to delete */
  protected async $deletOne (query: mongo.FilterQuery<TModel>) {
    const r = await this.collection.deleteOne(query)
    if (r.result.ok !== 1) throw new InternalServerErrorException('Failed to delete data.')
    return r
  }

  protected async $deleteMany (query: mongo.FilterQuery<TModel>) {
    const r = await this.collection.deleteMany(query)
    if (r.result.ok !== 1) throw new InternalServerErrorException('Failed to delete data.')
    return r
  }

}


export default abstract class Repo <TModel> extends AbsRepo<TModel> implements IRepo<TModel> {

  protected async preCreate (data: ModelData<TModel>): P<ModelData<TModel>> {
    return data
  }

  public async create (data: ModelData<TModel>): P<TModel> {
    return this.postCreate(await this.$create(await this.preCreate(data)))
  }

  protected async postCreate (entity: IEntity<TModel>): P<TModel> {
    return entity.dehydrate()
  }

  public async findOne (query: mongo.FilterQuery<TModel>) {
    return this.$findOne(query).then(t => t && t.dehydrate())
  }

  public async find (query: mongo.FilterQuery<TModel>, options: mongo.FindOneOptions) {
    const ts = await this.$find(query, options)
    return ts.map(t => t.dehydrate())
  }

  public async delete (query: mongo.FilterQuery<TModel>) {
    try {
      this.$deleteMany(query)
      return true
    } catch (error) {
      return false
    }
  }

}
