import { Database } from 'arangojs'
import { Inject, NotFoundException, InternalServerErrorException } from '@nestjs/common'
import Entity, { IEntity } from './entity'
import { IRepo, IShimDocCollection } from './specs'
import { QueryOptions } from 'arangojs/lib/cjs/database'


// /** @description Adapted query object */
// class Q <TModel> {

//   protected readonly collection: DocumentCollection
//   protected filterQuery: A
//   protected filterOptions: A

//   public constructor (
//     protected readonly resourceName: S,
//     protected readonly db: Database
//   ) {
//     this.collection = this.db.collection(this.resourceName)
//     this.filterQuery = {}
//     this.filterOptions = {}
//   }

//   /** @end the query */
//   public async find (query?: A, options?: A) {
//     if (query) this.filter(query)

//     // return this.collection
//     //   .find(this.filterQuery, { ...this.filterOptions, ...options })
//     //   .toArray()
//     return []
//   }

//   public filter (query: A, options?: A) {
//     this.filterQuery = {
//       ...this.filterQuery,
//       ...query,
//     }
//     this.filterOptions = {
//       ...this.filterOptions,
//       ...options,
//     }

//     return this
//   }

//   // public async exclude (query?: ): P<IEntity<TModel> | undefined> {
//   //   //
//   // }

//   public async first (query?: A): P<TModel | undefined> {
//     return (await this.find(query, { limit: 1 }))[0]
//   }

//   /** return the exect queried object or raise */
//   public async get (query?: A) {
//     const candidates = await this.find(query, {limit: 2})
//     if (!candidates.length) throw new NotFoundException(query)
//     if (candidates.length > 1) throw new InternalServerErrorException('Too many candidates.')
//     return candidates[0]
//   }

//   public async take (skip = 0, take = 10): P<L<TModel>> {
//     return this.find(undefined, {limit: take, skip})
//   }

//   public async create (data: ModelData<TModel>) {
//     const r = await this.collection.save({
//       ...data,
//       created: new Date(),
//     } as A)
//     console.log('CCCCCCCCCCCC', r) // TODELETE
//     if (r.result.ok !== 1) throw new InternalServerErrorException('Failed to create data.')
//     return r
//   }

//   // protected async update (data: ModelData<TModel>) {
//   //   //
//   // }

//   public async delete (query: A) {
//     this.filter(query)
//     return this.collection.remove(this.filterQuery)
//   }

// }


abstract class AbsRepo <TModel> {

  protected readonly collection: IShimDocCollection

  public constructor (
    @Inject('RESOURCE_NAME') protected readonly resourceName: S,
    @Inject('RESOURCE_DB') protected readonly db: Database
  ) {
    this.collection = this.db.collection(this.resourceName) as IShimDocCollection
  }

  /** We have to initialize it every time we query to prevent conflicts */
  // protected get Q (): Q<TModel> {
  //   return new Q(this.resourceName, this.db)
  // }

  protected async $rawQS (dsl: S, options?: QueryOptions) {
    return this.db.query(dsl, {}, options)
  }

  protected async $create (data: ModelData<TModel>): P<IEntity<TModel>> {
    const _data = {
      ...data,
      created: new Date(),
    }
    try {
      const r = await this.collection.save(_data)
      return Entity({..._data, ...r}) as unknown as P<IEntity<TModel>>
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  protected async $lookupBy$Keys ($keys: L<S>): P<L<IEntity<TModel>>> {
    const rs = await this.collection.lookupByKeys($keys)
    return rs.map(Entity)
  }

  protected async $lookupByIds (ids: L<S>): P<L<IEntity<TModel>>> {
    return this.$lookupBy$Keys(ids)
  }

  protected async $lookupBy$Key ($key: S): P<IEntity<TModel>> {
    const candidates = await this.$lookupBy$Keys([$key])
    if (!candidates.length) throw new NotFoundException($key)
    return candidates[0]
  }

  protected async $lookupById (id: S): P<IEntity<TModel>> {
    return this.$lookupBy$Key(id)
  }

  protected async $deleteOneByKey (key: S) {
    return this.collection.remove(key)
  }

  protected async $deleteOneById (id: S) {
    return this.collection.remove({_id: id})
  }

  protected async $deleteManyByKeys (keys: L<S>) {
    return this.collection.remove(keys.map(_key => ({_key})))
  }

  protected async $page (skip: N, take: N): P<L<IEntity<TModel>>> {
    const cursor = await this.$rawQS(`
      FOR c IN ${this.resourceName}
      LIMIT ${skip}, ${take}
      RETURN c
    `, {batchSize: take}) // TODO: @sy
    const ds = await cursor.all()
    return ds.map(Entity)
  }

  protected async $all () {
    return this.collection.all()
  }

  /**
   * the adapted id is ArangoDocument._key
   *                   ArangoDocument._id = collectionName/key
   */
  public $getIdByKey (id: S) {
    return `${this.resourceName}/${id}`
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

  public async findOne (id: S) {
    return this.$lookupById(id).then(d => d.dehydrate())
  }

  public async find (options: {query?: S, take: N, skip: N}) {
    const ds = await this.$page(options.skip, options.take)
    return ds.map(d => d.dehydrate())
  }

  public async delete (id: S) {
    try {
      this.$deleteOneById(id)
      return true
    } catch (error) {
      return false
    }
  }

}
