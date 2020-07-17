import { Database, aql } from 'arangojs'
import { Inject, NotFoundException, InternalServerErrorException } from '@nestjs/common'
import Entity, { IEntity } from './entity'
import { IRepo, IShimDocCollection } from './specs'
import { QueryOptions } from 'arangojs/lib/cjs/database'
import { ArrayCursor } from 'arangojs/lib/cjs/cursor'
import { AqlQuery } from 'arangojs/lib/cjs/aql-query'


class Q <TModel> {

  protected readonly collection: IShimDocCollection
  protected dsl: S
  protected queryOptions: QueryOptions
  protected queryset?: ArrayCursor

  public constructor (
    protected readonly resourceName: S,
    protected readonly db: Database
  ) {
    this.collection = this.db.collection(this.resourceName) as IShimDocCollection
    this.queryOptions = {}
    this.dsl = ''
  }

  public query (dsl: S, options?: QueryOptions) {
    this.dsl = dsl
    if (options) {
      this.queryOptions = {
        ...this.queryOptions,
        ...options,
      }
    }
    return this
  }

  public async all (): P<L<IEntity<TModel>>> {
    if (!this.queryset) {
      if (!this.dsl) throw new InternalServerErrorException('Query Error')
      this.queryset = await this.db.query(this.dsl, {}, this.queryOptions)
    }
    const ds = await this.queryset.all()
    return ds.map(Entity)
  }

}


abstract class AbsRepo <TModel> {

  protected readonly collection: IShimDocCollection

  public constructor (
    @Inject('RESOURCE_NAME') protected readonly resourceName: S,
    @Inject('RESOURCE_DB') protected readonly db: Database
  ) {
    this.collection = this.db.collection(this.resourceName) as IShimDocCollection
  }

  /**
   * the adapted id is ArangoDocument._key
   *                   ArangoDocument._id = collectionName/key
   */
  public $getIdByKey (id: S) {
    return `${this.resourceName}/${id}`
  }

  /** We have to initialize it every time we query to prevent conflicts */
  protected get Q (): Q<TModel> {
    return new Q(this.resourceName, this.db)
  }

  protected async $aql (query: AqlQuery, options?: QueryOptions) {
    return this.db.query(query, options)
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

  protected async $deleteByKey (key: S) {
    return this.collection.remove(key)
  }

  protected async $deleteById (id: S) {
    return this.collection.remove({_id: id})
  }

  protected async $deleteByKeys (keys: L<S>) {
    return this.collection.remove(keys.map(_key => ({_key})))
  }

  protected async $page (skip: N, take: N): P<L<IEntity<TModel>>> {
    const cursor = await this.$aql(aql`
      FOR d IN ${this.collection}
      LIMIT ${skip}, ${take}
      RETURN d
    `, {batchSize: take})
    const ds = await cursor.all()
    return ds.map(Entity)
  }

  protected async $all () {
    return this.collection.all()
  }

  protected async $get (query: AqlQuery, strict=true): P<IEntity<TModel> | void> {
    const cursor = await this.$aql(aql`
      FOR d in ${this.collection}
      ${query}
      LIMIT 1
      RETURN d
    `, {batchSize: 1})
    const candidates = await cursor.all()
    if (!candidates.length) {
      if (strict) throw new NotFoundException(this.resourceName)
      return
    }
    return Entity(candidates[0]) as A
  }

}


export default abstract class Repo <TModel> extends AbsRepo<TModel> implements IRepo<TModel> {

  public async create (data: ModelData<TModel>) {
    return this.postCreate(await this.$create(await this.preCreate(data)))
  }

  public async findOne (id: S) {
    return this.$lookupById(id).then(d => d.dehydrate())
  }

  public async get (query: AqlQuery): P<Dehydrated<TModel>> | never
  public async get (query: AqlQuery, _acceptVoid: A): P<Dehydrated<TModel> | void>
  public async get (query: AqlQuery, _acceptVoid?: A) {
    const strict = arguments.length === 1
    const entity = await this.$get(query, strict)
    if (entity) return entity.dehydrate()
    return
  }

  public async find (options: {query: S} | {take: N, skip: N}) { // FIXME: this is ridiculous
    const ds = 'query' in options
      ? await this.Q.query(options.query).all()
      : await this.$page(options.skip, options.take)
    return ds.map(d => d.dehydrate())
  }

  public async deleteOne (ids: L<S>) {
    try {
      this.$deleteByKeys(ids)
      return true
    } catch (error) {
      return false
    }
  }

  public async delete (id: S) {
    try {
      this.$deleteByKey(id)
      return true
    } catch (error) {
      return false
    }
  }

  protected async preCreate (data: ModelData<TModel>): P<ModelData<TModel>> {
    return data
  }

  protected async postCreate (entity: IEntity<TModel>) {
    return entity.dehydrate()
  }

}
